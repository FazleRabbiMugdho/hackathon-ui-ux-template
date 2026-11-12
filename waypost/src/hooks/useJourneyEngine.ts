'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { StopAnchor } from './useActiveStop';

const LIGHT_KEYFRAMES: Array<[number, string[]]> = [
  [0, ['#f2c49c', '#fff1dc', '#8fb27a', '#d3bba0', '#b39878', '#7a5640', '#fff3c9']],
  [0.5, ['#bcd9e8', '#fff8ec', '#7ea96a', '#cdb99f', '#ac9275', '#6f4f3a', '#fffbe6']],
  [1, ['#e2a58f', '#fbe3c8', '#6f9660', '#c4a58f', '#a2806a', '#5f4030', '#ffe0b0']],
];

const DARK_KEYFRAMES: Array<[number, string[]]> = [
  [0, ['#2a1f3a', '#6b3f4a', '#2f4a2c', '#4a3a3a', '#3a2c2c', '#2a1e1a', '#ffd9a0']],
  [0.5, ['#10182c', '#2a3350', '#27402a', '#3c3440', '#30282f', '#231a18', '#e8e4d0']],
  [1, ['#080b1a', '#1b2040', '#1f3322', '#2e2a38', '#251f2a', '#1a1214', '#dcdcc8']],
];

const STAGE_VARS = ['--top', '--bot', '--hill', '--far', '--mid', '--near', '--sunc'] as const;
const LAYER_SPEEDS = [0.12, 0.2, 0.45, 0.85] as const;

const SCENERY_SVGS = [
  '<rect x="21" y="28" width="6" height="16" rx="2" fill="#6b4a36"/><circle cx="24" cy="20" r="14" fill="#5f8a4b"/><circle cx="17" cy="24" r="8" fill="#7aa35f"/>',
  '<rect x="22" y="34" width="4" height="10" fill="#6b4a36"/><path d="M24 14L41 36H7Z" fill="#4f8239"/><path d="M24 4L38 24H10Z" fill="#3f6f2e"/>',
  '<ellipse cx="24" cy="36" rx="18" ry="10" fill="#6f9660"/><circle cx="16" cy="32" r="8" fill="#86ad72"/><circle cx="32" cy="33" r="7" fill="#5f8a4b"/>',
  '<rect x="8" y="22" width="32" height="20" fill="#fbf3e4" stroke="#4a2f22" stroke-width="2"/><path d="M5 24L24 8L43 24Z" fill="#b3202e"/><rect x="20" y="30" width="8" height="12" fill="#7a5640"/><rect x="11" y="27" width="6" height="6" fill="#a9d0e2"/>',
  '<rect x="22" y="12" width="4" height="32" fill="#3b2a22"/><path d="M14 12Q24 2 34 12Z" fill="#3b2a22"/><circle cx="24" cy="14" r="4" fill="#f6c453"/>',
  '<rect x="22" y="18" width="4" height="26" fill="#3b2a22"/><rect x="8" y="6" width="32" height="16" rx="4" fill="#b3202e"/><path d="M14 14H34M30 10L34 14L30 18" stroke="#fbf3e4" stroke-width="2" fill="none"/>',
];

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function interpolateStageColors(t: number, isDark: boolean): string[] {
  const frames = isDark ? DARK_KEYFRAMES : LIGHT_KEYFRAMES;
  let i = 0;
  while (i < frames.length - 2 && t > frames[i + 1][0]) i++;
  const a = frames[i];
  const b = frames[i + 1];
  const raw = Math.max(0, Math.min(1, (t - a[0]) / (b[0] - a[0])));
  const smooth = raw * raw * (3 - 2 * raw);

  return a[1].map((hexA, idx) => {
    const rgbA = hexToRgb(hexA);
    const rgbB = hexToRgb(b[1][idx]);
    const mixed = rgbA.map((v, c) => Math.round(v + (rgbB[c] - v) * smooth));
    return `rgb(${mixed.join(',')})`;
  });
}

function smootherStep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * t * (t * (6 * t - 15) + 10);
}

function clamp(v: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, v));
}

export function needleAngleForStop(stopValue: number, maxIndex: number): number {
  const denom = Math.max(1, maxIndex);
  return -135 + (270 * stopValue) / denom;
}

export interface JourneyEngineResult {
  rootRef: React.RefObject<HTMLDivElement | null>;
  activeIndex: number;
  activeId: string;
  scrollToStop: (stopIndex: number) => void;
}

/**
 * Full reference-accurate scroll & SVG route physics engine:
 * - 300svh sticky Hero stage (sky gradient, arcing sun, 4-layer parallax, animated vehicle + wheel spin)
 * - Cubic Bezier road measuring every `[data-pin]` inside `#map`
 * - Top-down rider cruising along the SVG curve with smooth tangent rotation
 * - Procedural scenery props popping in ahead of the crimson route trail
 * - Spring-damped speedometer needle, km readout, and stop-activation sync
 */
export function useJourneyEngine(
  stops: StopAnchor[],
  presetId: string,
): JourneyEngineResult {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollFnRef = useRef<(index: number) => void>(() => {});
  const [activeStop, setActiveStop] = useState<{ index: number; id: string }>({
    index: 0,
    id: stops[0]?.id ?? 'home',
  });

  const maxStopIdx = Math.max(1, stops.length - 1);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;

    const isJsdom = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
    if (isJsdom) return;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    const home = root.querySelector<HTMLElement>('#home');
    const stage = root.querySelector<HTMLElement>('#ws-stage');
    const sun = root.querySelector<HTMLElement>('#ws-sun');
    const layers = Array.from(root.querySelectorAll<HTMLElement>('.ws-lay'));
    const lane = root.querySelector<HTMLElement>('#ws-lane');
    const vehicleSvg = root.querySelector<SVGSVGElement>('#ws-hero-vehicle');
    const vehicleWrap = root.querySelector<HTMLElement>('#ws-ttw');
    const heroContent = root.querySelector<HTMLElement>('#ws-hero-content');

    const mapEl = root.querySelector<HTMLElement>('#ws-map');
    const routeSvg = root.querySelector<SVGSVGElement>('#ws-route');
    const roadPaths = routeSvg ? Array.from(routeSvg.querySelectorAll<SVGPathElement>('.ws-rd')) : [];
    const mainRoad = roadPaths[0];
    const trailPath = root.querySelector<SVGPathElement>('#ws-trail');
    const sceneryHost = root.querySelector<HTMLElement>('#ws-scn');

    const carWrap = root.querySelector<HTMLElement>('#ws-car');
    const carGroup = root.querySelector<SVGGElement>('#ws-route-rider-g');

    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-card]'));
    const pins = Array.from(root.querySelectorAll<HTMLElement>('[data-pin]'));
    const tiles = Array.from(root.querySelectorAll<HTMLElement>('[data-tile]'));
    const infoCards = Array.from(root.querySelectorAll<HTMLElement>('[data-info-card]'));

    const gaugeWrap = root.querySelector<HTMLElement>('.ws-sp');
    const needleGroup = root.querySelector<SVGGElement>('#ws-sp-needle');
    const kmText = root.querySelector<SVGTextElement>('#ws-sp-km');
    const nameText = root.querySelector<SVGTextElement>('#ws-sp-name');
    const tipEl = root.querySelector<HTMLElement>('#ws-sp-tip');
    const footerEl = root.querySelector<HTMLElement>('#footer');

    if (!home || !stage || !mapEl || !routeSvg || !mainRoad || !trailPath || pins.length === 0) {
      return;
    }

    let W = window.innerWidth;
    let H = window.innerHeight;
    let totalLen = 1;
    let stopPathLens: number[] = Array(stops.length).fill(0);
    let stopScrollTargets: number[] = Array(stops.length).fill(0);
    let metrics = { heroEnd: 0, mapTop: 0 };
    const sceneryItems: Array<{ el: HTMLElement; L: number; on: boolean }> = [];

    const offsetInMap = (el: HTMLElement) => {
      let x = 0;
      let y = 0;
      let cur: HTMLElement | null = el;
      while (cur && cur !== mapEl && mapEl.contains(cur)) {
        x += cur.offsetLeft;
        y += cur.offsetTop;
        cur = cur.offsetParent as HTMLElement | null;
      }
      return { x, y };
    };

    const canMeasureSvg = typeof mainRoad.getTotalLength === 'function';

    const measureRoute = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const mapRect = mapEl.getBoundingClientRect();
      const mapTop = mapRect.top + window.scrollY;

      routeSvg.setAttribute('viewBox', `0 0 ${mapRect.width} ${mapRect.height}`);
      routeSvg.setAttribute('width', String(mapRect.width));
      routeSvg.setAttribute('height', String(mapRect.height));

      const isMobile = W < 761;
      const pinCenters = pins.map((pin) => {
        const pos = offsetInMap(pin);
        return [pos.x + pin.offsetWidth / 2, pos.y + pin.offsetHeight / 2] as [number, number];
      });

      const waypoints: Array<[number, number]> = [
        isMobile
          ? [pinCenters[0][0] + 12, 26]
          : [mapRect.width / 2 - 100 * (W >= 1024 ? 1 : 0), 26],
        ...pinCenters,
      ];

      let d = `M${waypoints[0][0]} ${waypoints[0][1]}`;
      for (let i = 1; i < waypoints.length; i++) {
        const [x1, y1] = waypoints[i - 1];
        const [x2, y2] = waypoints[i];
        const dy = Math.max(10, y2 - y1);
        d += ` C${x1} ${y1 + 0.55 * dy} ${x2} ${y2 - 0.55 * dy} ${x2} ${y2}`;
      }

      roadPaths.forEach((p) => p.setAttribute('d', d));
      trailPath.setAttribute('d', d);

      if (canMeasureSvg) {
        totalLen = Math.max(1, mainRoad.getTotalLength());
      }

      // Deterministic scenery props along alternating road sides
      if (sceneryHost && canMeasureSvg) {
        sceneryHost.textContent = '';
        sceneryItems.length = 0;

        const obstacles: Array<{ x: number; y: number; w: number; h: number }> = [];
        root.querySelectorAll<HTMLElement>('[data-card],[data-tile]').forEach((el) => {
          if (!el.offsetWidth) return;
          const pos = offsetInMap(el);
          obstacles.push({
            x: pos.x - 10,
            y: pos.y - 10,
            w: el.offsetWidth + 20,
            h: el.offsetHeight + 20,
          });
        });

        const placed: Array<{ x: number; y: number; w: number; h: number }> = [];
        let seed = 20260;
        const rand = () => {
          seed = (seed + 0x6d2b79f5) | 0;
          let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
          t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
          return ((t ^ (t >>> 14)) >>> 0) / 0x100000000;
        };

        let cursor = 110;
        let side = 1;
        while (cursor < totalLen - 60) {
          const size = 42 + 16 * rand();
          const dist = 40 + 34 * rand();
          const pt = mainRoad.getPointAtLength(cursor);
          const ptNext = mainRoad.getPointAtLength(Math.min(totalLen, cursor + 4));
          const dx = ptNext.x - pt.x;
          const dy = ptNext.y - pt.y;
          const mag = Math.hypot(dx, dy) || 1;
          const box = {
            x: pt.x + (-dy / mag) * dist * side - size / 2,
            y: pt.y + (dx / mag) * dist * side - size / 2,
            w: size,
            h: size,
          };
          const overlaps = (o: { x: number; y: number; w: number; h: number }) =>
            box.x < o.x + o.w && box.x + box.w > o.x && box.y < o.y + o.h && box.y + box.h > o.y;
          const spriteIdx = Math.floor(rand() * SCENERY_SVGS.length);

          if (
            box.x >= 4 &&
            box.y >= 4 &&
            box.x + box.w <= mapRect.width - 4 &&
            box.y + box.h <= mapRect.height - 4 &&
            !obstacles.some(overlaps) &&
            !placed.some(overlaps)
          ) {
            const prop = document.createElement('div');
            prop.className = 'ws-scenery-prop';
            prop.style.cssText = `left:${box.x}px;top:${box.y}px;width:${size}px;height:${size}px`;
            prop.innerHTML = `<svg viewBox="0 0 48 48" width="100%" height="100%">${SCENERY_SVGS[spriteIdx]}</svg>`;
            sceneryHost.appendChild(prop);
            placed.push(box);
            sceneryItems.push({ el: prop, L: cursor, on: false });
          }

          side = -side;
          cursor += 80 + 70 * rand();
        }
      }

      if (canMeasureSvg) {
        stopPathLens = [
          0,
          ...pinCenters.map((pt) => {
            let lo = 0;
            let hi = totalLen;
            for (let k = 0; k < 22; k++) {
              const mid = (lo + hi) / 2;
              if (mainRoad.getPointAtLength(mid).y < pt[1]) lo = mid;
              else hi = mid;
            }
            return (lo + hi) / 2;
          }),
        ];
      }

      stopScrollTargets = [
        Math.max(0, mapTop + waypoints[0][1] - 0.5 * H),
        ...pinCenters.map((pt) => Math.max(0, mapTop + pt[1] - 0.5 * H)),
      ];
      for (let i = 1; i < stopScrollTargets.length; i++) {
        stopScrollTargets[i] = Math.max(stopScrollTargets[i], stopScrollTargets[i - 1] + 1);
      }

      metrics = {
        heroEnd: home.getBoundingClientRect().top + window.scrollY + home.offsetHeight - H,
        mapTop,
      };
    };

    measureRoute();
    const ro = new ResizeObserver(measureRoute);
    ro.observe(mapEl);
    ro.observe(document.body);
    window.addEventListener('resize', measureRoute);
    const timers = [window.setTimeout(measureRoute, 600), window.setTimeout(measureRoute, 2200)];

    scrollFnRef.current = (stopIdx: number) => {
      measureRoute();
      const targetTop = stopIdx === 0 ? 0 : (stopScrollTargets[stopIdx] ?? 0);
      window.scrollTo({ top: targetTop, behavior: reducedMotion ? 'auto' : 'smooth' });
    };

    let needleAngle = -135;
    let needleVel = 0;
    let lastTime = performance.now();
    let curLen = 0;
    let carHeading = 90;
    let carX = 0;
    let carY = 0;
    let carInited = false;
    let lastStopIdx = -1;
    let wheelAngle = 0;
    let lastScrollY = window.scrollY;
    let scrollVel = 0;
    let running = true;
    let rafId = 0;

    const getScrollProgressIndex = (y: number) => {
      if (stopScrollTargets.length <= 1 || y <= stopScrollTargets[0]) return 0;
      const last = stopScrollTargets.length - 1;
      for (let i = 0; i < last; i++) {
        if (y <= stopScrollTargets[i + 1]) {
          return i + (y - stopScrollTargets[i]) / Math.max(1, stopScrollTargets[i + 1] - stopScrollTargets[i]);
        }
      }
      return last;
    };

    const tick = () => {
      const nowSec = performance.now() / 1000;
      const dt = Math.min(0.05, Math.max(0.001, (performance.now() - lastTime) / 1000));
      const stepAlpha = (rate60: number) =>
        reducedMotion ? 1 : 1 - Math.pow(1 - rate60, Math.min(3, dt * 60));
      lastTime = performance.now();

      const y = window.scrollY;
      const heroDenom = Math.max(1, home.offsetHeight - H);
      const heroProg = clamp(-home.getBoundingClientRect().top / heroDenom);

      // 1. Sky / Horizon color progression for default warm theme
      const isDark = document.documentElement.classList.contains('dark');
      if (presetId === 'waypost-warm') {
        const colors = interpolateStageColors(heroProg, isDark);
        STAGE_VARS.forEach((v, idx) => stage.style.setProperty(v, colors[idx]));
      }

      // 2. Parallax landscape & road lane
      const shift = 7000 * heroProg;
      if (!reducedMotion) {
        layers.forEach((lay, idx) => {
          const pos = `${-shift * (LAYER_SPEEDS[idx] ?? 0.2)}px 100%`;
          lay.style.webkitMaskPosition = pos;
          lay.style.maskPosition = pos;
        });
      }
      if (lane) {
        lane.style.backgroundPositionX = reducedMotion ? '0px' : `${-(1.25 * shift)}px`;
      }
      if (sun) {
        sun.style.transform = `translate(${W * (0.12 + 0.76 * heroProg)}px, ${H * (0.5 - 0.34 * Math.sin(Math.PI * heroProg))}px)`;
      }

      // 3. Hero vehicle wheel rotation, engine bob, and handoff shrink
      const dyScroll = y - lastScrollY;
      lastScrollY = y;
      scrollVel += (dyScroll - scrollVel) * stepAlpha(0.14);
      wheelAngle += reducedMotion ? 0 : (1.2 + 1.4 * Math.abs(scrollVel)) * (dt * 60);

      if (vehicleSvg && vehicleWrap) {
        vehicleSvg.style.setProperty('--wa', `${wheelAngle}deg`);
        const bob = reducedMotion
          ? 0
          : Math.sin(14 * nowSec) * (0.8 + Math.min(3, 0.15 * Math.abs(scrollVel)));
        const shrink = smootherStep(0.76, 0.96, heroProg);
        const heroFade = smootherStep(0.84, 0.96, heroProg);
        vehicleWrap.style.opacity = String(1 - heroFade);
        vehicleWrap.style.visibility = heroFade > 0.99 ? 'hidden' : 'visible';
        vehicleWrap.style.transform = `translateX(-50%) scale(${1 - 0.78 * shrink})`;
        vehicleWrap.style.transformOrigin = '50% 72%';
        vehicleSvg.style.transform = `perspective(1000px) translateY(${bob}px) rotateY(-12deg) rotate(${clamp(-(0.12 * scrollVel), -2.5, 2.5)}deg)`;
      }

      if (heroContent) {
        heroContent.style.opacity = String(1 - smootherStep(0.62, 0.8, heroProg));
        heroContent.style.visibility = heroProg > 0.82 ? 'hidden' : 'visible';
      }

      // 4. Bezier Route Trail & Top-Down Cruising Vehicle
      const mapRect = mapEl.getBoundingClientRect();
      const eT = getScrollProgressIndex(y);
      const segIdx = Math.min(Math.max(0, stopPathLens.length - 2), Math.floor(eT));
      const targetLen =
        (stopPathLens[segIdx] ?? 0) +
        ((stopPathLens[segIdx + 1] ?? 0) - (stopPathLens[segIdx] ?? 0)) * (eT - segIdx);

      curLen += (targetLen - curLen) * stepAlpha(0.18);

      if (canMeasureSvg && carWrap && carGroup) {
        const pt = mainRoad.getPointAtLength(curLen);
        const ptAhead = mainRoad.getPointAtLength(Math.min(totalLen, curLen + 5));
        const ang = (180 * Math.atan2(ptAhead.y - pt.y, ptAhead.x - pt.x)) / Math.PI;
        const delta = ((ang - carHeading + 540) % 360) - 180;
        carHeading = carInited ? carHeading + delta * stepAlpha(0.2) : ang;

        const targetX = mapRect.left + pt.x;
        const targetY = mapRect.top + pt.y;

        // Fixed viewport anchor matching hero vehicle's 50% 72% shrink center (invariant as stage unsticks)
        const isMobile = W < 761;
        const bottomInset = 0.2 * H - (isMobile ? 20 : 30);
        const fallbackWrapH = (clamp(0.38 * W, 240, 490) * 200) / 300;
        const wrapHeight = vehicleWrap?.offsetHeight || fallbackWrapH;
        const heroX = (isMobile ? 0.5 : 0.64) * W;
        const heroY = H - bottomInset - 0.28 * wrapHeight;

        const handoff = clamp((y - metrics.heroEnd) / Math.max(1, stopScrollTargets[0] - metrics.heroEnd));
        const handoffSmooth = handoff * handoff * (3 - 2 * handoff);

        const nextX = heroX + (targetX - heroX) * handoffSmooth;
        const nextY = heroY + (targetY - heroY) * handoffSmooth;
        const posAlpha = stepAlpha(0.38);
        carX = carInited ? carX + (nextX - carX) * posAlpha : nextX;
        carY = carInited ? carY + (nextY - carY) * posAlpha : nextY;
        carInited = true;

        const carOpacity = smootherStep(0.82, 0.93, heroProg);
        const carScale = 0.78 + 0.22 * smootherStep(0.82, 0.96, heroProg) + 0.12 * handoffSmooth;

        carWrap.style.opacity = String(carOpacity);
        carWrap.style.transform = `translate(${carX}px, ${carY}px)`;
        carGroup.setAttribute('transform', `rotate(${carHeading + 90}) scale(${carScale})`);
        trailPath.style.strokeDasharray = `${curLen} ${totalLen}`;
      }

      // 5. Card, Pin, Tile & Scenery Activation + Tile Parallax
      cards.forEach((card, idx) => {
        const lit = curLen >= (stopPathLens[idx + 1] ?? 0) - 24;
        card.classList.toggle('lit', lit);
        pins[idx]?.classList.toggle('on', lit);
        pins[idx]?.classList.toggle('ws-pin-pop', lit);
      });

      tiles.forEach((tile) => {
        const stopIdx = Number(tile.dataset.tileFor ?? 0);
        const lit = curLen >= (stopPathLens[stopIdx + 1] ?? 0) - 24;
        tile.classList.toggle('lit', lit);
        const scene = tile.querySelector<HTMLElement>('.scene');
        if (!scene || reducedMotion) return;
        const rect = tile.getBoundingClientRect();
        if (rect.bottom < -40 || rect.top > H + 40) return;
        const rel = clamp((rect.top + rect.height / 2 - H / 2) / (H / 2 + rect.height / 2), -1, 1);
        scene.style.transform = `translateY(${(-14 * rel).toFixed(1)}px)`;
      });

      infoCards.forEach((infoCard) => {
        const stopIdx = Number(infoCard.dataset.infoCard ?? 0);
        const lit = curLen >= (stopPathLens[stopIdx + 1] ?? 0) - 24;
        infoCard.classList.toggle('lit', lit);
      });

      for (const prop of sceneryItems) {
        if (!prop.on && curLen + 300 >= prop.L) {
          prop.on = true;
          prop.el.classList.add('on');
        }
      }

      // 6. Spring-physics Speedometer Needle & Active Stop State
      const roundedStop =
        Math.round(eT) === 0 && eT < 0.5 ? 0 : Math.min(maxStopIdx, Math.floor(eT + 0.12));

      const targetNeedle = needleAngleForStop(eT, maxStopIdx);
      if (reducedMotion) {
        needleAngle = targetNeedle;
        needleVel = 0;
      } else {
        needleVel += ((targetNeedle - needleAngle) * 120 - 9.5 * needleVel) * dt;
        needleAngle += needleVel * dt;
      }

      if (needleGroup) {
        needleGroup.style.transform = `rotate(${needleAngle}deg)`;
      }
      if (kmText) {
        kmText.textContent = (1.05 * eT).toFixed(1);
      }

      if (roundedStop !== lastStopIdx) {
        lastStopIdx = roundedStop;
        const stopObj = stops[roundedStop];
        if (stopObj) {
          setActiveStop({ index: roundedStop, id: stopObj.id });
          if (nameText) nameText.textContent = stopObj.label;
          if (tipEl && !tipEl.classList.contains('hv')) {
            tipEl.textContent = `${String(stopObj.stopNumber).padStart(2, '0')} · ${stopObj.label}`;
          }
        }
      }

      if (gaugeWrap && footerEl) {
        gaugeWrap.classList.toggle('lo', footerEl.getBoundingClientRect().top < 0.9 * H);
      }

      if (running) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      running = false;
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', measureRoute);
      timers.forEach(window.clearTimeout);
    };
  }, [stops, maxStopIdx, presetId]);

  const scrollToStop = useCallback((stopIndex: number) => {
    scrollFnRef.current(stopIndex);
  }, []);

  return {
    rootRef,
    activeIndex: activeStop.index,
    activeId: activeStop.id,
    scrollToStop,
  };
}


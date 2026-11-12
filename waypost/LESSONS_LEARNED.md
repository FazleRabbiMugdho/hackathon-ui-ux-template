# Lessons Learned — Implementation Post-Mortem

This document records real defects encountered and resolved while building the **Waypost** template, derived directly from implementation evidence and visual Chromium audits across desktop (`1440×900`), tablet (`900×1024`), and mobile (`390×844`). Future engineers and AI coding agents should use this checklist to avoid repeating these mistakes.

---

## 1. Centered Sections Placed Cards Directly Over the Highway Spine

- **What went wrong**: Stops `04` (Showcase) and `06` (CTA) originally rendered inside centered layout classes (`.ws-stp-center` and `.ws-stp-bk`) spanning columns `1..3` across the middle corridor. As a result, cards sat right on top of the continuous SVG highway spine (`#ws-route`).
- **Why it happened**: Domain-specific additions (an operator dashboard and CTA block) used centered layout wrappers instead of following the strict alternating left/right split corridor established by the rest of the route.
- **How it was corrected**: Replaced centered Stop `04` and Stop `06` wrappers with alternating `SplitSection` (`layout="image-left"`) compositions so all `7` stops strictly alternate `Left → Right → Left → Right → Left → Right → Left` around an unobstructed central corridor (`minmax(0, 1fr) clamp(130px, 14vw, 210px) minmax(0, 1fr)` on desktop).
- **How future agents should prevent it**: Never place `.ws-stp-center` or full-width blocking containers inside `#ws-map` when using the Bezier route engine; keep every stop in `.ws-stp-l` or `.ws-stp-r` with `1:1` parity between `.ws-stp`, `[data-card]`, and `[data-pin]`.
- **Early validation check**: Assert in automated DOM/Vitest tests that `.ws-stp-center` and `.ws-stp-bk` count equals `0` and `[data-pin]` count matches `.ws-stp` count across all stops (`template.test.tsx`).

---

## 2. Road Entry & Corridor Offsets Diverged From the Reference Bezier Model

- **What went wrong**: Customizing the initial waypoint away from `[mapRect.width / 2 - 100 * (W >= 1024 ? 1 : 0), 26]`, changing desktop corridor width to `14vw`, or overriding the uniform `0.55 * dy` vertical-handle cubic Bezier with custom control-point weights altered the reference entry angle, pin joint placement, and S-curve geometry.
- **Why it happened**: Compensating locally for individual tall cards with non-reference waypoints/weights broke exact parity with the reference route spine.
- **How it was corrected**: Restored the exact reference CSS corridor grid (`minmax(0, 1fr) clamp(110px, 12vw, 190px) minmax(0, 1fr)`), reference pin offsets (`right: -20px` / `left: -20px` desktop/tablet, `left: -41px` mobile), reference `±16px` alternating card rest slide, and reference `useJourneyEngine.ts` waypoints (`isMobile ? [pinCenters[0][0] + 12, 26] : [mapRect.width / 2 - 100 * (W >= 1024 ? 1 : 0), 26]`) with uniform `C${x1} ${y1 + 0.55 * dy} ${x2} ${y2 - 0.55 * dy} ${x2} ${y2}` segments.
- **How future agents should prevent it**: Never alter `waypoints[0]`, `0.55 * dy` control handles, `.ws-stp` corridor width (`12vw`), or `.ws-pin` (`±20px`) independently—they form one coupled geometric system.
- **Early validation check**: Compare rendered starting cap `[612.5, 26]`, Pin 1..N joint centers, and cubic Bezier `d` string side-by-side against `tuktuk-your-stop.foundingdev.com` in headless Chromium.

---

## 3. Asymmetric Tablet Columns Inverted the Road Sideways (`761px–1023px`)

- **What went wrong**: Under `@media (min-width: 761px) and (max-width: 1023px)`, `.ws-stp-l` used `1.5fr 56px 1fr` while `.ws-stp-r` inverted to `1fr 56px 1.5fr`. In Chromium at `900×1024`, Pin 1 sat at `x = 492px` while Pin 2 jumped `99px` left to `x = 393px`, forcing the SVG highway underneath Stop `01` and Stop `02` cards and sliding the animated car across card text.
- **Why it happened**: Optimizing column width individually for left vs. right cards broke horizontal symmetry of Column 2 (the shared road corridor), which was only tested initially at `1440px` desktop and `390px` mobile.
- **How it was corrected**: Unified tablet columns (`761px–1023px`) in `globals.css` to a symmetric `minmax(0, 1fr) clamp(84px, 10vw, 120px) minmax(0, 1fr)` track with compact outer horizontal padding (`clamp(16px, 4vw, 44px)`).
- **How future agents should prevent it**: Keep Column 1 and Column 3 equal-width (`minmax(0, 1fr)`) in any alternating split grid that shares a vertical central route spine.
- **Early validation check**: Explicitly run headless viewport checks across **all three** breakpoints (`1440×900`, `900×1024`, `390×844`) after CSS grid edits.

---

## 4. Non-Concentric Hero Vehicle Shrink & Conflicting 3D Tilt During Handoff

- **What went wrong**: During scrolling between Hero (`Stop 00`) and Stop `01`, `#ws-hero-vehicle` tilted in 3D (`rotateX`) and shrank toward `50% 85%` while the top-down `#ws-car` faded in rotated diagonally and positioned lower in the horizon road (`~701px` vs `~665px`), visually separating into two misaligned vehicles.
- **Why it happened**: The big hero vehicle transform origin (`50% 85%`), extra non-reference tilt/rotation offsets, and `#ws-car` anchor height did not converge on the same screen pixel at crossfade midpoint (`heroProg ≈ 0.86`).
- **How it was corrected**: Removed extra 3D X-tilt and arbitrary steer offsets, aligned `#ws-ttw` shrink origin (`50% 72%`) with the invariant `#ws-car` handoff anchor (`H - bottomInset - 0.28 * wrapHeight`), and staggered scale compression (`shrink` `0.76→0.96`) ahead of opacity fade (`0.84→0.96` in `useJourneyEngine.ts`).
- **How future agents should prevent it**: Any multi-element morph or handoff must share a single mathematically verified viewport anchor `(heroX, heroY)` invariant to `position: sticky` unsticking.
- **Early validation check**: Log bounding-box centers `(left + width/2, top + height*originY)` of both vehicles across hero exit scroll offsets (`heroProg` `0.78..0.98`) and confirm sub-15px alignment.

---

## 5. `slice`-Scaled SVG Tiles Cropped Wide Text or Left Blank Voids on Tall Rows

- **What went wrong**: Using fixed `520×420` `xMidYMid slice` on tall sections (`~1100px–1369px` high in Showcase/Architecture) stretched illustrations `~3x` vertically and cropped text (`MESH SYNC`) on tablet widths, while `meet` on `CorridorStatusRailIllustration` and `FeedbackBubblesTile` left empty bands above the SVG artwork.
- **Why it happened**: Decorative `.ws-stp-tile` stretches vertically to match sibling card height (`align-items: stretch`), so SVG aspect assumptions (`4:3`) diverge sharply at tall card heights or narrow tablet columns.
- **How it was corrected**: Wrapped full-height tiles in matching-background containers (`bg-[#cfe5f0]`, `bg-[#f7d6d0]`, gradient `#dcebd0 → park`) and used appropriately balanced `viewBox` ratios (`360×760` `slice` for vertical rail, `xMidYMid meet` inside seamless backdrop wrappers for `ArchitectureMeshIllustration` and `FeedbackBubblesTile`).
- **How future agents should prevent it**: Pair every `.ws-stp-tile` SVG with a matching container background color so tall rows never show seams, and test tablet/desktop tile widths against SVG typography bounds.

---

## 6. Reference Limitations & Documentation Drift

- **What went wrong**: Earlier edits disabled `PreloaderCurtain` by default (`enablePreloader: false`), removed `.ws-stp-bk`, updated route geometry, and ran headless Chromium checks—yet `README.md`, `DESIGN_SYSTEM.md`, `REFERENCE_ANALYSIS.md`, and `CHANGELOG.md` continued describing outdated defaults and "browser inspection unavailable" notes.
- **Why it happened**: Code fixes were verified without updating corresponding markdown documentation in the same pass.
- **How it was corrected**: Conducted a full documentation-against-code audit across every markdown guide, package manifest, and config file.
- **How future agents should prevent it**: Treat documentation updates (`CHANGELOG.md`, `DESIGN_SYSTEM.md`, `COMPONENT_GUIDE.md`, `ANTIGRAVITY.md`) as part of the definition of done whenever layout structure or config defaults change.

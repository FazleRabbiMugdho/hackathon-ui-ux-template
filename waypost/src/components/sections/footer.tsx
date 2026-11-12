'use client';

import type { FooterConfig } from '@/config/types';

export interface FooterProps {
  config: FooterConfig;
  onNavigateHref?: (href: string) => void;
}

/**
 * Signature rounded-top espresso-dark footer (`border-radius: 44px 44px 0 0`)
 * overlapping the blueprint map canvas.
 */
export function Footer({ config, onNavigateHref }: FooterProps) {
  return (
    <footer
      id="footer"
      className="relative z-[3] -mt-[44px] rounded-t-[var(--ws-radius-canvas)] bg-[var(--ws-footer-bg)] px-[clamp(20px,6vw,90px)] pt-[90px] pb-[150px] text-[var(--ws-footer-ink)] md:pb-10 lg:pr-[230px]"
    >
      <div className="w-full">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
          <div>
            <h4 className="text-2xl font-black tracking-[-0.02em]">
              {config.brandTitle}
            </h4>
            <p className="mt-3 max-w-xs text-sm sm:text-base leading-relaxed opacity-90">
              {config.brandTagline}
            </p>
          </div>

          {config.columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-xl font-black tracking-[-0.02em]">{column.title}</h4>
              {column.links && (
                <ul className="mt-3 space-y-2 text-sm sm:text-base">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(event) => {
                          if (onNavigateHref && link.href.startsWith('#')) {
                            event.preventDefault();
                            onNavigateHref(link.href);
                          }
                        }}
                        className="opacity-90 no-underline transition-opacity hover:opacity-100 hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {column.lines && (
                <ul className="mt-3 space-y-2 text-sm sm:text-base opacity-90">
                  {column.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <p className="mt-14 border-t border-white/20 pt-6 text-sm opacity-85">
          {config.copyright}
        </p>
      </div>
    </footer>
  );
}

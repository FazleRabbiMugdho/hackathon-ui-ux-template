import React from 'react';
import { cn } from '@/lib/utils';

export interface DashboardLayoutProps {
  toolbar?: React.ReactNode;
  kpis?: React.ReactNode;
  main: React.ReactNode;
  aside?: React.ReactNode;
  stackAside?: boolean;
  className?: string;
}

/**
 * Reusable dashboard-style layout shell for analytics, AI pipelines, or operator consoles.
 * Adapts cleanly inside landing showcase sections or full-page app routes.
 */
export function DashboardLayout({
  toolbar,
  kpis,
  main,
  aside,
  stackAside = false,
  className,
}: DashboardLayoutProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--ws-radius-input)] border-2 border-[var(--ws-border-subtle)] bg-[var(--ws-bg)] p-4 sm:p-5',
        className,
      )}
    >
      {toolbar && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-[var(--ws-border-dashed)] pb-4">
          {toolbar}
        </div>
      )}

      {kpis && <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">{kpis}</div>}

      <div
        className={cn(
          'grid grid-cols-1 gap-4',
          aside && !stackAside ? 'lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]' : '',
        )}
      >
        <div className="min-w-0">{main}</div>
        {aside && <aside className="min-w-0">{aside}</aside>}
      </div>
    </div>
  );
}


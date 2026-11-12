'use client';

import React from 'react';
import { AlertTriangle, Inbox, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface LoadingStateProps {
  title?: string;
  description?: string;
  rows?: number;
  className?: string;
}

/**
 * Editorial loading state combining a subtle spinner header and warm skeleton bars.
 */
export function LoadingState({
  title = 'Syncing corridor telemetry…',
  description = 'Fetching latest stop readings and solar reserves.',
  rows = 3,
  className,
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'rounded-[var(--ws-radius-inner)] border-2 border-dashed border-[var(--ws-border-dashed)] bg-[var(--ws-bg)] p-6 sm:p-8',
        className,
      )}
    >
      <div className="flex items-center gap-3 text-[var(--ws-ink)]">
        <Loader2 className="h-5 w-5 animate-spin text-[var(--ws-accent)]" aria-hidden="true" />
        <div>
          <p className="font-extrabold tracking-[-0.02em]">{title}</p>
          <p className="text-sm text-[var(--ws-ink-secondary)]">{description}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3" aria-hidden="true">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-11 animate-pulse rounded-2xl bg-[var(--ws-surface-muted)]"
            style={{ opacity: 1 - i * 0.18 }}
          />
        ))}
      </div>
    </div>
  );
}

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Reusable empty state for filtered lists, dashboards, or first-run onboarding.
 */
export function EmptyState({
  title = 'No stops matched this view',
  description = 'Adjust your active corridor filter or seed a sample node to begin monitoring.',
  actionLabel,
  onAction,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-[var(--ws-radius-inner)] border-2 border-dashed border-[var(--ws-border-dashed)] bg-[var(--ws-bg)] px-6 py-10 text-center',
        className,
      )}
    >
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-[var(--ws-surface-muted)] text-[var(--ws-ink-secondary)]">
        {icon ?? <Inbox className="h-6 w-6" aria-hidden="true" />}
      </div>
      <h4 className="text-lg font-black tracking-[-0.02em] text-[var(--ws-ink)]">{title}</h4>
      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[var(--ws-ink-secondary)]">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button type="button" variant="outline" size="sm" onClick={onAction} className="mt-5">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export interface ErrorStateProps {
  title?: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Accessible error state with clear diagnostic copy and retry action.
 */
export function ErrorState({
  title = 'Unable to reach corridor feed',
  description = 'The telemetry gateway timed out. Check your connection or switch back to cached demo data.',
  retryLabel = 'Retry Connection',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-start gap-4 rounded-[var(--ws-radius-inner)] border-2 border-[var(--ws-danger)] bg-[var(--ws-danger-bg)] p-6 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="flex items-start gap-3.5">
        <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--ws-surface)] text-[var(--ws-danger)]">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h4 className="text-base font-black tracking-[-0.02em] text-[var(--ws-ink)]">{title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-[var(--ws-ink-secondary)]">
            {description}
          </p>
        </div>
      </div>
      {onRetry && (
        <Button type="button" variant="default" size="sm" onClick={onRetry} className="shrink-0">
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
}


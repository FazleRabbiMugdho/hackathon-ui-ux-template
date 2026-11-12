'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity, CheckCircle2, Radio } from 'lucide-react';
import type { ShowcaseConfig, ShowcaseTab } from '@/config/types';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/ui/section-heading';
import { EmptyState, ErrorState, LoadingState } from '@/components/ui/states';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CorridorStatusRailIllustration } from '@/components/visuals/waypost-illustrations';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { SplitSection } from '@/layouts/split-section';
import { cn } from '@/lib/utils';

type PreviewStateMode = 'live' | 'loading' | 'empty' | 'error';

export interface ShowcaseSectionProps {
  config: ShowcaseConfig;
  active?: boolean;
}

/**
 * Stop 04 — Alternating right-side Operator Console Stage (`ws-stp-r` / `ws-stp-wide-r`)
 * powered by TanStack React Query + Radix Tabs beside the CorridorStatusRailIllustration tile,
 * keeping the Bezier highway unobstructed down the open middle corridor.
 */
export function ShowcaseSection({ config, active = false }: ShowcaseSectionProps) {
  const [selectedTab, setSelectedTab] = useState(config.tabs[0]?.id ?? '');
  const [statePreview, setStatePreview] = useState<PreviewStateMode>('live');

  const activeTabConfig: ShowcaseTab =
    config.tabs.find((t) => t.id === selectedTab) ?? config.tabs[0];

  // Demonstrates TanStack React Query usage without requiring a live backend
  const { data: corridorData, refetch } = useQuery({
    queryKey: ['waypost-corridor', activeTabConfig.id],
    queryFn: async () => activeTabConfig,
    initialData: activeTabConfig,
  });

  const statusBadgeVariant = (status: 'healthy' | 'warning' | 'info') => {
    if (status === 'healthy') return 'positive' as const;
    if (status === 'warning') return 'warning' as const;
    return 'pill' as const;
  };

  return (
    <SplitSection
      id={config.id}
      stopNumber={config.stopNumber}
      active={active}
      layout="image-left"
      media={<CorridorStatusRailIllustration />}
      content={
        <>
          <SectionHeading
            eyebrow={config.eyebrow}
            title={config.title}
            lede={config.lede}
          />

          <Tabs
            value={selectedTab}
            onValueChange={(val) => {
              setSelectedTab(val);
              setStatePreview('live');
            }}
            className="mt-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-3.5">
              <TabsList aria-label="Corridor views">
                {config.tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Interactive UI State Inspector */}
              <div
                role="group"
                aria-label="Preview component state"
                className="inline-flex flex-wrap items-center gap-1 rounded-full border-2 border-[var(--ws-border-subtle)] bg-[var(--ws-bg)] p-1"
              >
                {(['live', 'loading', 'empty', 'error'] as PreviewStateMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setStatePreview(mode)}
                    aria-pressed={statePreview === mode}
                    className={cn(
                      'inline-flex cursor-pointer items-center justify-center rounded-full px-3.5 py-2.5 text-xs font-bold leading-none capitalize transition-colors',
                      statePreview === mode
                        ? 'bg-[var(--ws-accent)] text-[var(--ws-accent-contrast)]'
                        : 'text-[var(--ws-ink-secondary)] hover:text-[var(--ws-ink)]',
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <TabsContent value={activeTabConfig.id}>
              {statePreview === 'loading' && <LoadingState />}

              {statePreview === 'empty' && (
                <EmptyState
                  actionLabel="Restore Live Corridor"
                  onAction={() => setStatePreview('live')}
                />
              )}

              {statePreview === 'error' && (
                <ErrorState
                  onRetry={() => {
                    void refetch();
                    setStatePreview('live');
                  }}
                />
              )}

              {statePreview === 'live' && (
                <DashboardLayout
                  stackAside
                  toolbar={
                    <>
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--ws-positive-bg)] text-[var(--ws-positive)]">
                          <Radio className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-sm font-extrabold text-[var(--ws-ink)]">
                            {corridorData.label}
                          </p>
                          <p className="text-xs text-[var(--ws-ink-secondary)]">
                            {corridorData.summary}
                          </p>
                        </div>
                      </div>
                      <Badge variant="mono">Query Status · Synced</Badge>
                    </>
                  }
                  kpis={corridorData.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[var(--ws-radius-inner)] border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] p-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <span className="ws-font-mono text-[10px] uppercase tracking-wider text-[var(--ws-ink-secondary)]">
                          {metric.label}
                        </span>
                        <Badge variant={statusBadgeVariant(metric.status)}>
                          {metric.status}
                        </Badge>
                      </div>
                      <p className="mt-1.5 text-xl font-black tracking-tight text-[var(--ws-ink)]">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                  main={
                    <div className="overflow-hidden rounded-[var(--ws-radius-inner)] border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)]">
                      <div className="flex items-center justify-between border-b border-[var(--ws-border-subtle)] px-4 py-3">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--ws-ink-secondary)]">
                          Active Waypost Nodes
                        </span>
                        <Activity className="h-4 w-4 text-[var(--ws-accent)]" aria-hidden="true" />
                      </div>
                      <div className="divide-y divide-[var(--ws-border-subtle)]">
                        {corridorData.rows.map((row) => (
                          <div
                            key={row.id}
                            className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 text-sm"
                          >
                            <div className="flex items-center gap-3">
                              <span className="ws-font-mono rounded-lg bg-[var(--ws-surface-muted)] px-2 py-0.5 text-xs font-bold text-[var(--ws-ink)]">
                                {row.id}
                              </span>
                              <span className="font-bold text-[var(--ws-ink)]">{row.corridor}</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-semibold text-[var(--ws-ink-secondary)]">
                              <span>Load {row.load}</span>
                              <span>Uptime {row.uptime}</span>
                              <Badge variant={row.status === 'online' ? 'positive' : 'warning'}>
                                {row.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  }
                  aside={
                    <div className="flex flex-col justify-between gap-4 rounded-[var(--ws-radius-inner)] border border-[var(--ws-border-subtle)] bg-[var(--ws-surface)] p-4 sm:flex-row sm:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="mono">Adapter Spec</Badge>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--ws-positive)]">
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            Zero-backend verified
                          </span>
                        </div>
                        <h4 className="mt-2 text-base font-black tracking-[-0.02em] text-[var(--ws-ink)]">
                          Demo Query → Supabase
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-[var(--ws-ink-secondary)]">
                          Runs on local mock data via TanStack React Query. Set{' '}
                          <code className="ws-font-mono text-[11px]">NEXT_PUBLIC_SUPABASE_URL</code>{' '}
                          to stream live Postgres rows.
                        </p>
                      </div>
                    </div>
                  }
                />
              )}
            </TabsContent>
          </Tabs>
        </>
      }
    />
  );
}

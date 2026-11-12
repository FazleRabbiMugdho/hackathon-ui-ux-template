import React from 'react';
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Compass,
  Layers,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import type { LucideIconName } from '@/config/types';

const ICON_MAP: Record<LucideIconName, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  compass: Compass,
  zap: Zap,
  'shield-check': ShieldCheck,
  radio: Radio,
  'map-pin': MapPin,
  'bar-chart-3': BarChart3,
  clock: Clock,
  users: Users,
  leaf: Leaf,
  activity: Activity,
  sparkles: Sparkles,
  layers: Layers,
  phone: Phone,
  mail: Mail,
  'arrow-up-right': ArrowUpRight,
  'check-circle-2': CheckCircle2,
};

export interface IconResolverProps {
  name: LucideIconName;
  className?: string;
}

export function IconResolver({ name, className }: IconResolverProps) {
  const Icon = ICON_MAP[name] ?? Compass;
  return <Icon className={className} aria-hidden />;
}


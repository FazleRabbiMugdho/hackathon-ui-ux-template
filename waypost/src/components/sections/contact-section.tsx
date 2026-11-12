'use client';

import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import type { ContactConfig } from '@/config/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormField, Input, Select, Textarea } from '@/components/ui/form-field';
import { NumberedPin } from '@/components/ui/numbered-pin';
import { SectionHeading } from '@/components/ui/section-heading';
import { WayfinderPinIllustration } from '@/components/visuals/waypost-illustrations';
import { cn } from '@/lib/utils';

interface FormValues {
  name: string;
  email: string;
  role: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface ContactSectionProps {
  config: ContactConfig;
  active?: boolean;
}

/**
 * Stop 07 — Contact details + validated demo dispatch form with role selector,
 * inline error messages, loading state, and clear demo-only confirmation.
 */
export function ContactSection({ config, active = false }: ContactSectionProps) {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    role: config.roles[0] ?? 'Hackathon Builder',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<string | null>(null);

  const validate = (next: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};
    if (next.name.trim().length < 2) {
      nextErrors.name = 'Please enter at least 2 characters for your name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (next.message.trim().length < 10) {
      nextErrors.message = 'Please share a brief note (at least 10 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate(values);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      return;
    }

    setSubmitting(true);
    setSubmittedReceipt(null);

    // Simulated async submission for zero-backend demo template
    await new Promise((resolve) => setTimeout(resolve, 450));

    setSubmitting(false);
    setSubmittedReceipt(
      `Demo receipt #WP-${Math.floor(1000 + Math.random() * 9000)} logged locally for ${values.name.trim()} (${values.role}).`,
    );
    setValues((prev) => ({ ...prev, name: '', email: '', message: '' }));
  };

  return (
    <section
      id={config.id}
      className="ws-stp ws-stp-l ws-stp-contact gap-y-6 scroll-mt-24"
    >
      {/* Left column aligned with corridor spine (`edge-right` pin): Dispatch Form */}
      <div className="ws-stp-card">
        <Card variant={active ? 'lit' : 'default'} side="left" className="h-full">
          <NumberedPin
            number={config.stopNumber}
            active={active}
            position="edge-right"
          />

          <h3 className="text-2xl font-black tracking-[-0.03em] text-[var(--ws-ink)]">
            {config.formTitle}
          </h3>
          <p className="mt-1.5 text-sm font-medium text-[var(--ws-ink-secondary)]">
            {config.formSubtitle}
          </p>

          {/* Role Pill Selector (reference `.mis-tabs` proportions) */}
          <div
            role="radiogroup"
            aria-label="Select your role"
            className="mt-5 flex flex-wrap gap-2.5"
          >
            {config.roles.map((role) => {
              const selected = values.role === role;
              return (
                <button
                  key={role}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setValues((prev) => ({ ...prev, role }))}
                  className={cn(
                    'cursor-pointer rounded-full border-2 border-[var(--ws-ink)] px-[18px] py-[10px] text-sm font-bold leading-none transition-colors',
                    selected
                      ? 'bg-[var(--ws-ink)] text-[var(--ws-bg)]'
                      : 'bg-transparent text-[var(--ws-ink)] hover:bg-[var(--ws-hover-tint)]',
                  )}
                >
                  {role}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-4">
            <FormField id="contact-name" label="Your name" required error={errors.name}>
              <Input
                id="contact-name"
                name="name"
                type="text"
                placeholder="e.g. Jordan Rivera"
                value={values.name}
                hasError={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                onChange={(e) => {
                  setValues((prev) => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
              />
            </FormField>

            <FormField id="contact-email" label="Email address" required error={errors.email}>
              <Input
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@hackathon.org"
                value={values.email}
                hasError={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                onChange={(e) => {
                  setValues((prev) => ({ ...prev, email: e.target.value }));
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
              />
            </FormField>

            <FormField id="contact-role-select" label="Track / Category">
              <Select
                id="contact-role-select"
                name="role"
                value={values.role}
                onChange={(e) => setValues((prev) => ({ ...prev, role: e.target.value }))}
              >
                {config.roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField id="contact-message" label="Project or corridor notes" required error={errors.message}>
              <Textarea
                id="contact-message"
                name="message"
                placeholder="Tell us about your stop, problem statement, or sensor feed..."
                value={values.message}
                hasError={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                onChange={(e) => {
                  setValues((prev) => ({ ...prev, message: e.target.value }));
                  if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                }}
              />
            </FormField>

            <div className="flex pt-1">
              <Button type="submit" size="lg" isLoading={submitting}>
                {submitting ? 'Logging dispatch…' : 'Send Dispatch Note'}
              </Button>
            </div>
          </form>

          {submittedReceipt && (
            <div
              role="status"
              className="mt-5 flex items-start gap-2.5 rounded-[var(--ws-radius-inner)] bg-[var(--ws-positive-bg)] px-4 py-3 text-sm font-bold text-[var(--ws-positive)]"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{submittedReceipt}</span>
            </div>
          )}

          <p className="mt-5 text-xs leading-relaxed text-[var(--ws-ink-secondary)]">
            {config.demoNotice}
          </p>
        </Card>
      </div>

      {/* Right column across the road: Contact Details + Wayfinder Illustration Tile */}
      <div className="ws-stp-tile flex flex-col gap-6">
        <Card
          variant={active ? 'lit' : 'default'}
          isStopCard={false}
          data-info-card={config.stopNumber - 1}
        >
          <SectionHeading
            eyebrow={config.eyebrow}
            title={config.title}
            lede={config.lede}
          />

          <div className="mt-5 space-y-3.5">
            <p className="flex items-start gap-3 text-base sm:text-lg font-semibold text-[var(--ws-ink)]">
              <MapPin className="mt-0.5 h-[22px] w-[22px] shrink-0 text-[var(--ws-accent)]" aria-hidden="true" />
              <span>{config.location}</span>
            </p>

            <a
              href={`tel:${config.phone.replace(/[^+\d]/g, '')}`}
              className="flex items-center gap-3 text-[clamp(1.35rem,2.2vw,1.9rem)] font-extrabold tracking-[-0.02em] text-[var(--ws-ink)] no-underline transition-colors hover:text-[var(--ws-accent-text)]"
            >
              <Phone className="h-[22px] w-[22px] shrink-0 text-[var(--ws-accent)]" aria-hidden="true" />
              <span>{config.phone}</span>
            </a>

            <a
              href={`mailto:${config.email}`}
              className="flex items-center gap-3 text-[clamp(1.35rem,2.2vw,1.9rem)] font-extrabold tracking-[-0.02em] text-[var(--ws-ink)] no-underline transition-colors hover:text-[var(--ws-accent-text)]"
            >
              <Mail className="h-[22px] w-[22px] shrink-0 text-[var(--ws-accent)]" aria-hidden="true" />
              <span>{config.email}</span>
            </a>

            <div className="rounded-[var(--ws-radius-inner)] bg-[var(--ws-bg)] px-[18px] py-[14px] text-sm sm:text-base font-semibold text-[var(--ws-ink)]">
              <strong className="mr-2 font-black">{config.hoursLabel}:</strong>
              <span className="text-[var(--ws-ink-secondary)]">{config.hoursValue}</span>
            </div>
          </div>
        </Card>

        <div
          data-tile="true"
          data-tile-for={config.stopNumber - 1}
          aria-hidden="true"
          className={cn(
            'ws-stop-tile relative min-h-[260px] flex-1 overflow-hidden rounded-[var(--ws-radius-card)] border-2 border-[var(--ws-ink-secondary)] [&.lit]:opacity-100 [&.lit]:scale-100',
            active && 'lit',
          )}
        >
          <WayfinderPinIllustration />
        </div>
      </div>
    </section>
  );
}


"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Activity, Heart, Sparkles, Clock, User, Star, Check, ArrowRight, Calendar, Mail, Info } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";

type ClassItem = { title: string; description: string; duration: string; level: string };
type PhilosophyItem = { title: string; description: string };
type InstructorItem = { name: string; role: string; bio: string; image: string };
type PricingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
};
type ContactDetail = { label: string; value: string };
type ScheduleDay = { day: string; classes: { time: string; title: string; instructor: string }[] };

const CLASS_ICONS = [Activity, Heart, Sparkles, User, Heart, Clock];
const PHILOSOPHY_ICONS = [Calendar, User, Sparkles, Heart];
const CONTACT_ICONS = [Info, Clock, Mail];

function raw<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function FreeTrialForm() {
  const t = useTranslations();
  const classOptions = raw<ClassItem>(t.raw("classTypes.items"));
  const [form, setForm] = useState({ name: "", email: "", classType: classOptions[0]?.title ?? "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-glow">
        <Check className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
        <p className="mt-4 text-lg font-medium text-card-foreground">{t("freeTrial.successMessage")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-glow sm:p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="trial-name" className="mb-1.5 block text-sm font-medium text-card-foreground">
            {t("freeTrial.nameLabel")}
          </label>
          <input
            id="trial-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring"
            placeholder={t("freeTrial.namePlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="trial-email" className="mb-1.5 block text-sm font-medium text-card-foreground">
            {t("freeTrial.emailLabel")}
          </label>
          <input
            id="trial-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring"
            placeholder={t("freeTrial.emailPlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="trial-class" className="mb-1.5 block text-sm font-medium text-card-foreground">
            {t("freeTrial.classLabel")}
          </label>
          <select
            id="trial-class"
            value={form.classType}
            onChange={(e) => setForm((prev) => ({ ...prev, classType: e.target.value }))}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-ring"
          >
            {classOptions.map((c) => (
              <option key={c.title} value={c.title}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none"
        >
          {t("freeTrial.submitLabel")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

export default function Home() {
  const t = useTranslations();
  const scheduleT = useTranslations("schedule");
  const classTypes = raw<ClassItem>(t.raw("classTypes.items"));
  const philosophyItems = raw<PhilosophyItem>(t.raw("philosophy.items"));
  const instructors = raw<InstructorItem>(t.raw("instructors.items"));
  const plans = raw<PricingPlan>(t.raw("pricing.plans"));
  const contactDetails = raw<ContactDetail>(t.raw("contact.details"));
  const scheduleDays = raw<ScheduleDay>(scheduleT.raw("days"));

  return (
    <main>
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden bg-mesh">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:py-32 lg:grid-cols-2">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground"
              >
                {t("hero.eyebrow")}
              </motion.span>
              <motion.h1
                variants={fadeInUp}
                className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl"
              >
                {t("hero.title")} <span className="text-gradient">{t("hero.titleAccent")}</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground"
              >
                {t("hero.subtitle")}
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#free-trial"
                  className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none"
                >
                  {t("hero.primaryCta")}
                </a>
                <a
                  href="#class-types"
                  className="rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-card-foreground transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none"
                >
                  {t("hero.secondaryCta")}
                </a>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="relative"
            >
              <div className="glass-strong relative overflow-hidden rounded-2xl p-3 shadow-glow">
                <img
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/0956df5de9fd477782b09c3ac46d0bcd.jpg"
                  alt="A client moving through a reformer pilates sequence in a bright studio"
                  className="h-[420px] w-full rounded-xl object-cover"
                />
              </div>
              <div className="glass absolute -bottom-6 -left-6 hidden rounded-xl px-5 py-4 shadow-glow sm:block">
                <p className="text-sm font-semibold text-card-foreground">{t("hero.capacityBadge")}</p>
                <p className="text-xs text-muted-foreground">{t("hero.capacitySubtext")}</p>
              </div>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Class Types */}
      <Reveal>
        <section id="class-types" className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{t("classTypes.eyebrow")}</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t("classTypes.title")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("classTypes.subtitle")}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {classTypes.map((item, i) => {
                const Icon = CLASS_ICONS[i % CLASS_ICONS.length];
                return (
                  <div
                    key={item.title}
                    className="rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs font-medium text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {item.duration}
                      </span>
                      <span>{item.level}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Philosophy */}
      <Reveal>
        <section className="bg-muted/40 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{t("philosophy.eyebrow")}</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t("philosophy.title")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("philosophy.subtitle")}</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {philosophyItems.map((item, i) => {
                const Icon = PHILOSOPHY_ICONS[i % PHILOSOPHY_ICONS.length];
                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Instructors */}
      <Reveal>
        <section id="instructors" className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{t("instructors.eyebrow")}</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t("instructors.title")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("instructors.subtitle")}</p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {instructors.map((person) => (
                <div key={person.name} className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
                  <img src={person.image} alt={person.name} className="h-64 w-full object-cover" />
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold">{person.name}</h3>
                    <p className="text-sm font-medium text-primary">{person.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Weekly Class Schedule */}
      <Reveal>
        <section id="schedule" className="bg-muted/40 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{scheduleT("eyebrow")}</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{scheduleT("title")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{scheduleT("subtitle")}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
              {scheduleDays.map((day) => (
                <div key={day.day} className="rounded-lg border border-border bg-card p-4 text-card-foreground">
                  <h3 className="font-display text-base font-semibold">{day.day}</h3>
                  <div className="mt-3 space-y-3">
                    {day.classes.map((cls, i) => (
                      <div key={i} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                        <div className="flex items-center gap-1.5 text-sm font-medium">
                          <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                          {cls.time}
                        </div>
                        <p className="mt-1 text-sm text-card-foreground">{cls.title}</p>
                        <p className="text-sm text-muted-foreground">{cls.instructor}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Pricing */}
      <Reveal>
        <section id="pricing" className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{t("pricing.eyebrow")}</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t("pricing.title")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("pricing.subtitle")}</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={
                    plan.highlighted
                      ? "relative flex flex-col rounded-2xl border-2 border-primary bg-card p-8 text-card-foreground shadow-glow"
                      : "relative flex flex-col rounded-2xl border border-border bg-card p-8 text-card-foreground shadow-sm"
                  }
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-card-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#free-trial"
                    className={
                      plan.highlighted
                        ? "mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none"
                        : "mt-8 inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-card-foreground transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none"
                    }
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Free Trial */}
      <Reveal>
        <section id="free-trial" className="bg-mesh py-20 md:py-28">
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{t("freeTrial.eyebrow")}</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t("freeTrial.title")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("freeTrial.subtitle")}</p>
            </div>
            <FreeTrialForm />
          </div>
        </section>
      </Reveal>

      {/* Contact */}
      <Reveal>
        <section id="contact" className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{t("contact.eyebrow")}</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{t("contact.title")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("contact.subtitle")}</p>
            </div>
            <div className="mx-auto flex max-w-md flex-col gap-6">
              {contactDetails.map((detail, i) => {
                const Icon = CONTACT_ICONS[i % CONTACT_ICONS.length];
                return (
                  <div key={detail.label} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{detail.label}</p>
                      <p className="text-sm font-medium text-card-foreground">{detail.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}

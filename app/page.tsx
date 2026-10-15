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
  const classTypes = raw<ClassItem>(t.raw("classTypes.items"));
  const philosophyItems = raw<PhilosophyItem>(t.raw("philosophy.items"));
  const instructors = raw<InstructorItem>(t.raw("instructors.items"));
  const plans = raw<PricingPlan>(t.raw("pricing.plans"));
  const contactDetails = raw<ContactDetail>(t.raw("contact.details"));

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

      {/* Class types */}
      <Reveal>
        <section id="class-types" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">{t("classTypes.eyebrow")}</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("classTypes.title")}
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{t("classTypes.subtitle")}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {classTypes.map((item, i) => {
              const Icon = CLASS_ICONS[i % CLASS_ICONS.length] ?? Activity;
              return (
                <Reveal key={item.title} delay={i * 0.06} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-card-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    <div className="mt-5 flex items-center gap-3 text-xs font-medium text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {item.duration}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.level}</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* Philosophy / value props */}
      <Reveal>
        <section className="border-y border-border bg-secondary">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-primary">{t("philosophy.eyebrow")}</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t("philosophy.title")}
              </h2>
              <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("philosophy.subtitle")}
              </p>
            </div>
            <div className="divide-y divide-border">
              {philosophyItems.map((item, i) => {
                const Icon = PHILOSOPHY_ICONS[i % PHILOSOPHY_ICONS.length] ?? Sparkles;
                return (
                  <Reveal key={item.title} delay={i * 0.06}>
                    <div className="flex gap-4 py-5 first:pt-0">
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-card">
                        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Instructors */}
      <Reveal>
        <section id="instructors" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">{t("instructors.eyebrow")}</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("instructors.title")}
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{t("instructors.subtitle")}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {instructors.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.07}>
                <div className="surface-elevated overflow-hidden rounded-2xl border border-border bg-card">
                  <img src={person.image} alt={`Portrait of ${person.name}, ${person.role}`} className="h-56 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="font-semibold text-card-foreground">{person.name}</h3>
                    <p className="text-xs font-medium uppercase tracking-wide text-primary">{person.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Pricing */}
      <Reveal>
        <section id="pricing" className="relative overflow-hidden bg-mesh">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-wide text-primary">{t("pricing.eyebrow")}</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t("pricing.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{t("pricing.subtitle")}</p>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {plans.map((plan, i) => (
                <Reveal key={plan.name} delay={i * 0.08}>
                  <div
                    className={
                      plan.highlighted
                        ? "glass-strong relative flex h-full flex-col rounded-2xl p-8 shadow-glow ring-1 ring-primary/40"
                        : "glass relative flex h-full flex-col rounded-2xl p-8"
                    }
                  >
                    {plan.badge ? (
                      <span className="absolute -top-3 left-8 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        <Star className="h-3 w-3" aria-hidden="true" /> {plan.badge}
                      </span>
                    ) : null}
                    <h3 className="text-lg font-semibold text-card-foreground">{plan.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight text-foreground">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    <ul className="mt-6 flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="mt-0.5 h-4 w-4 flex-none text-primary" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#free-trial"
                      className={
                        plan.highlighted
                          ? "mt-8 flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none"
                          : "mt-8 flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-card-foreground transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none"
                      }
                    >
                      {plan.cta}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Free trial sign-up */}
      <Reveal>
        <section id="free-trial" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-primary">{t("freeTrial.eyebrow")}</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t("freeTrial.title")}
              </h2>
              <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("freeTrial.subtitle")}
              </p>
            </div>
            <FreeTrialForm />
          </div>
        </section>
      </Reveal>

      {/* Contact */}
      <Reveal>
        <section id="contact" className="border-t border-border bg-secondary">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 md:py-28 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d26f4cc299214ddd9e2f97cfffc6f0a9.jpg"
                alt="The entrance and reception area of Northside Pilates studio"
                className="h-80 w-full rounded-2xl object-cover shadow-glow"
              />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-primary">{t("contact.eyebrow")}</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t("contact.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{t("contact.subtitle")}</p>
              <ul className="mt-8 space-y-5">
                {contactDetails.map((detail, i) => {
                  const Icon = CONTACT_ICONS[i % CONTACT_ICONS.length] ?? Info;
                  return (
                    <li key={detail.label} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-card">
                        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {detail.label}
                        </p>
                        <p className="text-sm font-medium text-foreground">{detail.value}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
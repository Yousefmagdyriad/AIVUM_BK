/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'ar' | 'es' | 'pt';

export interface NavTranslations {
  home: string;
  services: string;
  howItWorks: string;
  about: string;
  contact: string;
}

export interface HeroTranslations {
  badge: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  iconName: 'import' | 'export' | 'sourcing' | 'maintenance' | 'logistics';
}

export interface ServicesTranslations {
  eyebrow: string;
  heading: string;
  items: ServiceItem[];
}

export interface ProcessStep {
  id: number;
  number: string;
  title: string;
  desc: string;
}

export interface ProcessTranslations {
  eyebrow: string;
  heading: string;
  steps: ProcessStep[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface StatsTranslations {
  items: StatItem[];
}

export interface AboutTranslations {
  eyebrow: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  tagline: string;
}

export interface ContactTranslations {
  eyebrow: string;
  heading: string;
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  submitButton: string;
  submittingState: string;
  successState: string;
  phoneLabel: string;
  emailContactLabel: string;
  addressLabel: string;
}

export interface FooterTranslations {
  tagline: string;
  companyTitle: string;
  servicesTitle: string;
  legalTitle: string;
  links: {
    about: string;
    careers: string;
    press: string;
    privacy: string;
    terms: string;
    cookies: string;
  };
  copyright: string;
}

export interface AppTranslations {
  nav: NavTranslations;
  hero: HeroTranslations;
  services: ServicesTranslations;
  process: ProcessTranslations;
  stats: StatsTranslations;
  about: AboutTranslations;
  contact: ContactTranslations;
  footer: FooterTranslations;
}

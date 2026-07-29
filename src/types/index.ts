export interface NavLink {
  href: string;
  label: string;
}

export interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

export interface StatItem {
  icon: string;
  value: string;
  label: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HeroTitleSegment {
  text: string;
  color?: "cyan" | "blue-light";
}

export interface HeroSlide {
  badge: string;
  titleLines: HeroTitleSegment[][];
  description: string;
  features: string[];
  image: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

export interface ProductItem {
  badge: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

export interface BlogArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  lead: string;
  image?: string;
  gradient?: string;
  icon?: string;
  featured?: boolean;
  categoryColor?: string;
}

export interface ArticleData {
  title: string;
  category: string;
  date: string;
  dateIso?: string;
  time: string;
  lead: string;
  image: string;
  summary: string;
  points: string[];
  sections: [string, string, string][];
}

export interface GuidanceData {
  metrics: string[][];
  mistakes: string[];
  faqs: [string, string][];
}
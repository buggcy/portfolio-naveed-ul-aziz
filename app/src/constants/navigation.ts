export interface NavItem {
  label: string;
  href: string;
  section?: string;
}

export const navigationItems: NavItem[] = [
  { label: "Works", href: "#works", section: "works" },
  { label: "About", href: "#about", section: "about" },
  { label: "Testimonials", href: "#testimonial", section: "testimonial" },
  { label: "Articles", href: "#articles", section: "articles" },
];

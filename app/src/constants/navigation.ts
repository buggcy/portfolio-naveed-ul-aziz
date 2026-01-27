export interface NavItem {
  label: string;
  href: string;
  section?: string;
}

export const navigationItems: NavItem[] = [
  { label: "Works", href: "#works", section: "works" },
  { label: "About", href: "#about", section: "about" },
  { label: "Experience", href: "#experience", section: "experience" },
];

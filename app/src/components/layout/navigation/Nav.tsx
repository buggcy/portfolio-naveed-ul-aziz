"use client";

import { navigationItems, NavItem } from "@/app/src/constants";

interface NavProps {
  onNavClick?: (href: string) => void;
  isOverDarkSection?: boolean;
}

export default function Nav({
  onNavClick,
  isOverDarkSection = false,
}: NavProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const offsetTop = element.offsetTop - 64;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }

    if (onNavClick) {
      onNavClick(href);
    }
  };

  return (
    <nav
      className={`flex flex-col md:flex-row items-center gap-1.5 px-3 py-1.5 rounded-2xl md:rounded-full shadow-md w-full md:w-auto transition-colors ${
        isOverDarkSection ? "bg-white/10 backdrop-blur-md" : "bg-white"
      }`}
    >
      {navigationItems.map((item: NavItem) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => handleClick(e, item.href)}
          className={`text-xs font-medium transition-colors relative px-3 py-1 rounded-full ${
            isOverDarkSection
              ? "text-gray-200 hover:text-white"
              : "text-gray-600 hover:text-blue-400"
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

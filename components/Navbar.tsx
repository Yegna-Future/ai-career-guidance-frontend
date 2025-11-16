"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InteractiveGridPattern } from "./ui/interactive-grid-pattern";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Universities", href: "/universities" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "Career Mapper", href: "/career-mapper" },
  { label: "Resources", href: "/resources" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-transparent backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">YF</span>
          </div>
          <span className="text-xl font-semibold text-primary">YegnaFuture</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  relative
                  hover:text-indigo-900 transition-colors
                  ${isActive ? "font-bold text-indigo-900" : ""}
                `}
              >
                {item.label}
                {/* Underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 w-full bg-indigo-900 transition-all ${isActive ? "scale-x-100" : "scale-x-0"
                    } origin-left`}
                />
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3 text-sm">
            <Link
              href="/get-guidance"
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200 hover:bg-blue-100 transition"
            >
              <span className="font-medium">Get Guidance</span>
            </Link>
            <Link
              href="/join-community"
              className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200 hover:bg-purple-100 transition"
            >
              <span className="font-medium">Join Community</span>
            </Link>
          </div>

          <Link href="/login">
            <Button variant="primary" size="lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

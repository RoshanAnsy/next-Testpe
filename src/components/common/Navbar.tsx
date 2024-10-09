"use client";
import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Moon, User, Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const { setTheme } = useTheme();
  const pathname = usePathname();

  // Mock user authentication check
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    setIsLoggedIn(!!token); // Set logged-in state based on token presence
  }, [pathname]);

  // Function to close the sidebar on mobile after clicking a link
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false); // Close sidebar if on mobile screen
    }
  };

  return (
    <nav className="bg-white p-2 shadow-md fixed left-0 right-0 top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-2xl bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent"
        >
          TESTPE
        </Link>

        {/* Menu button for mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </Button>

        {/* Icons for larger screens */}
        <div className="hidden lg:flex items-center space-x-4">
          <div>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {isLoggedIn ? (
            <Link href="/profile" className="rounded-full hover:bg-slate-100 p-2">
              <User className="h-5 w-5 text-gray-700" />
              <span className="sr-only">User profile</span>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu (Sidebar opens from right) */}
      {isOpen && (
        <div className="lg:hidden fixed inset-y-0 right-0 w-64 bg-neutral-100 p-4 shadow-lg z-40 transform transition-transform duration-300">
          <a
            href="/"
            className="block py-2 text-gray-700 hover:text-blue-500"
            onClick={handleLinkClick}
          >
            Home
          </a>
          <div className="flex justify-start space-x-4 mt-4">
            <Button variant="ghost" size="icon">
              <Moon className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Toggle dark mode</span>
            </Button>

            {isLoggedIn ? (
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5 text-gray-700" />
                <span className="sr-only">User profile</span>
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}

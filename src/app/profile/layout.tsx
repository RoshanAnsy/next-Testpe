"use client";

import { useState } from "react";
import { ReactNode } from "react";
import Link from "next/link";
import { PiUploadSimple } from "react-icons/pi";
import { SlPeople } from "react-icons/sl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BsBoxArrowInRight } from "react-icons/bs";
import { IoToggleOutline } from "react-icons/io5"; // Mobile menu button icon

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast({ title: "You logged out successfully" });
  };

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to close sidebar after clicking a link (for mobile screens only)
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false); // Close sidebar on mobile
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row gap-x-2 mt-24 max-w-[95vw] mx-auto mb-2">
      {/* Mobile menu button */}
      <div className="lg:hidden flex justify-between p-4 ">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-700 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <IoToggleOutline className="text-2xl" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 z-40 mt-20 w-44 sm:w-64 h-full bg-white lg:bg-transparent transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:w-auto lg:block  lg:shadow-none`}
      >
        <Card className="w-full max-w-sm p-6 rounded-lg shadow-md lg:shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-black">
              Welcome to <span className="text-blue-500">TESTPE</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <nav>
              <ul>
                <li className="mb-4">
                  <Link href="/profile" onClick={handleLinkClick} className="flex gap-2 justify-center items-center">
                    <span><SlPeople /></span> Profile
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/profile/upload" onClick={handleLinkClick} className="flex gap-2 justify-center items-center">
                    <span><PiUploadSimple /></span> Upload
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" onClick={() => { handleLogout(); handleLinkClick(); }} className="flex gap-2 justify-center items-center">
                    <span><BsBoxArrowInRight /></span> Logout
                  </Link>
                </li>
              </ul>
            </nav>
          </CardContent>
        </Card>
      </aside>

      {/* Main Content */}
      <Card className="w-full p-6 rounded-lg shadow-md">
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </Card>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden mt-20"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
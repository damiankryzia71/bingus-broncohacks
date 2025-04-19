import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import "@/index.css";

interface NavbarProps {
  name: string;
}

export default function Navbar({ name }: NavbarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const navItems = [
    { path: "/check-in", label: "Daily Check in" },
    { path: "/graph", label: "Wellness Graph" },
    { path: "/journal", label: "Journal" },
  ];

  return (
    <div className="w-full pt-6">
      {/* Top Bar using shadcn Card */}
      <Card className="bg-[#C8BFE7] shadow-md rounded-xl w-full max-w-7xl mx-auto border-0">
        <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 py-0 px-4">
          <h1 className="text-2xl font-semibold">Welcome, {name}</h1>
          <span className="text-2xl">{date}</span>
        </CardContent>
      </Card>

      {/* Navigation Buttons using shadcn Button */}
      <div className="w-full px-4 mt-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 sm:items-stretch">
          {navItems.map((item) => (
            <Link to={item.path} className="flex-1" key={item.path}>
              <Button
                className={`w-full text-lg py-6 rounded-xl shadow font-medium transition-all ${
                  currentPath === item.path
                    ? "bg-[#A084FF] text-black"
                    : "bg-[#c8bfe7] text-black hover:brightness-110"
                }`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

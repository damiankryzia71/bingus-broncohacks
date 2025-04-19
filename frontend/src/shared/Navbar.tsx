import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import clsx from "clsx";

export default function Navbar() {
  return (
    <Card className="flex items-center justify-between p-4 shadow-md rounded-2xl">
      <h1 className="text-4xl font-bold">Check-in Buddy</h1>
      <div className="space-x-4">
        <NavLink to="/" end>
          {({ isActive }) => (
            <Button variant={isActive ? "default" : "outline"}>Daily Check-in</Button>
          )}
        </NavLink>
        <NavLink to="/history">
          {({ isActive }) => (
            <Button variant={isActive ? "default" : "outline"}>History</Button>
          )}
        </NavLink>
      </div>
    </Card>
  );
}

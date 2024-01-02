import { navLinks } from "@/constants";
import React from "react";

function Navbar() {
  return (
    <div className="w-full h-16 bg-black text-white flex justify-between p-4 shadow-lg">
      <div className="flex gap-5">
        {navLinks.map((link) => (
          <a key={link.link} href={link.link}>
            {link.name}
          </a>
        ))}
      </div>
      <div>User Info</div>
    </div>
  );
}

export default Navbar;

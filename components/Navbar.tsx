import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { navLinks } from "@/constants";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";

async function Navbar() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <></>;
  }
  return (
    <div className="w-full h-16 bg-black text-white flex justify-between p-4 shadow-lg">
      <div className="flex gap-5">
        {navLinks.map((link) => (
          <a key={link.link} href={link.link}>
            {link.name}
          </a>
        ))}
      </div>
      {session?.user.email && <div>Hi, {session.user.email}</div>}
    </div>
  );
}

export default Navbar;

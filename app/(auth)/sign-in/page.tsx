import { Button, Form, Input } from "antd";
import React from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";
import { useToaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignIn from "@/components/forms/SignIn";
import Link from "next/link";

async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/cats");
  }
  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <h1 className="mb-6 font-extralight text-4xl">
          Hi again, Sign In here...
        </h1>
        <SignIn />
      </div>
      <span>
        Not a member ? You can Sign Up{" "}
        <Link className="text-blue-500 hover:text-blue-600" href="/sign-up">
          here
        </Link>
      </span>
    </div>
  );
}

export default Page;

import { Button, Form, Input } from "antd";
import React from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";
import SignUp from "@/components/forms/SignUp";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
type FieldType = {
  email?: string;
  password?: string;
};
async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/cats");
  }
  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <h1 className="mb-6 font-extralight text-4xl">
          Hi again, Sign Up here...
        </h1>
        <SignUp />
      </div>
    </div>
  );
}

export default Page;

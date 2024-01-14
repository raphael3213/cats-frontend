import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myCats"],
    queryFn: async () => {
      const response = axios.get("http://localhost:3000/cats");
    },
  });
  return <div>In Cats Page</div>;
}

export default Page;

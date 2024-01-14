import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "The cats name should have atleast 1 character"),
});

type FormDataType = z.infer<typeof formSchema>;
function CreateCat() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
  });
  return <div>CreateCat</div>;
}

export default CreateCat;

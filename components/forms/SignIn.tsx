"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Input } from "antd";
import { signIn } from "next-auth/react";
import React from "react";
import {
  FieldError,
  FieldErrors,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password length must be minimum 8 characters"),
});

type FormDataType = z.infer<typeof validationSchema>;

type FormDataErrorType = FieldErrors<{
  email: FieldError;
  password: FieldError;
}>;

function SignIn() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormDataType>({
    resolver: zodResolver(validationSchema),
  });
  const onFinish: SubmitHandler<FormDataType> = async (values) => {
    try {
      const data = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false, // Change to `true` to redirect after successful login
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
        return;
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log("In error : ", e.message);
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex-col flex w-full">
      <div className="flex justify-center items-center border-2 border-gray-500 p-3 rounded-2xl">
        <form
          onSubmit={handleSubmit(onFinish)}
          className="flex-col flex w-full"
        >
          <div className="flex flex-col w-full gap-2 mb-3">
            <label htmlFor="">Email</label>
            <input
              type="text"
              className="border-2 p-2 rounded-3xl"
              {...register("email")}
            />
          </div>

          <div className="flex flex-col w-full gap-2 mb-3">
            <label htmlFor="">Password</label>
            <input
              className="border-2 p-2 rounded-3xl"
              {...register("password")}
            />
          </div>

          <button type="submit" className="p-2 mt-5 bg-green-500 rounded-3xl">
            Submit
          </button>
        </form>
      </div>
      <div className="flex flex-col w-1/3 mt-3 text-red-600">
        {errors &&
          Object.keys(errors).map((errorKey) => {
            const error = errors[errorKey as keyof FormDataErrorType];
            if (error !== undefined) {
              return <span key={errorKey}>{error.message}</span>;
            }
            return;
          })}
      </div>
    </div>
  );
}

export default SignIn;

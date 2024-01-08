"use client";
import { Button, Form, Input } from "antd";
import React from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";
import { useToaster } from "react-hot-toast";
import toast from "react-hot-toast";

type FieldType = {
  email?: string;
  password?: string;
};
function SignIn() {
  const toaster = useToaster();
  const onFinish = async (values: any) => {
    try {
      const data = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false, // Change to `true` to redirect after successful login
      });
      if (data?.error) {
        toast.error(data.error);
        //toastserror(data.error);
      }
      console.log("In data : ", data);
    } catch (e) {
      if (e instanceof Error) {
        console.log("In error : ", e.message);
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const getCats = async () => {
    try {
      const cats = await axios.get("http://localhost:3000/cats");
      console.log(cats);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item<FieldType>
            label="email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;

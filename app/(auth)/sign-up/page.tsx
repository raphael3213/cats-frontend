"use client";
import { Button, Form, Input } from "antd";
import React from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";
type FieldType = {
  email?: string;
  password?: string;
};
function SignUp() {
  const onFinish = async (values: any) => {
    const data = {
      email: "jell1o@yop.com",
      password: "123",
    };

    const authData = await axios.post("http://localhost:3000/auth/signup", {
      email: "jello@yop.com",
      password: "123456",
    });

    Cookies.set("session", authData.headers["session"]);

    console.log("Success: on in Finish");
    console.log(authData);
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

      <Button onClick={getCats}> Get Cats</Button>
    </div>
  );
}

export default SignUp;

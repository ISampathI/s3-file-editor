import React from "react";
import "./styles.scss";
import { Button, Checkbox, Form, Input } from "antd";
import { AuthService } from "../../services/auth";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    await AuthService.login(values.username, values.password).then((res) => {
      if (!!res) {
        navigate("/");
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="LoginPage">
      <div className="login-container">
        <div className="title">
          <span>Lo</span>gin
        </div>
        <Form
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <p className="form-label">User Name</p>
          <Form.Item
            className="login-form-item"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input/>
          </Form.Item>

          <p className="form-label">User Name</p>
          <Form.Item
            className="login-form-item"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="login-form-submit">
            <Button
              className="login-form-submit-btn"
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

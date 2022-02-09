import { userRegister } from '@/services/auth/email-auth';
import { debug } from '@/utils/log';
import { Button, Checkbox, Form, Input } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React from 'react';
import { SelectLang } from 'umi';
import styles from '../style.less';

const Register: React.FC = () => {

  const onFinish = async (registerParams: API.RegisterParams) => {
    debug(`Success: ${registerParams.email}`);
    const result = await userRegister(registerParams);
    if(typeof result !== 'string' ) {
      debug(`Register Complete for new User ${JSON.stringify(result)}`);
    } else {
      debug(`Register Failed due to Error '${result}'`);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    debug(`Failed: ${errorInfo}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <span className={styles.registerTitle}>Register</span>
      <div className={styles.content}>
        <div className={styles.registerForm}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Repeat Password"
              name="confirmPassword"
              rules={[{ required: true, message: 'Please input your again password!' }]}>
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
      <Footer />
    </div>
  );
};

export default Register;

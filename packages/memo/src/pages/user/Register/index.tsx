import { userRegister } from '@/services/auth/email-auth';
import { debug } from '@/utils/log';
import { UserCredential } from '@firebase/auth';
import { Button, Form, Input, message } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import { history, SelectLang, useModel } from 'umi';
import styles from '../style.less';
import '../styles.css';

const Register: React.FC = () => {

  const { initialState, setInitialState } = useModel('@@initialState');
  const [ submit, setSubmit ] = useState<boolean>(false);

  const fetchFirebaseUserInfo = async (userCredential: UserCredential) => {
    const userInfo = initialState?.fetchFirebaseUserInfo?.(userCredential);
    if (userInfo) {
      debug(`Firebase User Info ${JSON.stringify(userInfo)}`);
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const onFinish = async (registerParams: API.RegisterParams) => {
    setSubmit(true);
    debug(`Success: ${registerParams.email}`);
    const result = await userRegister(registerParams);
    if (typeof result !== 'string') {
      debug(`Register Complete for new User ${JSON.stringify(result)}`);
      await fetchFirebaseUserInfo(result);
      if (!history) return;
      const { query } = history.location;
      const { redirect } = query as { redirect: string };
      history.push(redirect || '/');
      setSubmit(false);
      message.success(`Register Complete for new User`);
      return;
    } else {
      debug(`Register Failed due to Error '${result}'`);
      message.error(`Register Failed due to Error '${result}'`);
      setSubmit(false);
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
        <div className='registerForm'>
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
              <Button type="primary" htmlType="submit" loading={submit}>
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

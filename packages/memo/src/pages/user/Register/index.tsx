import { userRegister } from '@/services/auth/email-auth';
import { debug } from '@/utils/log';
import { UserCredential } from '@firebase/auth';
import { Button, Form, Input } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React from 'react';
import { history, SelectLang, useModel } from 'umi';
import styles from '../style.less';

const Register: React.FC = () => {

  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchFirebaseUserInfo = async (userCredential: UserCredential) => {
    const userInfo = initialState?.fetchFirebaseUserInfo?.(userCredential);
    if (userInfo) {
      debug(`Firebase User Info ${JSON.stringify(userInfo)}`);
      await setInitialState((s: any) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };
  
  const onFinish = async (registerParams: API.RegisterParams) => {
    debug(`Success: ${registerParams.email}`);
    const userCredential = await userRegister(registerParams);
    if(typeof userCredential !== 'string' ) {
      debug(`Register Complete for new User ${JSON.stringify(userCredential)}`);
      await fetchFirebaseUserInfo(userCredential);
      if (!history) return;
      const { query } = history.location;
      const { redirect } = query as { redirect: string };
      history.push(redirect || '/');
      return;
    } else {
      debug(`Register Failed due to Error '${userCredential}'`);
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
      <span className={styles.registerTitle}>Register XXX</span>
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

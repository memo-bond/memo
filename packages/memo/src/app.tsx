import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading, SettingDrawer } from '@ant-design/pro-layout';
import { Auth, User, UserCredential } from '@firebase/auth';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { auth } from './services/auth/google-auth';
import { debug } from './utils/log';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  fetchFirebaseUserInfo?: (userCredential: UserCredential) => API.CurrentUser | undefined;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const fetchFirebaseUserInfo = (userCredential: UserCredential): API.CurrentUser | undefined => {
    try {
      // log(`User Credential full info: ${JSON.stringify(userCredential)}`);
      if (userCredential) {
        const { user } = userCredential;
        return {
          name: user.displayName,
          email: user.email,
          userid: user.uid,
          avatar: user.photoURL,
          access: 'admin',
        } as API.CurrentUser;
      }
      return undefined;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const fetchFirebaseUserInfoLocal = (): API.CurrentUser | undefined => {
    try {
      let currentUser;
      auth.onAuthStateChanged((user) => {
        if (user) {
          debug(`222User full info: ${JSON.stringify(user)}`);
          // User is signed in.
          currentUser = {
            name: user.displayName,
            email: user.email,
            userid: user.uid,
            avatar: user.photoURL,
            access: 'admin',
          } as API.CurrentUser;
        } else {
          debug(`333User full info: ${JSON.stringify(user)}`);
          // No user is signed in.
        }
      });
      return currentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const getCurrentFirebaseUser = (auth: Auth): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  }

  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    try {
      let currentUser: API.CurrentUser | undefined;
      const user = await getCurrentFirebaseUser(auth);
      if (user) {
        currentUser = {
          name: user.displayName,
          email: user.email,
          userid: user.uid,
          avatar: user.photoURL,
          access: 'admin',
        } as API.CurrentUser;
        debug(`Current Firebase User Refreshed Page: ${JSON.stringify(currentUser)}`);
      } else {
        currentUser = await fetchUserInfo();
      }
      return {
        fetchUserInfo,
        fetchFirebaseUserInfo,
        currentUser,
        settings: defaultSettings,
      };
    } catch (err: any) {
      debug(`Error ${err.message}`);
    }
  }
  return {
    fetchUserInfo,
    fetchFirebaseUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined />
          <span>OpenAPI 文档</span>
        </Link>,
        <Link to="/~docs" key="docs">
          <BookOutlined />
          <span>业务组件文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

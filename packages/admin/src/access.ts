import { debug } from "./utils/log";

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  debug(`!!! Current User From Access: ${JSON.stringify(currentUser)}`);
  debug(`!!! canAdmin: ${JSON.stringify(currentUser?.access)}`);
  
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}

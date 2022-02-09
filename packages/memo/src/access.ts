/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  console.log(`!!! Current User From Access: ${JSON.stringify(currentUser)}`);
  console.log(`!!! canAdmin: ${JSON.stringify(currentUser?.access)}`);
  
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}

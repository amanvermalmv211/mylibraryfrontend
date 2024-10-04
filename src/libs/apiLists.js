// export const server = "https://mylibrary-kw5s.onrender.com";
export const server = "http://localhost:5000";

const apiList = {
  login: `${server}/user/userauth/loginuser`,
  usersignup: `${server}/user/userauth/createuser`,
  verifyotp: `${server}/user/userauth/verifyotp`,
  sendotp: `${server}/auth/sendotp`,
  getebooks: `${server}/user/getebooks`,
  addebooks: `${server}/editor/addebooks`,
  deleteebooks: `${server}/editor/deleteebooks`,
  updateebooks: `${server}/editor/updateebooks`,
  getresults: `${server}/user/getresults`,
  addapp: `${server}/editor/addapp`,
  geteditor: `${server}/editor/profile`,
  deleteapp: `${server}/editor/deleteapp`,
  updateapp: `${server}/editor/updateapp`,
  getadmin: `${server}/superadmin/getadmin`,
};

export default apiList;
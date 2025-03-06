// export const server = "https://mylibrary-kw5s.onrender.com";
export const server = "http://localhost:8000";
// export const server = "https://merilibrary.in";

const apiList = {
  login: `${server}/user/userauth/loginuser`,
  forgotpassword: `${server}/user/userauth/forgotpassword`,
  resetpassword: `${server}/user/userauth/resetpassword`,
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
  adminupdatelibrary: `${server}/superadmin/updatelibrary`,
  initeditor: `${server}/superadmin/initeditor`,
  getlibrequests: `${server}/superadmin/getrequest/library`,
  getedtrequests: `${server}/superadmin/getrequest/editors`,
  getalllibrary: `${server}/superadmin/getalllibrary`,

  getlibowner: `${server}/libowner/getlibowner`,
  joinrequest: `${server}/libowner/joinrequest`,
  rejectrequest: `${server}/libowner/rejectrequest`,
  updatelibandprofile: `${server}/libowner/updateprofile`,
  approverequest: `${server}/libowner/approve-request`,

  getstudent: `${server}/student/getstudent`,
  updateStdProfile: `${server}/student/updateprofile`,
  requestLibrarySeat: `${server}/student/request-library`,
  getLibraryAgain: `${server}/student/getlibrary`,
  getrequest: `${server}/student/getrequest`,
  deleterequest: `${server}/student/deleterequest`,

  savecontactdetails: `${server}/user/save/contactdetails`,
  searchlib: `${server}/user/searchlib`,
};

export default apiList;
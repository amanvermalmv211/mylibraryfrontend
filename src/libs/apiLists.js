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
  adminupdatelibrary: `${server}/superadmin/updatelibrary`,
  gerequests: `${server}/superadmin/getrequest/library`,
  getalllibrary: `${server}/superadmin/getalllibrary`,

  getlibowner: `${server}/libowner/getlibowner`,
  joinrequest: `${server}/libowner/joinrequest`,
  rejectrequest: `${server}/libowner/rejectrequest`,
  updatelibandprofile: `${server}/libowner/updateprofile`,
  approverequest: `${server}/libowner/approve-request`,

  getstudent: `${server}/student/getstudent`,
  updateStdProfile: `${server}/student/updateprofile`,
  requestLibrarySeat: `${server}/student/request-library`,
  getrequest: `${server}/student/getrequest`,

  savecontactdetails: `${server}/user/save/contactdetails`,
  searchlib: `${server}/user/searchlib`,
};

export default apiList;
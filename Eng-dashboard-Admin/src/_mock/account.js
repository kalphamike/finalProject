// ----------------------------------------------------------------------

const account = {
  displayName: localStorage.getItem("adminName"),
  email: localStorage.getItem("adminEmail"),
  role: localStorage.getItem("userRole"),
  photoURL: '/assets/images/avatars/avatar_default.jpg',
  Userlocation:localStorage.getItem("adminLocation"),
  
};

export default account;

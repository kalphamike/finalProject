// ----------------------------------------------------------------------

const account = {
  displayName: localStorage.getItem("userName"),
  email: localStorage.getItem("userEmail"),
  role: localStorage.getItem("userRole"),
  photoURL: '/assets/images/avatars/avatar_default.jpg',
  Userlocation:localStorage.getItem("userLocation"),
};

export default account;

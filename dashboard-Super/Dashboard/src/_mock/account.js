// ----------------------------------------------------------------------

const account = {
  displayName: localStorage.getItem("supervisorName"),
  email: localStorage.getItem("supervisorEmail"),
  role: localStorage.getItem("supervisorRole"),
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;

// services/session.js
export function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

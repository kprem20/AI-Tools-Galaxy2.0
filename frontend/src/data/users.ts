export const INITIAL_USERS = [
  { email: "admin@galaxy.com", password: "admin", role: "admin" }
];

export const getStoredUsers = () => {
  if (typeof window === 'undefined') return INITIAL_USERS;
  const saved = localStorage.getItem('ai_tools_users');
  return saved ? JSON.parse(saved) : INITIAL_USERS;
};

export const saveUser = (user: any) => {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem('ai_tools_users', JSON.stringify(users));
};

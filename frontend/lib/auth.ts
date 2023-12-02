import { getCookie } from 'cookies-next';

export const useAuth = async () => {
  const token = getCookie('auth-token');

  const response = await fetch('http://localhost:4000/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': `${token}`,
    },
  });

  const data = await response.json();

  return {
    id: data.id,
    email: data.email,
  };
};

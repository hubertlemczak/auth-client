import { useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import { useUser } from './context/userContext';
import client from './utils/client';

export default function App() {
  const { user, setUser, token, setToken } = useUser();

  console.log('token', token, user);

  useEffect(() => {
    if (token) {
      async function getData() {
        const opts = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
        };

        const res = await client.get(`/profile`, opts);
        console.log('res', res);

        setUser(curr => ({ ...curr, profile: res?.data?.user }));
      }
      getData();
    }
  }, []);

  useEffect(() => {
    console.log('token1234', token);
  }, [token]);

  return (
    <div className="app">
      <h2>Register</h2>
      <Form type="register" />
      <h2>Login</h2>
      <Form type="login" />
      {user?.error && <h1>error: {user?.error}</h1>}
      <p>username: {user?.username || user?.profile?.name}</p>
      <p>password hash: {user?.password}</p>
      <p>token: {token}</p>
      <Form type="profile" />
      {user?.profile?.error && <p>error: {user?.profile?.error}</p>}
      <p>profile id: {user?.profile?.id}</p>
      <p>profile name: {user?.profile?.name}</p>
    </div>
  );
}

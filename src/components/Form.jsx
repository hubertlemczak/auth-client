import { useState } from 'react';
import { useUser } from '../context/userContext';
import client from '../utils/client';

const INITIAL_FORM_FIELDS = {
  username: '',
  password: '',
};

const Form = ({ type }) => {
  const [formFields, setFormFields] = useState(INITIAL_FORM_FIELDS);
  const { setUser, token, setToken } = useUser();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormFields(curr => ({ ...curr, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setUser(curr => ({ ...curr, error: undefined, token: undefined }));

    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formFields.username,
        password: formFields.password,
      }),
    };

    const res = await client.post(`/${type}`, opts);

    if (type === 'login') {
      setToken(`Bearer ${res.token}`);
      return handleGetProfile();
    }
    setUser(curr => ({ ...curr, ...res }));
  };

  const handleGetProfile = async () => {
    if (!token) {
      return setUser(curr => ({ ...curr, profile: { error: 'no token' } }));
    }

    const opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    const res = await client.get(`/profile`, opts);
    console.log(res);
    setUser(curr => ({ ...curr, profile: res?.data?.user }));
  };

  if (type === 'profile') {
    return <button onClick={handleGetProfile}>Submit</button>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={handleChange}
        value={formFields.username}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
        value={formFields.password}
      />
      <button>Submit</button>
    </form>
  );
};

export default Form;

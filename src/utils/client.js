const API = 'http://localhost:4000';

const makeFetch = async (path, opts, api = API) => {
  console.log(`${api}${path}`, opts);
  const res = await fetch(`${api}${path}`, opts);
  return await res.json();
};

const client = {
  get: async (path, opts, api) => await makeFetch(path, opts, api),
  post: async (path, opts, api) => await makeFetch(path, opts, api),
};

async function a() {
  const res = await client.get('/profile', {
    method: 'GET',
    headers: {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJuYW1lIjoiSHViZXJ0MjMifSwiaWF0IjoxNjYyNDY2NDkyfQ.MIZ45Ek4aS97mBYH_JkBxVARGX0_zyoIsdeNnlmwSOE',
    },
  });

  console.log(res);
}

async function b() {
  const res = await client.post('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'Hubert23',
      password: 'hubert123',
    }),
  });

  console.log(res);
}

export default client;

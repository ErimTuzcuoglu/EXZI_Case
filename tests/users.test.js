import { request } from './global/jest.setup';

const testUser = {
  name: 'John Doe',
  email: 'js@gmail.com',
  password: '123',
};

const endpoint = '/api/users';

describe('Users API Endpoints', () => {
  test(`POST ${endpoint} - Add New User`, async () => {
    const response = await request.post(`${endpoint}`).send(testUser);
    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe(testUser.name);
    testUser._id = response.body.data._id;
  });

  test(`GET ${endpoint} - Get All Users`, async () => {
    const response = await request.get(`${endpoint}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test(`GET ${endpoint}/:id - Get A User`, async () => {
    const response = await request.get(`${endpoint}/${testUser._id}`);
    expect(response.status).toBe(200);
    expect(response.body.data._id).toBe(testUser._id);
  });

  test(`PUT ${endpoint}/:id - Update A User`, async () => {
    const updatedUser = {
      name: 'John Doe The Updated',
      email: 'js@gmail.com',
      password: '123',
    };

    const response = await request.put(`${endpoint}/${testUser._id}`).send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe(updatedUser.name);
  });

  test(`DELETE ${endpoint}/:id - Delete A User`, async () => {
    const response = await request.delete(`${endpoint}/${testUser._id}`);
    expect(response.status).toBe(200);
  });
});

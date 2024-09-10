import axiosHttp from "./axiosHandler";
interface INUser {
  name: string;
  email: string;
  phone: string;
  id: number;
}

export const createUser = async (user: INUser) => {
  const res = await axiosHttp.post<INUser>("/users", user);
  return res.data;
};

export const fetchAllUsers = async () => {
  const res = await axiosHttp.get<INUser[]>("/users");
  return res.data;
};

export const fetchUserById = async (userId: number) => {
  const res = await axiosHttp.get<INUser>(`/users/${userId}`);
  return res.data;
};

export const deleteUserById = async (userId: number) => {
  const res = await axiosHttp.delete<INUser>(`/users/${userId}`);
  return res.data;
};

export const updateUser = async (user: INUser) => {
  const res = await axiosHttp.put(`/users/${user.id}`, user);
  return res.data;
};

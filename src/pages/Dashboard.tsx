import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, deleteUser, updateUserData } from "../redux/userSlice";

interface INUser {
  name: string;
  email: string;
  phone: string;
  id: number;
}

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    userId: number
  ) => {
    dispatch(deleteUser(userId));
  };

  const handleEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    user: INUser
  ) => {
    const updatedUser = { ...user, name: "raghav", email: "raghav@gmail.com" };
    dispatch(updateUserData(updatedUser));
  };

  return (
    <>
      Welcome to dashboard
      <br />
      <Link to="/login">Login</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user: INUser) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={(e) => handleEdit(e, user)}>Edit</button>
                  <button onClick={(e) => handleDelete(e, user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No Record found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

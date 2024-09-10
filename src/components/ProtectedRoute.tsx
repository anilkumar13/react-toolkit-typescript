import { Navigate, Outlet } from "react-router-dom";
type Role = "admin" | "user";
interface comProp {
  allowedRoles: Role[];
}
interface UserData {
  isAuthenticated: boolean;
  role: Role;
}
const PrivateRoute: React.FC<comProp> = ({ allowedRoles }) => {
  let isAuthenticated = false;
  let role: Role | null = null;
  const userData = localStorage.getItem("userData");
  if (userData) {
    try {
      const parsedData = JSON.parse(userData) as UserData;
      isAuthenticated = parsedData.isAuthenticated;
      role = parsedData.role;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }
  if (isAuthenticated && role && allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to="login" replace />;
  }
};

export default PrivateRoute;

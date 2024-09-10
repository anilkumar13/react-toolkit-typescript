import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    // implement your login logic here
    console.log("Login Clicked");
    dispatch(login('admin'))
    navigate("/dashboard")
  };
  return (
    <>
      Login Page <br />
      <button type="button" onClick={handleClick}>
        Click here to Login
      </button>
      <Link to="/dashboard">Dashboard </Link>
    </>
  );
};
export default Login;

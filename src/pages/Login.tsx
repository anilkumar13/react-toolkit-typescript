import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    // implement your login logic here
    console.log("Login Clicked");
    dispatch(login("admin"));
    navigate("/dashboard");
  };
  return (
    <>
      <div className="login-container">
        <div className="heading">Login</div>
        <div className="form-container">
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="Enter username" />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter password" />
          </div>
          <div className="input-container">
            <button className="primary" type="button" onClick={handleClick}>
              Login
            </button>
          </div>
        </div>
      </div>
      {/* <Link to="/dashboard">Dashboard </Link> */}
    </>
  );
};
export default Login;

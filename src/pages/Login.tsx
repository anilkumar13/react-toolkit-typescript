// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { login } from "../redux/userSlice";
import { useForm, SubmitHandler } from "react-hook-form";
type UserForm = {
  username: string;
  password: string;
};
const Login: React.FC = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>();
  // const handleClick = () => {
  //   // implement your login logic here
  //   console.log("Login Clicked");
  //   dispatch(login("admin"));
  //   navigate("/dashboard");
  // };

  const onSubmit: SubmitHandler<UserForm> = (data) => console.log(data);
  return (
    <>
      <div className="login-container">
        <div className="heading">Login</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-container">
            <div className="input-container">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                {...register("username", {
                  required: "User name is required.",
                })}
                placeholder="Enter username"
              />
              {errors.username && errors.username.type === "required" && (
                <span role="alert">This is required</span>
              )}
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required.",
                })}
              />
              {errors.password && errors.password.type === "required" && (
                <span role="alert">Password is required</span>
              )}
            </div>
            <div className="input-container">
              <button className="primary" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* <Link to="/dashboard">Dashboard </Link> */}
    </>
  );
};
export default Login;

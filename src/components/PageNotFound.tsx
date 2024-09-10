import { Link } from 'react-router-dom';
export const PageNotFound: React.FC = () => {
  return (
    <>
      He this is a wrong page
      <br />
      <Link to="login">Login</Link>
    </>
  );
};

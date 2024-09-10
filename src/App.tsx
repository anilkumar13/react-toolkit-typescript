import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { PageNotFound } from './components/PageNotFound';
import PrivateRoute from './components/ProtectedRoute';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;

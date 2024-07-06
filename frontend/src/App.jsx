import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login/Login.jsx'
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import Signup from './components/Signup/Signup.jsx'
import HomePage from './components/Home/Home.jsx';
import { Provider } from 'react-redux';
import ProfileDetails from './components/Profile/Profile.jsx'
import store from './store.js'
import {useNavigate} from 'react-router-dom' 
import { verifyUser,verifyAdmin } from './assets/Scripts/Verification.js'
import AdminLogin from './components/Admin/Login.jsx'
import AdminHome from './components/Admin/AdminHome.jsx'
import CreateUser from './components/Admin/createUser.jsx'
function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  function Routing() {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await verifyUser();
          setUser(response);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);
    if (loading) {
      return null;
    }

    const path = window.location.pathname;
    if (path === '/login') {
      return !user ? <Login /> : <Navigate to='/' />;
    }
    if (path === '/register') {
      return !user ? <Signup /> : <Navigate to='/' />;
    }
    if (path === '/') {
      return user ? <HomePage /> : <Navigate to='/login' />;
    }
    if (path === '/profile') {
      return user ? <ProfileDetails /> : <Navigate to='/login' />;
    }
  }



  function AdminRouting() {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await verifyAdmin();
          setAdmin(response);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false)
        }
      };

      fetchData();
    }, []);
    if (loading) {
      return null
    }

    const path = window.location.pathname;
    if (path === '/admin') {
      return admin ? <AdminHome /> : <Navigate to='/admin/login' />;
    }
    if (path === '/admin/login') {
      return !admin ? <AdminLogin /> : <Navigate to='/admin' />;
    }
    if(path === '/admin/createUser'){
      return admin ? <CreateUser /> : <Navigate to='/admin/login' />;
    }
  }



  function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
      localStorage.removeItem('payload')
      setUser(false)
      navigate('/login');
    }, [])
  }

  return (
    <>
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/login' element={<Routing/>} />
        <Route path='/register' element={<Routing/>} />
        <Route path='/' element={<Routing/>} />
        <Route path='/profile' element={<Routing/>} />
        <Route path='/logout' element={<Logout />} />
        <Route path="/admin/login" element={<AdminRouting />} />
          <Route path='/admin' element={<AdminRouting />} />
          <Route path='/admin/createUser' element={<AdminRouting />} />
      </Routes>
    </Router>
    </Provider>
   
      
    </>
  )
}

export default App

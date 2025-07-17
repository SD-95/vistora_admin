import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loader from '../components/loader';

// Lazy-loaded Components
const Adminlayout = lazy(() => import('../layout/Adminlayout'));
const Landinglayout = lazy(() => import('../layout/Landinglayout'));

const Welcome = lazy(() => import('../pages/Welcome'));
const Login = lazy(() => import('../pages/Login'));
const Unauthorized = lazy(() => import('../pages/Unauthorized'));

const Superadmin = lazy(() => import('../pages/dashboard/Superadmin'));
const Serviceexecutive = lazy(() => import('../pages/dashboard/Serviceexecutive'));

const Settings = lazy(() => import('../pages/settings/Settings'));
const Profile = lazy(() => import('../pages/Profile'));
const Mailpage = lazy(() => import('../pages/Mailpage'));
const Servicechat = lazy(() => import('../pages/Servicechat'));

const Supportdashboard = lazy(() => import('../pages/support/Supportdashboard'));
const Ticketdescription = lazy(() => import('../pages/support/Ticketdescription'));

const Productview = lazy(() => import('../pages/products/Productview'));
const Productlist = lazy(() => import('../pages/products/Productlist'));

const Orderslist = lazy(() => import('../pages/orders/Orderslist'));
const Orderdetails = lazy(() => import('../pages/orders/Orderdetails'));
const Invoicepage = lazy(() => import('../pages/orders/Invoicepage'));

const Alluserlist = lazy(() => import('../pages/team/Alluserlist'));
const Rolepermission = lazy(() => import('../pages/team/Rolepermission'));

const PrivateRoute = lazy(() => import('../utils/Validators'));

const Approutes = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false); // default: false

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600); // show blur for 600ms
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}

      <Suspense fallback={<Loader />}>
        <Routes location={location}>
          {/* Landing Routes */}
          <Route element={<Landinglayout />}>
            <Route index element={<Welcome />} />
            <Route path="/pages/Welcome" element={<Welcome />} />
            <Route path="/pages/Login" element={<Login />} />
            <Route path="*" element={<Unauthorized />} />
          </Route>

          {/* Admin Layout */}
          <Route element={<Adminlayout />}>
            <Route path="/pages/dashboard/superadmin" element={<PrivateRoute role={['superadmin', 'admin', 'team']}><Superadmin /></PrivateRoute>} />
            <Route path="/pages/dashboard/serviceexecutive" element={<PrivateRoute role="serviceexecutive"><Serviceexecutive /></PrivateRoute>} />

            <Route path="/pages/Settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="/pages/Profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/pages/Mailpage" element={<PrivateRoute><Mailpage /></PrivateRoute>} />
            <Route path="/pages/Servicechat" element={<PrivateRoute><Servicechat /></PrivateRoute>} />

            <Route path="/pages/support/Supportdashboard" element={<PrivateRoute><Supportdashboard /></PrivateRoute>} />
            <Route path="/pages/support/Ticketdescription" element={<PrivateRoute><Ticketdescription /></PrivateRoute>} />

            <Route path="/pages/products/Productview/:id" element={<PrivateRoute><Productview /></PrivateRoute>} />
            <Route path="/pages/products/Productlist" element={<PrivateRoute><Productlist /></PrivateRoute>} />

            <Route path="/pages/orders/Orderslist" element={<PrivateRoute><Orderslist /></PrivateRoute>} />
            <Route path="/pages/orders/Orderdetails" element={<PrivateRoute><Orderdetails /></PrivateRoute>} />
            <Route path="/pages/orders/Invoicepage" element={<PrivateRoute><Invoicepage /></PrivateRoute>} />

            <Route path="/pages/team/Alluserlist" element={<PrivateRoute><Alluserlist /></PrivateRoute>} />
            <Route path="/pages/team/Rolepermission" element={<PrivateRoute><Rolepermission /></PrivateRoute>} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default Approutes;

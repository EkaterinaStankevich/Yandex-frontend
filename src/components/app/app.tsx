import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getUser } from '../../services/features/auth';

function FeedOrderModal() {
  const navigate = useNavigate();
  const { number: feedNumber } = useParams();

  return (
    <Modal title={`#${feedNumber}`} onClose={() => navigate(-1)}>
      <OrderInfo />
    </Modal>
  );
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) dispatch(getUser());
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const navigateBack = () => navigate(-1);

  return (
    <div className={styles.app}>
      {location.state?.background && (
        <Routes>
          <Route path='/feed/:number' element={<FeedOrderModal />} />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингридиента' onClose={navigateBack}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <FeedOrderModal />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}

      <Routes location={location.state?.background || location}>
        <Route
          path='/'
          element={
            <>
              <AppHeader />
              <Outlet />
            </>
          }
        >
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute onlyOnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyOnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyOnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute onlyOnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path='/*' element={<NotFound404 />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;

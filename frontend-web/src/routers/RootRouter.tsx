import CertificationDetailPage from '@pages/CertificationDetailPage';
import CertificationPage from '@pages/CertificationPage';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import NotFound from '@pages/NotFound';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoutes from './PrivateRouter';
import LoginCallBackPage from '@pages/LoginCallBackPage';
import BasicSimulationPage from '@pages/BasicSimulationPage';
import RealSimulationPage from '@pages/RealSimulationPage';

const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Navigate to='/home' replace={true} />}
        ></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route
          path='/login/oauth/naver/callback'
          element={<LoginCallBackPage />}
        ></Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/home' element={<HomePage />}></Route>
          <Route
            path='/basic-simulation'
            element={<BasicSimulationPage />}
          ></Route>
          <Route
            path='/real-simulation'
            element={<RealSimulationPage />}
          ></Route>
          <Route path='/certification' element={<CertificationPage />}></Route>
          <Route path='/certification-detail'>
            <Route index element={<NotFound />}></Route>
            <Route
              path=':cert_id'
              element={<CertificationDetailPage />}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;

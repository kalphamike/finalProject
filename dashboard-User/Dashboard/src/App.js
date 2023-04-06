// routes
// import Router from './routes';
// theme
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import DashboardAppPage from './pages/DashboardAppPage';
import AuthenticationPage from './pages/AuthenticationPage';

import UserPage from './pages/UserPage';
import ProductsPage from './pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import DashboardLayout from './layouts/dashboard';
import CasesPage from './pages/CasesPage';
import NewCase from './pages/NewCase';
import Victims from './pages/Victims';
import Suspect from './pages/Suspect';
import Mumuryango from './pages/Mumuyango';
import { LoginForm, ResetPasswordForm, SignupForm } from './sections/auth';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Routes>
        {localStorage.getItem('userToken') && 
          <Route path='/' exact element={<Navigate replace to='/dashboard/app' />} />
        }
        {
          localStorage.getItem('userToken') &&
            <Route path='/dashboard' element={<DashboardLayout/>}>
              <Route path='' element={<DashboardAppPage/>} />
              <Route path='app' element={<DashboardAppPage/>} />
              <Route path='user' element={<UserPage />} />
              <Route path='Reg' element={<ProductsPage />} />
              <Route path='cases' element={<CasesPage />} />
              <Route path='RecordCase' element={<BlogPage />} />
              <Route path='newcase' element={<NewCase />} />  
              <Route path='Victims' element={<Victims />} />   
              <Route path='Suspect' element={<Suspect />} />  
              <Route path='Mumuryango' element={<Mumuryango />} />
              <Route path='blog' element={<BlogPage />} />

            </Route>
        }          
        <Route path='/dashboard' exact element={<Navigate replace to='/auth/signin' />}/>
        <Route path='/dashboard/app' exact element={<Navigate replace to='/auth/signin' />}/>
        <Route path='/dashboard/user' exact element={<Navigate replace to='/auth/signin' />}/>
        <Route path='/dashboard/Reg' exact element={<Navigate replace to='/auth/signin' />}/>
        <Route path='/dashboard/cases' exact element={<Navigate replace to='/auth/signin' />}/>
        <Route path='/dashboard/RecordCase' exact element={<Navigate replace to='/auth/signin' />}/>
        <Route path='/dashboard/newcase' exact element={<Navigate replace to='/auth/signin' />}/>
        <Route path='/dashboard/Victims' exact element={<Navigate replace to='/auth/signin' />}/>
        <Route path='/dashboard/Suspect' exact element={<Navigate replace to='/auth/signin' />}/>
        <Route path='/dashboard/Mumuryango' exact element={<Navigate replace to='/auth/signin' />}/>
        <Route path='/dashboard/blog' exact element={<Navigate replace to='/auth/signin' />}/>
        <Route path='/auth' element={<AuthenticationPage />}>
          <Route path='' element={<LoginForm />} />
          <Route path='signin' element={<LoginForm />} />
          <Route path='signup' element={<SignupForm />} />
          <Route path='resetPassword/:token/:userId' element={<ResetPasswordForm />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

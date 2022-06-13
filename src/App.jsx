import { Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import HeaderUser from './components/HeaderUser/HeaderUser';
import HomeScreen from './screens/user/HomeScreen/HomeScreen';
import UserServiceScreen from './screens/user/UserServiceScreen/UserServiceScreen';
import LoginScreen from './screens/user/LoginScreen/LoginScreen';
import RegisterScreen from './screens/user/RegisterScreen/RegisterScreen';
import FooterUser from './components/FooterUser/FooterUser';
import ViewLawyerScreen from './screens/user/ViewLawyer/ViewLawyerScreen';
import Search from './screens/user/Search/Search';
import LoginAdminScreen from './screens/admin/LoginAdminScreen/LoginAdminScreen';
import HomeAdminScreen from './screens/admin/HomeAdminScreen/HomeAdminScreen';
import SideBar from './components/SideBarAdmin/SideBar';
import LawyerManagementScreen from './screens/admin/LawyerManagementScreen/LawyerManagementScreen';
import AccountManagementScreen from './screens/admin/AccountManagementScreen/AccountManagementScreen';
import LoginLawyer from './screens/lawyer/LoginLawyerScreen/LoginLawyer';
import RegisterLawyer from './screens/lawyer/RegisterLawyerScreen/RegisterLawyer';

function App() {
  return (
    <div className="App">
      <Suspense fallback="">
        <BrowserRouter>
          <Routes>
            <Route path="/admin">
              <Route path="login" element={<LoginAdminScreen/>}/>
              <Route path="home" element={
              <>
                <SideBar/>
                <HomeAdminScreen/>
              </>
              }/>
              <Route path="lawyer" element={
              <>
                <SideBar/>
                <LawyerManagementScreen />
              </>
              }/>
              <Route path="account" element={
              <>
                <SideBar/>
                <AccountManagementScreen />
              </>
              }/>
              <Route index element={<Navigate to={'home'}/>}/>
            </Route>
            <Route path="/lawyer">
              <Route path="login" element={<LoginLawyer/>}/>
              <Route path="register" element={<RegisterLawyer/>}/>           
            </Route>
            <Route path="/">
              <Route index element={
              <>
                <HeaderUser/>
                <HomeScreen/>
                <FooterUser/>
              </>
              } />
              <Route path="user-service" element={
              <>
                <HeaderUser/>
                <UserServiceScreen />
                <FooterUser/>
              </>
              } />
              <Route path="login" element={
              <>
                <HeaderUser/>
                <LoginScreen />
                {/* <FooterUser/> */}
              </>
              }/>
              <Route path="register" element={
              <>
                <HeaderUser/>
                <RegisterScreen />
                {/* <FooterUser/> */}
              </>
              }/>
              <Route path="lawyer/:id" element={
              <>
                <HeaderUser/>
                <ViewLawyerScreen />
                {/* <FooterUser/> */}
              </>
              }/>
              <Route path="/home/search" element={
              <>
                <HeaderUser/>
                <Search />
                {/* <FooterUser/> */}
              </>
              }/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;

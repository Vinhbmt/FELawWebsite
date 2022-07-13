import { Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import HeaderUser from './components/HeaderUser/HeaderUser';
import HomeScreen from './screens/user/HomeScreen/HomeScreen';
import UserServiceScreen from './screens/user/UserServiceScreen/UserServiceScreen';
import LoginScreen from './screens/user/LoginScreen/LoginScreen';
import RegisterScreen from './screens/user/RegisterScreen/RegisterScreen';
import FooterUser from './components/FooterUser/FooterUser';
import Search from './screens/user/Search/Search';
import LoginAdminScreen from './screens/admin/LoginAdminScreen/LoginAdminScreen';
import HomeAdminScreen from './screens/admin/HomeAdminScreen/HomeAdminScreen';
import SideBar from './components/SideBarAdmin/SideBar';
import LawyerManagementScreen from './screens/admin/LawyerManagementScreen/LawyerManagementScreen';
import AccountManagementScreen from './screens/admin/AccountManagementScreen/AccountManagementScreen';
import LoginLawyer from './screens/lawyer/LoginLawyerScreen/LoginLawyer';
import RegisterLawyer from './screens/lawyer/RegisterLawyerScreen/RegisterLawyer';
import HomeLawyerScreen from './screens/lawyer/HomeLawyerScreen/HomeLawyerScreen';
import SideBarLawyer from './components/SideBarLawyer/SideBarLawyer';
import UpdateLawyerScreen from './screens/lawyer/UpdateLawyerScreen/UpdateLawyerScreen';
import ViewLawyerScreen from './screens/user/ViewLawyer/ViewLawyerScreen';
import AppointmentScreen from './screens/lawyer/AppointmentScreen/AppointmentScreen';
import ProfileScreen from './screens/user/ProfileScreen/ProfileScreen';
import FilterLawyer from './screens/user/FilterLawyer/FilterLawyerScreen';
import MessageLawyerScreen from './screens/lawyer/MessageScreen/MessageScreen';
import MessageUserScreen from './screens/user/MessageUserScreen/MessageUserScreen';
import { socket, SocketContext } from './core/config/socket.config';
const io = require('socket.io-client');




function App() {

  // const [socket, setSocket] = useState(null)
  // useEffect(() => {
  //   setSocket(io.connect('localhost:4001', {
  //     query: {
  //       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmMzMTcwMWZlYTc3NzQxZWU0ZWM5YTIiLCJpYXQiOjE2NTY5NTUxMzgsImV4cCI6MTY1Njk1ODczOH0.OMFb9YCaGOwbwTj-KrPMhQ84Gt0LVjIoGnZHyXw9K0E'
  //     }
  //   }));
  // }, [socket])
  

  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
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
                <Route path="home" element={
                <>
                  <SideBarLawyer/>
                  <HomeLawyerScreen />
                </>
                } />
                <Route path="update_lawyer_info" element={
                <>
                  <SideBarLawyer/>
                  <UpdateLawyerScreen />
                </>
                }/>
                <Route path="appointment" element={
                <>
                  <SideBarLawyer/>
                  <AppointmentScreen />
                </>
                } />
                <Route path="message" element={
                <>
                  <SideBarLawyer/>
                  <MessageLawyerScreen />
                </>
                } />
                <Route path="login" element={<LoginLawyer/>}/>
                <Route path="register" element={<RegisterLawyer/>}/> 
                <Route index element={<Navigate to={'home'}/>}/>          
              </Route>
              <Route path="/">
                <Route index element={
                <>
                  <HeaderUser/>
                  <HomeScreen />
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
                <Route path="/home/search" element={
                <>
                  <HeaderUser/>
                  <Search />
                  {/* <FooterUser/> */}
                </>
                }/>
                <Route path="lawyer/:lawyerId" element={
                <>
                  <HeaderUser/>
                  <ViewLawyerScreen />
                  <FooterUser/>
                </>
                }/>
                <Route path="find" element={
                <>
                  <HeaderUser/>
                  <FilterLawyer />
                  <FooterUser/>
                </>
                }/>
                <Route path="profile" element={
                <>
                  <HeaderUser/>
                  <ProfileScreen />
                  <FooterUser/>
                </>
                }/>
                <Route path="message/:lawyerId" element={
                <>
                  <HeaderUser/>
                  <MessageUserScreen />
                  {/* <FooterUser/> */}
                </>
                }/>
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </SocketContext.Provider>
    </div>
  );
}

export default App;

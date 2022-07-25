import { Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Cookies from 'js-cookie';
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
import MeetingUserScreen from './screens/user/MeetingUserScreen/MeetingUserScreen';
import ViewMeetingUser from './screens/user/ViewMeeting/ViewMeeting';
import ViewAppointment from './screens/lawyer/ViewAppointment/ViewAppointment';
import ChangePasswordUser from './screens/user/ChangePasswordUser/ChangePasswordUser';
import ChangePasswordLawyer from './screens/lawyer/ChangePasswordLawyer/ChangePasswordLawyer';
import UpdateInfoUser from './screens/user/UpdateInfoUser/UpdateInfoUser';
import MessengerUserScreen from './screens/user/MessengerUserScreen/MessengerUserScreen';
import MessengerLawyerScreen from './screens/lawyer/MessengerLawyerScreen/MessengerLawyerScreen';
import { firstSocket, SocketContext } from './core/config/socket.config';
import VideoCallScreen from './screens/videoCall/VideoCallScreen';
import Peer from 'simple-peer';
import { useRef } from 'react';
const io = require('socket.io-client');




function App() {

  const [socket, setSocket] = useState(firstSocket);
  


  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        console.log(currentStream);
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      console.log(callerName);
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (receiverId, senderId) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      console.log(data);
      socket.emit('callUser', { userToCall: receiverId, signalData: data, from: senderId, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  const value = { 
    socket, 
    setSocket, 
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    callUser,
    leaveCall,
    answerCall, 
  };
  
  

  return (
    <div className="App">
      <SocketContext.Provider value={value}>
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
                <Route path="message/:userId" element={
                <>
                  <SideBarLawyer/>
                  <MessageLawyerScreen />
                </>
                } />
                <Route path="messenger" element={
                <>
                  <SideBarLawyer/>
                  <MessengerLawyerScreen />
                </>
                } />
                <Route path="appointment/:meetingId" element={
                <>
                  <SideBarLawyer/>
                  <ViewAppointment />
                </>
                } />
                {/* <Route path="videocall/:meetingId" element={
                <>
                  <SideBarLawyer/>
                  <VideoCallScreen />
                </>
                } /> */}
                <Route path="login" element={<LoginLawyer/>}/>
                <Route path="register" element={<RegisterLawyer/>}/> 
                <Route path="change_password" element={<ChangePasswordLawyer/>}/>
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
                <Route path="change-password" element={
                <>
                  <HeaderUser/>
                  <ChangePasswordUser />
                  {/* <FooterUser/>  */}
                </>
                }/>
                <Route path="update_info" element={
                <>
                  <HeaderUser/>
                  <UpdateInfoUser />
                  <FooterUser/>
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
                <Route path="major/:majorId" element={
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
                <Route path="messages/:lawyerId" element={
                <>
                  <HeaderUser/>
                  <MessageUserScreen />
                  {/* <FooterUser/> */}
                </>
                }/>
                <Route path="messenger" element={
                <>
                  <HeaderUser/>
                  <MessengerUserScreen />
                  {/* <FooterUser/> */}
                </>
                }/>
                <Route path="meeting" element={
                <>
                  <HeaderUser/>
                  <MeetingUserScreen />
                  <FooterUser/> 
                </>
                }/>
                <Route path="meeting/:meetingId" element={
                <>
                  <HeaderUser/>
                  <ViewMeetingUser />
                  <FooterUser/>
                </>
                }/>
                <Route path="videocall/:meetingId" element={
                <>
                  <VideoCallScreen />
                </>
                } />
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </SocketContext.Provider>
    </div>
  );
}

export default App;

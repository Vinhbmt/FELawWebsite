import React from "react";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    appBar: {
      borderRadius: 15,
      margin: '30px 100px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '600px',
      border: '2px solid black',
  
      [theme.breakpoints.down('xs')]: {
        width: '90%',
      },
    },
    image: {
      marginLeft: '15px',
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
  }));


  const VideoCallScreen = () => {
      const params = useParams();
      const classes = useStyles();
      const [stream, setStream] = useState();
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
    
        // socket.on('me', (id) => setMe(id));
    
        // socket.on('callUser', ({ from, name: callerName, signal }) => {
        //   console.log(callerName);
        //   setCall({ isReceivingCall: true, from, name: callerName, signal });
        // });
      }, []);

    return (
        <>
        <div className={classes.wrapper}>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography variant="h2" align="center">Video Chat</Typography>
            </AppBar>
            <VideoPlayer />
            {/* <Sidebar>
                <Notifications />
            </Sidebar> */}
        </div>
        <div>
            <button>quay laij</button>
        </div>
        </>
    )
  }

  export default VideoCallScreen
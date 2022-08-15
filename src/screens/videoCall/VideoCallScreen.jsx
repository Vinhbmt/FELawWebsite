import React from "react";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import NotificationVideoCall from "../../components/NotificationVideocall/NotificationVideocall";
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
    

    return (
        <>
        <div className={classes.wrapper}>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography variant="h2" align="center">Video Chat</Typography>
            </AppBar>
            <VideoPlayer />
            {/* <NotificationVideoCall /> */}
        </div>
        {/* <div>
            <button>quay laij</button>
        </div> */}
        </>
    )
  }

  export default VideoCallScreen
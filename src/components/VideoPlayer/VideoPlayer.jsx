import React from "react";
import { Button, Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../../core/config/socket.config";
import { useParams, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

const VideoPlayer = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    socket,
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    setStream,
    call,
    setCall,
    leaveCall
  } = useContext(SocketContext);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((currentStream) => {
        console.log(currentStream)
        setStream(currentStream);

      myVideo.current.srcObject = currentStream;
      });
  }, [window.location]);



  // socket.on("callUser", ({ from, name: callerName, signal, meetingId }) => {
  //   console.log("call user");
  //   setCall({
  //     isReceivingCall: true,
  //     from,
  //     name: callerName,
  //     signal,
  //     meetingId,
  //   });
  // });
  // console.log(window.location.href);
  // console.log(call);
  return (
    <>
      <Grid container className={classes.gridContainer}>
        {stream && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {name || "Name"}
              </Typography>
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className={classes.video}
              />
            </Grid>
          </Paper>
        )}
        {callAccepted && !callEnded && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {call.name || "Name"}
              </Typography>
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className={classes.video}
              />
            </Grid>         
          </Paper>
        )}
      </Grid>
      {callAccepted && !callEnded &&
        <Button onClick={leaveCall}>Kết thúc</Button>
      }
      <Button onClick={() => navigate(-1)}>Quay lại</Button>
    </>
  );
};

export default VideoPlayer;

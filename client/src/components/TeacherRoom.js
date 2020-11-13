import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Peer from "peerjs";

import "../css/Room.css";

const ENDPOINT = "http://127.0.0.1:8000";

// var peer = new Peer(10, {
//   host: "localhost",
//   port: "3001",
//   path: "/myapp",
// });

const peer = new Peer();

// {
//   config: {
//     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     sdpSemantics: "unified-plan",
//   },
/* Sample servers, please use appropriate ones */
//}

const conn = peer.connect();
conn.on("open", () => {
  conn.send("hi!");
  console.log("peer connected");
});

const TeacherRoom = (props) => {
  const [myPeer, setPeer] = useState(null);
  const [myPeerID, setMyPeerID] = useState(null);
  const roomID = props.match.params.roomID;
  var myVideoStream;

  const cleanUp = () => {
    if (myPeer) {
      myPeer.disconnect();
      myPeer.destroy();
    }
    setPeer(null);
    setMyPeerID(null);
  };

  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        // Will print 'hi!'
        console.log(data);
      });
      conn.on("open", () => {
        conn.send("hello!");
        console.log("peer connected");
      });
    });

    peer.on("open", (id = 10) => {
      console.log("joining");

      setPeer(peer);
      setMyPeerID(peer.id);
      socket.emit("join-room", roomID, id);
    });

    var constraints = { audio: true, video: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        var video = document.createElement("video");

        myVideoStream = stream;
        addVideoStream(video, stream);

        peer.on("call", (call) => {
          console.log("receiving call from " + call.peer);
          call.answer(stream);

          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });
        socket.on("user-connected", (userId) => {
          connectToNewUser(userId, stream);
        });
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });

    peer.on("disconnected", () => {
      console.log("Peer disconnected");
      cleanUp();
    });

    peer.on("close", () => {
      console.log("Peer closed remotetly");
      cleanUp();
    });

    peer.on("error", (error) => {
      console.log("peer error", error);
      cleanUp();
    });

    return () => {
      cleanUp();
    };
  }, []);

  const connectToNewUser = (userID, stream) => {
    const call = peer.call(userID, stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
  };

  const addVideoStream = (video, mediaStream) => {
    video.srcObject = mediaStream;

    video.onloadedmetadata = function (e) {
      video.play();
    };

    document.getElementById("video-grid").append(video);
  };

  const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myVideoStream.getAudioTracks()[0].enabled = false;
      setUnmuteButton();
    } else {
      setMuteButton();
      myVideoStream.getAudioTracks()[0].enabled = true;
    }
  };

  const setMuteButton = () => {
    const html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
      `;
    document.querySelector(".main__mute__button").innerHTML = html;
  };

  const setUnmuteButton = () => {
    const html = `
        <i class="fas fa-microphone-slash"></i>
        <span>Unmute</span>
        `;
    document.querySelector(".main__mute__button").innerHTML = html;
  };

  return (
    <div className="main">
      <div className="main__left">
        <div className="main__videos">
          <div id="video-grid" className="video-grid"></div>
        </div>
        <div className="main__controls">
          <div className="main__controls__block">
            <div
              onClick={muteUnmute}
              className="main__controls__button main__mute__button"
            >
              <i className="fas fa-microphone"></i>
              <span>Mute</span>
            </div>
            <div
              onClick={muteUnmute}
              className="main__controls__button main__mute__button"
            >
              <i className="fas fa-video"></i>
              <span>Stop Video</span>
            </div>
          </div>
          <div className="main__controls__block">
            <div className="main__controls__button">
              <i className="fas fa-user-friends"></i>
              <span>Participants</span>
            </div>
            <div className="main__controls__button">
              <i className="fas fa-comment-alt"></i>
              <span>Chat</span>
            </div>
          </div>
          <div className="main__controls__block">
            <div className="main__controls__button">
              <span className="leave_meeting">Leave Meeting</span>
            </div>
          </div>
        </div>
      </div>
      <div className="main__right">
        <div className="main__header">
          <h5>Chat</h5>
        </div>
        <div className="main__chat__window">
          <ul className="messages"></ul>
        </div>
        <div className="main__message__container">
          <input
            className="chat__message"
            type="text"
            placeholder="Type message here..."
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherRoom;

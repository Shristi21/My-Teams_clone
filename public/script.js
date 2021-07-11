
//For inviting new users

const InviteUsers = () => {
  document.body.classList.add("showInvite");
  document.getElementById('roomLink').value = window.location.href;
};

const hideInvite = () => {
  document.body.classList.remove("showInvite");
};

const copyToClipboard = () => {

  let copyText = document.getElementById("roomLink");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  document.execCommand("copy");

  alert("copied: " + copyText.value);
  hideInvite();
};

const showchat = (e) => {
  e.classList.toggle("active");
  document.body.classList.toggle("Showchat");
};

//Dark Mode And Light mode toggle

const options = {
  bottom: '32px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '200px', // default: 'unset'
  time: '0.3s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#fff',  // default: '#fff'
  buttonColorDark: '#100f2c',  // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: true, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: true // default: true
}
console.log(options);

const darkmode = new Darkmode(options);
console.log(darkmode);
darkmode.showWidget();



/////Taking input of user's name
const yourName = prompt("Enter your Name");
console.log(yourName);


const socket = io('/')

const videogrid = document.getElementById('video-grid')

console.log("1. apple");
console.log(socket);  //print
const leave_Meet = document.getElementById("leave")

//peer server connects different users and gives us unique id
const mypeer = new Peer(undefined)

/*{ //undefined becoz we want server to generate own id
  //path: "/peerjs",
  host: '/',
  port:'3001',
  secure:false
});  */

var pcConfig = {
  'iceServers': [
    { 'urls': 'stun:stun.l.google.com:19302' },
    { "urls": "turn:numb.viagenie.ca", "username": "webrtc@live.com", "credential": "muazkh" }
  ]
};

pc = new RTCPeerConnection(pcConfig);
//RTCPeerConnection is an API used to create connections between peers, and communicate audio and video

const myvideo = document.createElement('video')

myvideo.muted = true;  //mute video to ourself
myvideo.autoplay = true;
myvideo.playsInline = true;

const peers = {};


navigator.mediaDevices.getUserMedia({   //this function is responsible to take our video
  video: true,
  audio: true
}).then(stream => {
  myVideoStream = stream;
  addvideostream(myvideo, stream)

  mypeer.on('call', call => {

    call.answer(stream)
    const video = document.createElement('video')  //this part is responsible for respond to new connected user by sending our video stream
    call.on('stream', uservideostream => {
      setTimeout(() => {
        addvideostream(video, uservideostream)
      }, 1000)

    })
  })

  //we are listening the join room event from server 

  socket.on('user-connected', userId => {   //as new user connected pass our video stream to that user
    // user is joining                            
    setTimeout(() => {
      // user joined
      connecttonewuser(userId, stream);
    }, 1000)
  })

  //messages
  // input value
  let text = $("#chat-message");
  // when press enter send message
  $('html').keydown(function (e) {
    if (e.which == 13 && text.val().length !== 0) {
      socket.emit('message', text.val(), yourName); //sending the message and name to server
      text.val('')  //blanking the input

    }
  });
  socket.on("createMessage", (message) => {   //listening to the createMessage event from server
    // $("ul").append(`<li class="message"><b>${message.userId}</b><br/>=${message.message}</li>`);
    $("ul").append(`<li class="message">${message.userId} : ${message.message}</li>`);
    scrollToBottom()
  });



});



socket.on('user-disconnected', userId => {
  if (peers[userId])
    peers[userId].close()  //close the server of that user
})


mypeer.on('open', id => {  //as soon as we connect with our peer server and get an id 

  socket.emit('join-room', roomID, id) //

})



function connecttonewuser(userId, stream) {

  const call = mypeer.call(userId, stream) //we are calling the user at userId and passing our video stream to that user

  const video = document.createElement('video')

  video.autoplay = true;
  video.playsInline = true;
  call.on('stream', uservideostream => {  // new user is sending back their video stream 

    addvideostream(video, uservideostream)  //adding that new user's video stream to our side
  })
  call.on('close', () => {
    video.remove()
  })
  peers[userId] = call
}

function addvideostream(video, stream) {

  video.srcObject = stream;
  video.autoplay = true;
  video.playsInline = true;

  video.addEventListener('loademetadata', () => {
    video.play()
  })
  videogrid.append(video)

};


const scrollToBottom = () => {
  var d = $('.chat-window');
  d.scrollTop(d.prop("scrollHeight"));
}

const muteaudio = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }

}

const stopvideo = () => {
  console.log('object')
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo()
  } else {
    setStopVideo()
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
}

const setMuteButton = () => {
  const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
  document.querySelector('.mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
  document.querySelector('.mute_button').innerHTML = html;
}

const setStopVideo = () => {
  const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
  `
  document.querySelector('.video_button').innerHTML = html;
}

const setPlayVideo = () => {
  const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `
  document.querySelector('.video_button').innerHTML = html;
}
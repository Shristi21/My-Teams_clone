  
////////////////////////////////////////////////////////////////

//For inviting new users

const InviteUsers = () =>{
  document.body.classList.add("showInvite");
  document.getElementById('roomLink').value= window.location.href;
};

const hideInvite= () =>{
  document.body.classList.remove("showInvite");
};
 
const copyToClipboard = () =>{

  let copyText = document.getElementById("roomLink");

  copyText.select();
  copyText.setSelectionRange(0,99999);

  document.execCommand("copy");

  alert("copied: " + copyText.value);
  hideInvite();
};

//////////////////////////////////////////////

//Dark Mode And Light mode toggle

const options = {
  bottom: '32px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '32px', // default: 'unset'
  time: '0.3s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#fff',  // default: '#fff'
  buttonColorDark: '#100f2c',  // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies:true, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: true // default: true
}
console.log(options);

const darkmode = new Darkmode(options);
console.log(darkmode);
darkmode.showWidget();    

////////////////

const socket = io('/')

const videogrid= document.getElementById('video-grid')

console.log("1. apple"); 
console.log(socket);  //print
const leave_Meet = document.getElementById("leave")

//peer server connects different users and gives us unique id
const mypeer = new Peer (undefined)

/*{ //undefined becoz we want server to generate own id
  //path: "/peerjs",
  host: '/',
  port:'3001',
  secure:false
});  */

console.log("2. ball");
console.log(mypeer );  //////////peer 

var pcConfig = {
  'iceServers': [
    {'urls': 'stun:stun.l.google.com:19302'},
    {"urls":"turn:numb.viagenie.ca", "username":"webrtc@live.com", "credential":"muazkh"}
]
};

console.log("3. cat" );
console.log(pcConfig);

 pc = new RTCPeerConnection(pcConfig);
 //RTCPeerConnection is an API used to create connections between peers, and communicate audio and video

 console.log("4. dog");
 console.log(pc);  

const myvideo = document.createElement('video')
console.log("5. ele");
console.log(myvideo);

myvideo.muted=true;  //mute video to ourself
myvideo.autoplay = true;
myvideo.playsInline = true;

const peers= {};
console.log("6. fun");
console.log(peers);      /////////////////////////

navigator.mediaDevices.getUserMedia({   //this function is responsible to take our video
    video:true,
    audio:true
}).then(stream => {
  myVideoStream = stream;    /////////////////
  console.log("7. gun");
  console.log(myVideoStream);                       ////////////////////
addvideostream(myvideo,stream)

mypeer.on('call', call => {
  console.log("8. hat");
  console.log(call);                        //////////////////////////
    call.answer(stream)
    console.log("9. ice");
    console.log(stream);             ////////////////////

   const video=document.createElement('video')  //this part is responsible for respond to new connected user by sending our video stream
    call.on('stream',uservideostream => {
      console.log("10. jack");
      setTimeout(()=>{
        addvideostream(video,uservideostream)
      },1000)                 ///////////////////////////
        
    } )
})

 /*socket.on('user-connected', userId =>{    //we are listening the join room event from server 
   console.log('user connected: '+ userId);              /////////////////////////////  in this we are passing our video
    connecttonewuser(userId,stream);
}) 
})  ;   */ 

socket.on('user-connected', userId => {   //as new user connected pass our video stream to that user
    // user is joining
    setTimeout(() => {
      // user joined
      connecttonewuser(userId, stream);
    }, 1000)
  }) 
});  



socket.on('user-disconnected' ,userId =>{
   if(peers[userId]) 
   peers[userId].close()  //close the server of that user
})


mypeer.on('open', id =>{  //as soon as we connect with our peer server and get an id 
  console.log("11. kite");
  console.log(id);             /////////////////////
    socket.emit('join-room', roomID, id) //
    console.log("12. lion");
    console.log(id);            ////////////////////
}) 



function connecttonewuser(userId,stream){
  console.log("13. man");
  console.log(userId,  stream);
    const call= mypeer.call(userId,stream) //we are calling the user at userId and passing our video stream to that user
    console.log("14. nest");
    console.log(call);     ///////////////////////
    const video=document.createElement('video')
    console.log("15. orange");
    console.log(video);    ///////////////////////
    video.autoplay = true;
    video.playsInline = true;
    call.on('stream',uservideostream => {  // new user is sending back their video stream 
      console.log("16. parrot");
      console.log(uservideostream);    ////////////////////
        addvideostream(video,uservideostream)  //adding that new user's video stream to our side
    })
    call.on('close', ()=> {
        video.remove() 
    })
    peers[userId]= call
}

function addvideostream(video,stream ){
  console.log("17. queen");
  console.log(video, stream);     ///////////
    video.srcObject=stream;
    video.autoplay = true;
    video.playsInline = true;
    console.log("18. rest");
    console.log(stream)        /////////////////
    video.addEventListener('loademetadata',() => {
        video.play()
    })
    videogrid.append(video)
    console.log("19. shri");
    console.log(video);       ////////////

    ////////////
    /*let totalUsers = document.getElementsByTagName("video").length;
    if (totalUsers > 1) {
      for (let index = 0; index < totalUsers; index++) {
        document.getElementsByTagName("video")[index].style.width =
          100 / totalUsers + "%";
      }
    }   */

  /////////////

};

// media controlling functions
/*
const stopvideo = () => {
  let enabled = myvideo.getVideoTracks()[0].enabled;
  if (enabled) {
    myvideo.getVideoTracks()[0].enabled = false;
    setPlayVideo();
  } else {
    setStopVideo();
    myvideo.getVideoTracks()[0].enabled = true;
  }
};

const muteaudio = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myvideo.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myvideo.getAudioTracks()[0].enabled = true;
  }
};

const setPlayVideo = () => {
  const html = `<i class="unmute fa fa-pause-circle"></i>
  <span class="unmute">Resume</span>;`
  document.getElementById("Pause").innerHTML = html;
};

const setStopVideo = () => {
  const html = `<i class=" fa fa-video-camera"></i>
  <span class="">Pause</span>`;
  document.getElementById("Pause").innerHTML = html;
};

const setUnmuteButton = () => {
  const html = `<i class="unmute fa fa-microphone-slash"></i>
  <span class="unmute">Unmute</span>`;
  document.getElementById("mute").innerHTML = html;
};
const setMuteButton = () => {
  const html = `<i class="fa fa-microphone"></i>
  <span>Mute</span>`;
  document.getElementById("mute").innerHTML = html;
};   */

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
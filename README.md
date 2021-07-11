A video chat web application where two users can easily communicate via video calling functionality and can also chat within the app. Application will look on desktop.

The application is being made with the help of WebRTC. WebRTC (web Real-Time communication) is a technology which is basically used to capture and stream audio/video as well as exchange data between peers.

Link --->  https://webrtc.org/

Wireframe of my application:
<iframe style="border:none" width="800" height="450" src="https://whimsical.com/embed/7LkmDNV1VEpZhh32xwsiK2"></iframe>

Features:
1. video call:- Two users can easily connect or communicate with each other via video call.
2. Chat:- Users can easily send messages to each other within the meeting.
3. Mute Unmute:- Users can mute and unmute their audios according to them.
4. Stop play:- Users can stop and play their videos as per their choice
5. Dark and Light Mode:- Users can change the mode according to their preference.This is the new feature which I tried to add in my web application because this feature is not available in any of the meeting application like zoom,google meet,teams.

For making that dark and light mode feature I have used Darkmode.js library.
Link --> https://darkmodejs.learn.uno/

To run on local host:
1. Download node js on your system
2. Clone the repo on your system
3. Run some commands on terminal
  a. npm init -y
  b. npm i socket.io
  c. nmp i uuid
  d. npm i express ejs
  e. npm i peerjs
  f. npm i peer
4. In package.json file in scripts replace the content in start with "node server.js"
5. Run node server.js on terminal. 

I have deployed my web application on heroku
Deployed Link   ------> https://my-teams-clone.herokuapp.com/




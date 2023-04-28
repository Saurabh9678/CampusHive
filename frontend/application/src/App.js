import { useEffect, useRef } from "react"

import { createClient } from "agora-rtm-react"

import { fabric } from "fabric"


const useClient = createClient(process.env.REACT_APP_AGORA_APP_ID)
// const useChannel = createChannel('main')
function App() {

  const client = useClient()

  let canvas;

  useEffect(() => {

    const options = {
      backgroundColor: "grey",
      isDrawingMode: true,
    };

    canvas = new fabric.Canvas(localUserRef.current, options);

    return () => {

      canvas.dispose();
    }
  }, []);

  const draw = () => {
    canvas.set({ isDrawingMode: !canvas.get("isDrawingMode") })
  }

  const deleteObject = () => {
    if (canvas.getActiveObject()) {
      canvas.remove(canvas.getActiveObject());
    }
  }


  let token = null
  let uid = String(Math.floor(Math.random() * 100000))
  let currentStream

  const localUserRef = useRef()
  const remoteUserRef = useRef()

  let peerConnection;

  let remoteStream;

  let channel

  const servers = {
    iceServers: [
      {
        urls: [
          'stun.l.google.com:19302',
          'stun1.l.google.com:19302',
          'stun2.l.google.com:19302',
          'stun3.l.google.com:19302',
          'stun4.l.google.com:19302'
        ]
      }
    ]
  }

  const init = async () => {

    await client.login({ uid })

    channel = client.createChannel('main')

    await channel.join()

    channel.on('MemberJoined', handleUserJoined)
    channel.on('MemberLeft', handleUserLeft)


    client.on('MessageFromPeer', handleMessageFromPeer)

  }

  const handleUserJoined = async (memberId) => {
    createOffer(memberId)
  }

  const handleUserLeft = (memberId) => {
    document.getElementById('remoteUser').style.display = 'none';
  }

  const handleMessageFromPeer = async (message, memberId) => {

    message = JSON.parse(message.text)

    if (message.type == 'offer') {
      createAnswer(memberId, message.offer)
    }
    if (message.type == 'answer') {
      addAnswer(message.answer)
    }
    if (message.type == 'candidate') {
      if (peerConnection) {
        peerConnection.addIceCandidate(message.candidate)
      }
    }

  }

  const createPeerConnection = async (memberId) => {
    peerConnection = new RTCPeerConnection()

    document.getElementById('remoteUser').style.display = 'block';

    currentStream = localUserRef.current.captureStream(25)

    currentStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, currentStream)
    })


    remoteUserRef.current.srcObject = currentStream


    peerConnection.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        remoteUserRef.current.srcObject = event.streams[0]
      } else {
        if (!remoteStream) {
          remoteStream = new MediaStream();
          remoteUserRef.current.srcObject = event.streams[0]
        }
        remoteStream.addTrack(event.track);
      }
    }

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'candidate', 'candidate': event.candidate }) }, memberId)
      }
    }

  }

  const createOffer = async (memberId) => {

    await createPeerConnection(memberId)

    let offer = await peerConnection.createOffer()

    await peerConnection.setLocalDescription(offer)

    client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'offer', 'offer': offer }) }, memberId)

  }


  const createAnswer = async (memberId, offer) => {

    await createPeerConnection(memberId)

    await peerConnection.setRemoteDescription(offer)

    let answer = await peerConnection.createAnswer()

    await peerConnection.setLocalDescription(answer)

    client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'answer', 'answer': answer }) }, memberId)

  }


  const addAnswer = async (answer) => {
    if (!peerConnection.currentRemoteDescription) {
      peerConnection.setRemoteDescription(answer)
    }
  }


  const leaveChannel = async () => {
    await channel.leave()
    await client.logout()
  }

  return (
    <div className="App">

      <button onClick={() => init()}>Start</button>

      <div className="App">
        <canvas width="300" height="300" ref={localUserRef} />
        <button onClick={() => draw()}>Draw</button>
        <button onClick={() => deleteObject()}>Delete</button>
      </div>

      <video style={{ display: 'block' }} id="remoteUser" ref={remoteUserRef} autoPlay playsInline></video>

    </div>
  );
}

export default App;

import { useEffect, useRef } from "react"

import { useUserMedia } from "./use-user-media"
import { createClient } from "agora-rtm-react"


const useClient = createClient(process.env.REACT_APP_AGORA_APP_ID)
// const useChannel = createChannel('main')
function VoiceChannel({token, username, roomId, isMute}) {

  const client = useClient()

  let uid = username

  const CAPTURE_OPTIONS = { video: false, audio: true }

  const userOwnAudioRef = useRef()
  const userAudioRef1 = useRef()

  let peerConnection;

  let remoteStream;

  let channel

  const userOwnMediaStream = useUserMedia(CAPTURE_OPTIONS)

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

  useEffect(() => {
    if (userOwnMediaStream && userOwnAudioRef.current && !userOwnAudioRef.current.srcObject) {
      init()
    }
  }, [userOwnMediaStream])

  const init = async () => {
    userOwnAudioRef.current.srcObject = userOwnMediaStream

    await client.login({ uid })

    channel = client.createChannel(roomId)

    await channel.join()

    channel.on('MemberJoined', handleUserJoined)
    channel.on('MemberLeft', handleUserLeft)


    client.on('MessageFromPeer', handleMessageFromPeer)
  }

  const handleUserJoined = async (memberId) => {
    createOffer(memberId)
  }

  const handleUserLeft = (memberId) => {
    document.getElementById('audio-user-2').style.display = 'none';
  }

  const handleMessageFromPeer = async (message, memberId) => {
    
    message = JSON.parse(message.text)

    if(message.type == 'offer'){
      createAnswer(memberId, message.offer)
    }
    if(message.type == 'answer'){
      addAnswer(message.answer)
    }
    if(message.type == 'candidate'){
      if(peerConnection){
        peerConnection.addIceCandidate(message.candidate)
      }
    }

  }

  const createPeerConnection = async (memberId) => {
    peerConnection = new RTCPeerConnection()

    remoteStream = new MediaStream()

    userAudioRef1.current.srcObject = remoteStream

    userOwnMediaStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, userOwnMediaStream)
    })

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track)
      })
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
    if(!peerConnection.currentRemoteDescription){
      peerConnection.setRemoteDescription(answer)
    }
  }

  const leaveChannel = async () => {
    await channel.leave()
    await client.logout()
  }

  window.addEventListener('beforeunload', leaveChannel)

  return (
    <div className="App" style={{display:'none'}}>
      <audio style={{display:'none'}} className='audioBox' id="audio-user-1" ref={userOwnAudioRef} muted></audio>
      <audio style={{display:'none'}} className='audioBox' id="audio-user-2" ref={userAudioRef1} controls autoPlay playsInline muted={isMute}></audio>
    </div>
  );
}

export default VoiceChannel;

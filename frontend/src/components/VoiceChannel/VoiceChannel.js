import React from 'react'

import { createClient } from "agora-rtm-react"
import { useUserMedia } from './use-user-media'
import { useRef, useEffect } from 'react'



console.log(process.env.REACT_APP_AGORA_APP_ID)

const useClient = createClient(process.env.REACT_APP_AGORA_APP_ID)

const VoiceChannel = ({token, username, roomId}) => {

    const client = useClient()

    let uid = username

    const CAPTURE_OPTIONS = { video: false, audio: true }

    const userOwnAudioRef = useRef()

    const userAudioRef1 = useRef()

    const connectedUserDetails = {};

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
            console.log("ji")
            init()
        }
    }, [userOwnMediaStream])

    const init = async () => {
        userOwnAudioRef.current.srcObject = userOwnMediaStream

        await client.login({ uid, token })

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
        leaveChannel(memberId)
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

        remoteStream = new MediaStream()

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

        connectedUserDetails = { ...connectedUserDetails, memberId: remoteStream }

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


    const leaveChannel = async (memberId) => {
        connectedUserDetails.delete(memberId)
        await channel.leave()
        await client.logout()
    }

    return (
        <div>
            <audio style={{display:'none'}}  ref={userOwnAudioRef} muted></audio>
            {
                Object.keys(connectedUserDetails).length>0&&connectedUserDetails.forEach((key, index) => {
                    const memberId = key
                    const stream = connectedUserDetails[key]
                    document.getElementById(key).srcObject = stream;
                    return <audio key={index + ":" + key} id={key} autoPlay></audio>
                })
            }
        </div>
    )
}

export default VoiceChannel
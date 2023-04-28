import { Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import DrawingCanvas from '../components/drawing-canvas/DrawingCanvas';
import RemoteDrawingCanvas from '../components/drawing-canvas/RemoteDrawingCanvas';
import { createClient } from 'agora-rtm-react';

const useClient = createClient(process.env.REACT_APP_AGORA_APP_ID)

const Play = () => {

    //agora
    let channel;
    let client = useClient()
    let peerConnection;
    let localStream;
    let remoteStream;

    const remoteUserStreamRef = useRef()

    const roomId = '0000';

    const [turn, setturn] = useState(null)

    const selfCanvasRef = useRef()

    const [remoteCanvasStream, setremoteCanvasStream] = useState(null)

    const [step, setstep] = useState(1)

    const [isCoordinator, setisCoordinator] = useState(true)

    const joinedMembersInRoom = ['112233', '123434', '431235']

    const [clientIndex, setclientIndex] = useState()

    const selfDetail = [
        {
            memberId: "112233",
            username: "rokerzsa"
        }, {
            memberId: "112244",
            username: "rozsa"
        }, {
            memberId: "112255",
            username: "rokea"
        }
    ]

    const timeLeftInLobby = 0;

    const getMemberCount = async (roomId, client) => {
        await client.login({ uid: 'admin' })
        const count = await client.getChannelMemberCount([roomId])
        await client.logout()
        return count[roomId]
    }

    const getRoomId = () => {

    }

    const joinRoom = async (roomId, uid) => {
        await client.login({ uid })
        channel = client.createChannel(roomId)
        await channel.join()
        channel.on('MemberJoined', handleUserJoined)
        channel.on('MemberLeft', handleUserLeft)

        client.on('MessageFromPeer', handleMessageFromPeer)
    }


    console.log(selfCanvasRef.current)
    console.log(selfCanvasRef.current)

    const createPeerConnection = async (turn, memberId) => {
        peerConnection = new RTCPeerConnection()

        let localStream = selfCanvasRef.current.captureStream(25)

        localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream)
        })

        peerConnection.ontrack = (event) => {
            if (event.streams && event.streams[0]) {
                remoteUserStreamRef.current.srcObject = event.streams[0]
            } else {
                if (!remoteStream) {
                    remoteStream = new MediaStream();
                    remoteUserStreamRef.current.srcObject = event.streams[0]
                }
                remoteStream.addTrack(event.track);
            }
            console.log(remoteUserStreamRef.current.srcObject)
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

        await createPeerConnection(turn, memberId)

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

    const handleUserJoined = async (memberId) => {
        createOffer(memberId)
    }

    const handleUserLeft = (memberId) => {
        leaveChannel()
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


    const startGame = () => {
        //send message to all others to start the game
        setstep(2)
    }

    // const initRound = (turn) => {
    //     if (turn == selfDetail.memberId) {
    //         startDraw()
    //     }
    //     else {
    //         startGuess()
    //     }
    // }

    const startDraw = () => {

    }

    const startGuess = () => {

    }

    const selectCoordinator = () => {
        // select coordinator among 
    }

    const handleCoordinatorChange = (memberId) => {
        if (selfDetail.memberId == memberId) {
            setisCoordinator(true);
        }
    }

    const leaveChannel = async () => {
        if (isCoordinator) {
            selectCoordinator()
        }
        await channel.leave()
        await client.logout()
    }

    useEffect(() => {

        if (joinedMembersInRoom.length == 0) {
            setisCoordinator(true)
        }
        getMemberCount(roomId, client).then((res) => {
            res = res % 3

            console.log(res)

            setclientIndex(res)
            const clientIndex = res
            if (clientIndex == 0) {
                setisCoordinator(true)
                setturn(selfDetail[clientIndex].memberId)
            }
            joinRoom(roomId, selfDetail[clientIndex].username)
        })
    }, [])

    useEffect(() => {
        if (timeLeftInLobby == 0 && isCoordinator) {
            setTimeout(() => {
                startGame();
            }, 5000)
        }
    }, [timeLeftInLobby])


        return (
            <div>
                {
                    step == 1 &&
                    <Grid container>
                        <Grid xs={6} item>
                            <Grid sx={{ height: " 200px " }} justifyContent={'center'} alignItems={'center'} container>User 1</Grid>
                        </Grid>
                        <Grid xs={6} item>
                            <Grid sx={{ height: " 200px " }} justifyContent={'center'} alignItems={'center'} container>User 2</Grid>
                        </Grid>
                        <Grid xs={6} item>
                            <Grid sx={{ height: " 200px " }} justifyContent={'center'} alignItems={'center'} container>User 3</Grid>
                        </Grid>
                        <Grid xs={6} item>
                            <Grid sx={{ height: " 200px " }} justifyContent={'center'} alignItems={'center'} container>User 4</Grid>
                        </Grid>
                    </Grid>
                }
    
                {
    
                    step == 2 &&
    
                    <Grid container>
                        <Grid xs={12} item>
                            {console.log(clientIndex)}
  
                                <DrawingCanvas ref={selfCanvasRef} />
                                <RemoteDrawingCanvas ref={remoteUserStreamRef} />
                            
                        </Grid>
                        <Grid xs={12} item>
                            Chat
                        </Grid>
                    </Grid>
    
                }
    
            </div>
        )
}



export { Play }
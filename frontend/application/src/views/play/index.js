import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DrawingCanvas from '../components/drawing-canvas/DrawingCanvas';
import RemoteDrawingCanvas from '../components/drawing-canvas/RemoteDrawingCanvas';
import { createClient } from 'agora-rtc-react';

const useClient = createClient(process.env.REACT_APP_AGORA_APP_ID)

const Play = () => {

    const roomId = '0000';

    const turn = '112233'

    const [selfCanvasStream, setselfCanvasStream] = useState(null)

    const [remoteCanvasStream, setremoteCanvasStream] = useState(null)

    const [step, setstep] = useState(1)

    const [isCoordinator, setisCoordinator] = useState(true)

    const joinedMembersInRoom = ['112233', '123434', '431235']

    const selfDetail = {
        memberId: '112233',
        name: 'Arif Alam',
        username: 'rokerzsa'
    }

    const timeLeftInLobby = 0;

    const getMemberList = () => {
    }

    const getRoomId = () => {

    }

    const joinRoom = (roomId, username) => {

    }

    const startGame = () => {
        //send message to all others to start the game
        setstep(2)
    }

    const initRound = (turn) => {
        if (turn == selfDetail.memberId) {
            startDraw()
        }
        else {
            startGuess()
        }
    }

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

    const leaveRoom = () => {
        //leave channe;
        //logout client
    }

    const onGameLeave = () => {
        if (isCoordinator) {
            selectCoordinator()
        }
        leaveRoom()
    }



    const handleCanvasStreamCallback = (stream) => {
        setselfCanvasStream(stream)
    }


    useEffect(() => {
        if (joinedMembersInRoom.length == 0) {
            setisCoordinator(true)
        }
        joinRoom(roomId, selfDetail.username)
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
                        {turn == selfDetail.memberId ?
                            <DrawingCanvas callback={handleCanvasStreamCallback} />
                            :
                            <RemoteDrawingCanvas />
                        }
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
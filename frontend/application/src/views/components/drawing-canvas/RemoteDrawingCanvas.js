import React, { forwardRef } from 'react'

const RemoteDrawingCanvas = forwardRef((props, ref) => {
    return (
        <div>
            <video ref={ref} autoPlay playsInline></video>
        </div>
    )
})

export default RemoteDrawingCanvas
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { SocketContext } from "../socketContext";
import { MainContext } from "../mainContext";

export function MicrophoneStreamer() {
    const socket = useContext(SocketContext)
    const timeSlice = 12
    const constraints = { audio: true, video: false }
    const stop = useRef(null)
    const { mainUser } = useContext(MainContext)
    const [start, setStart] = useState(true)

    function stopStream() {
        if (!window.streamReference) return;
    
        window.streamReference.getAudioTracks().forEach(function(track) {
            track.stop();
        });
    
        window.streamReference.getVideoTracks().forEach(function(track) {
            track.stop();
        });
    
        window.streamReference = null;
    }
    


    useEffect(() => {
        console.log("startRecording")
        let controller = new AbortController();
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                window.streamReference = stream
                if (!controller.signal.aborted) {
                let mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = function (e) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(e.data);
                    fileReader.onloadend = function () {
                        var base64String = fileReader.result;
                        socket.emit("voice", base64String);

                    };

                    console.log("dataAv");
                }
                    mediaRecorder.start(timeSlice)
                    stop.current = function () { 
                        mediaRecorder.ondataavailable = null
                        mediaRecorder.stop()
                    }
                    console.log("start")
                } else {
                    stopStream()
                }
            }).catch(function (err) {
                console.log('The following error occurred: ' + err);
            })
        return () => {
            controller?.abort()
            console.log("stopRecoring")
            setStart(false)
            console.log(start)
            stop.current && stop.current()
            stopStream()
        }
    }, []);

    return (null);

}
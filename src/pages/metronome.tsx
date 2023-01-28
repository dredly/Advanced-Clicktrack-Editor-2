import * as Tone from 'tone'

const MetronomePage = () => {
    const startAudio = async () => {
        await Tone.start()
        const synthA = new Tone.FMSynth().toDestination()
        const loop = new Tone.Loop(time => {
            synthA.triggerAttackRelease("C2", "8n", time);
        }, "4n").start(0);
        Tone.Transport.start()
        console.log("Tone Started")
    }

    const stopAudio = () => {
        Tone.Transport.stop()
    }

    return (
        <div>
            <h1>Metronome</h1>
            <button onClick={startAudio}>Play</button>
            <button onClick={stopAudio}>Stop</button>
        </div>
    )
}

export default MetronomePage
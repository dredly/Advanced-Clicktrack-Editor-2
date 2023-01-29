import * as Tone from 'tone'
import { getBeats } from '@/toneHelpers'
import { useState } from 'react'
import BpmControls from '@/components/forms/BpmControls'

const STRONG_VOLUME = 3
const WEAK_VOLUME = 0.8

const MetronomePage = () => {
    const [bpm, setBpm] = useState<number>(60)

    const startAudio = async () => {
        await Tone.start()
        const synthA = new Tone.FMSynth().toDestination()
        const loop = new Tone.Loop(time => {
            const position = Tone.Transport.position.toString()
            const beat = getBeats(position)
            const volume = beat === 0 ? STRONG_VOLUME : WEAK_VOLUME
            synthA.triggerAttackRelease("C2", "8n", time, volume);
        }, "4n").start(0);
        Tone.Transport.bpm.value = bpm
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
            <BpmControls bpm={bpm} setBpm={setBpm}/>
        </div>
    )
}

export default MetronomePage
import * as Tone from 'tone'
import { getBeats } from '@/toneHelpers'
import { useState } from 'react'
import BpmControls from '@/components/forms/BpmControls'
import TimeSignatureControls from '@/components/forms/TimeSignatureControls'

const STRONG_VOLUME = 3
const WEAK_VOLUME = 0.8

const MetronomePage = () => {
    const [bpm, setBpm] = useState<number>(60)
    const [timeSignature, setTimeSignature] = useState<Array<number>>([4, 4])
    const [loop, setLoop] = useState<Tone.Loop<Tone.LoopOptions> | null>(null);

    const startAudio = async () => {
        await Tone.start()
        const synthA = new Tone.FMSynth().toDestination()
        const loop = new Tone.Loop(time => {
            const position = Tone.Transport.position.toString()
            const beat = getBeats(position)
            console.log("beat =", beat)
            console.log("time =", time)
            const volume = beat === 0 ? STRONG_VOLUME : WEAK_VOLUME
            synthA.triggerAttackRelease("C2", "16n" , time, volume);
        }, timeSignature[1].toString() + "n");
        loop.start(0);
        setLoop(loop);
        Tone.Transport.bpm.value = bpm
        Tone.Transport.timeSignature = timeSignature
        Tone.Transport.start()
        console.log("Tone Started")
    }

    const stopAudio = () => {
        Tone.Transport.stop()
    }

    const updateBpm = (newBpm: number) => {
        // We need to update the bpm both in React's internal state and for the ToneJS transport
        Tone.Transport.bpm.value = newBpm
        setBpm(newBpm)
    }

    const updateTimeSig = (newTimeSig: number[]) => {
        Tone.Transport.timeSignature = newTimeSig
        loop?.set({
            interval: newTimeSig[1].toString() + "n"
        })
        setTimeSignature(newTimeSig)
    }

    return (
        <div>
            <h1>Metronome</h1>
            <button onClick={startAudio}>Play</button>
            <button onClick={stopAudio}>Stop</button>
            <p>Current tempo: <strong>{bpm}</strong>bpm</p>
            <BpmControls bpm={bpm} updateBpm={updateBpm}/>
            <TimeSignatureControls timeSig={timeSignature} updateTimeSig={updateTimeSig}/>
        </div>
    )
}

export default MetronomePage
import * as Tone from 'tone'
import { getBars } from '@/toneHelpers'
import { useRef, useState } from 'react'
import BpmControls from '@/components/forms/BpmControls'
import TimeSignatureControls from '@/components/forms/TimeSignatureControls'
import AccentControls from '@/components/forms/AccentControls'

const STRONG_VOLUME = 3
const WEAK_VOLUME = 0.8

const MetronomePage = () => {
    const [bpm, setBpm] = useState<number>(60)
    const [timeSignature, setTimeSignature] = useState<Array<number>>([4, 4])
    const [loop, setLoop] = useState<Tone.Loop<Tone.LoopOptions> | null>(null);
    const previousBarsRef = useRef<number>(-1);
    const beatsRef = useRef<number>(-1);
    const [accents, setAccents] = useState<Array<number>>([0])

    const getLoopCallback = (synth: Tone.FMSynth, currentAccents: number[]) => {
        console.log("Getting new loop callback")
        console.log("Current accents =", currentAccents)
        return (time: number) => {
            const position = Tone.Transport.position.toString()
            const bars = getBars(position)

            const isStartingNewMeasure = bars > previousBarsRef.current;
            previousBarsRef.current = bars
            
            beatsRef.current = isStartingNewMeasure ? 0 : beatsRef.current + 1;
            const volume = currentAccents.includes(beatsRef.current) ? STRONG_VOLUME : WEAK_VOLUME;
            synth.triggerAttackRelease("C2", "16n" , time, volume);
        }
    }

    const startAudio = async () => {
        await Tone.start()
        const synthA = new Tone.FMSynth().toDestination()
        const loop = new Tone.Loop(getLoopCallback(synthA, accents), timeSignature[1].toString() + "n");
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

        // Check if there are redundant accents, for example an accent on the 4th beat but we are now in 3:4 time
        if (accents.find(a => a >= newTimeSig[0])) {
            updateAccents(accents.filter(a => a < newTimeSig[0]))
        }
    }

    const updateAccents = (newAccents: number[]) => {
        // TODO: try using the same synth instead of making a new one
        loop?.set({
            callback: getLoopCallback(new Tone.FMSynth().toDestination(), newAccents)
        })
        setAccents(newAccents)
    }

    return (
        <div>
            <h1>Metronome</h1>
            <button onClick={startAudio}>Play</button>
            <button onClick={stopAudio}>Stop</button>
            <p>Current tempo: <strong>{bpm}</strong>bpm</p>
            <BpmControls bpm={bpm} updateBpm={updateBpm}/>
            <TimeSignatureControls timeSig={timeSignature} updateTimeSig={updateTimeSig}/>
            <AccentControls numBeats={timeSignature[0]} accentedBeats={accents} updateAccents={updateAccents} />
            <h2>DEBUG ZONE</h2>
            {accents.join(",")}
        </div>
    )
}

export default MetronomePage
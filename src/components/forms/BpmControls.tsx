import React, { useState } from "react"

const MIN_BPM = 30
const MAX_BPM = 300

const BpmControls = ({bpm, updateBpm}: {bpm: number, updateBpm: (arg0: number) => void}) => {
    const [exactBpm, setExactBpm] = useState<number>(bpm)

    const handleSliderChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        updateBpm(Number(evt.target.value))
        setExactBpm(Number(evt.target.value))
    }

    const handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setExactBpm(Number(evt.target.value))
    }

    const handleTextUpdate = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        updateBpm(exactBpm)
    }

    return (
        <>
            <form onSubmit={evt => { evt.preventDefault() }}>
                <input key="changebpm" type="range" min={MIN_BPM} max={MAX_BPM} value={bpm} onChange={handleSliderChange} />
            </form>
            <form onSubmit={handleTextUpdate}>
                <input type="number" onChange={handleTextChange} value={exactBpm}/>
                <button type="submit">Change to exact bpm</button>
            </form>
        </>
    ) 
}

export default BpmControls
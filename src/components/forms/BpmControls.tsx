import React from "react"

const MIN_BPM = 30
const MAX_BPM = 300

const BpmControls = ({bpm, updateBpm}: {bpm: number, updateBpm: (arg0: number) => void}) => {
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        updateBpm(Number(evt.target.value))
    }

    return (
        <form onSubmit={evt => { evt.preventDefault() }}>
            <input key="changebpm" type="range" min={MIN_BPM} max={MAX_BPM} value={bpm} onChange={handleChange} />
        </form>
    ) 
}

export default BpmControls
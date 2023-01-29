const MIN_BPM = 30
const MAX_BPM = 300

const BpmControls = ({bpm, setBpm}: {bpm: number, setBpm: (arg0: number) => void}) => {
    return (
        <form onSubmit={evt => { evt.preventDefault() }}>
            <input key="changebpm" type="range" min={MIN_BPM} max={MAX_BPM} value={bpm} onChange={evt => {setBpm(Number(evt.target.value))}} />
        </form>
    ) 
}

export default BpmControls
const TimeSignatureControls = ({timeSig, updateTimeSig}: {timeSig: number[], updateTimeSig: (arg0: number[]) => void}) => {
    const numerators = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
	const denominators = [2, 4, 8]

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
            <select value={timeSig[0]} onChange={evt => updateTimeSig([Number(evt.target.value), timeSig[1]])}>
                {numerators.map(n => <option value={n} key={n}>{n.toString()}</option>)}
            </select>
            <select value={timeSig[1]} onChange={evt => updateTimeSig([timeSig[0], Number(evt.target.value)])}>
                {denominators.map(d => <option value={d} key={d}>{d.toString()}</option>)}
            </select>
        </form>
    )
}

export default TimeSignatureControls
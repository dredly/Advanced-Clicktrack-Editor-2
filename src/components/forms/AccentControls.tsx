const AccentControls = ({ numBeats, accentedBeats }: {numBeats: number, accentedBeats: number[]}) => {

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Select beats to accent
                {
                    [ ...Array(numBeats).keys() ]
                        .map(k => <input type="checkbox" key={k} checked={accentedBeats.includes(k)} />)
                }
            </label>
        </form>
    )
}

export default AccentControls
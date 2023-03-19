import AccentInput from "./inputs/AccentInput"

interface Props {
    numBeats: number, 
    accentedBeats: number[], 
    updateAccents: (arg0: number[]) => void
}

const AccentControls = ({ numBeats, accentedBeats, updateAccents }: Props) => {

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
    }

    const handleChange = (idx: number) => {
        if (accentedBeats.includes(idx)) {
            updateAccents(accentedBeats.filter(ab => ab !== idx))
        } else {
            updateAccents(accentedBeats.concat(idx))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Select beats to accent
                {
                    [ ...Array(numBeats).keys() ]
                        .map(k => <AccentInput key={k} idx={k} checked={accentedBeats.includes(k)} handleChange={handleChange} />)
                }
            </label>
        </form>
    )
}

export default AccentControls
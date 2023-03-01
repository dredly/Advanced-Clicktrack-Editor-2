import { Dispatch, SetStateAction } from "react"
import AccentInput from "./inputs/AccentInput"

interface Props {
    numBeats: number, 
    accentedBeats: number[], 
    setAccents: Dispatch<SetStateAction<number[]>>
}

const AccentControls = ({ numBeats, accentedBeats, setAccents }: Props) => {

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
    }

    const handleChange = (idx: number) => {
        if (accentedBeats.includes(idx)) {
            setAccents(accentedBeats.filter(ab => ab !== idx))
        } else {
            setAccents(accentedBeats.concat(idx))
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
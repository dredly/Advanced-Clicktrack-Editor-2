const AccentInput = ({ idx, checked, handleChange }: { idx: number, checked: boolean, handleChange: (idx: number) => void }) => {
 
    return (
        <input 
            type="checkbox" 
            name={`beatCheckBox${idx}`} 
            value={idx} 
            defaultChecked={checked}
            onChange={() => handleChange(idx)} 
        />
    )
}

export default AccentInput
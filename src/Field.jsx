function Field({labelName, value=""}){
    return (
    <label htmlFor="">
        {labelName}
        <input type="text" value={value} readOnly/>
    </label>
    )
}

export default Field
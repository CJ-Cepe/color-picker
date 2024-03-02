function Field(labelName, value){
    return 
    <label htmlFor="">
        {labelName}
        <input type="text" value={value}/>
    </label>
}

export default Field
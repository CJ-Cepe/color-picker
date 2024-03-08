async function copyContent(e){
    try {
        if(e.target.value !== "--------------"){
            await navigator.clipboard.writeText(e.target.value);
        }
    } catch(err){

    }
}

function Field({labelName, value="", id}){
    return (
    <label htmlFor={id + "Id"}>
        {labelName}
        <input id={id + "Id"} type="text" value={value} readOnly onClick={copyContent}/>
    </label>
    )
}

export default Field
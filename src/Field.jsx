async function copyContent(e){
    try {
        if(e.target.value !== "---------"){
            await navigator.clipboard.writeText(e.target.value);
        }
    } catch(err){

    }
}

function Field({labelName, value=""}){
    return (
    <label htmlFor="">
        {labelName}
        <input type="text" value={value} readOnly onClick={copyContent}/>
    </label>
    )
}

export default Field
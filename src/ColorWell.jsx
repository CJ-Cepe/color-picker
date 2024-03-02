function ColorWell({color, onClick}){
    return <div className="color-well" style={{backgroundColor: color}} onClick={onClick}></div>
}

export default ColorWell
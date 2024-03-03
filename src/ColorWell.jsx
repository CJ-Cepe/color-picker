function ColorWell({color, onClick, children = null}){
    return <div className="color-well" style={{backgroundColor: color}} onClick={onClick}>{children}</div>
}

export default ColorWell
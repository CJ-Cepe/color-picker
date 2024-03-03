import { useRef, useState } from 'react';
import convertHex from './convertColor';
import ColorWell from './ColorWell'
import Field from './Field'
import titleIcon from './assets/huegotit.svg'
import downloadIcon from './assets/download.svg'
import deleteIcon from './assets/delete.svg'


function App() {
  const defColor = {
    hex: '---------',
    hsl: '---------',
    rgb: '---------',
    cmyk: '---------'
  }

  const [colorList, setColorList] = useState([]) //hex list
  const [colors, setColors] = useState(defColor) //obj of colors
  const currentColorRef = useRef(null)

  const handleColorPick = async () => {
    const eyeDropper =  new EyeDropper();
    try {
      const selectedColor = await eyeDropper.open();
      updateColor(selectedColor.sRGBHex)
    } catch (error) {
        console.error('Error selecting color:', error);
    }
  }

  function updateColor(hex, addFlag = true){
    currentColorRef.current.style.backgroundColor = hex;
    currentColorRef.current.style.color = hex;
    const extractedColors = convertHex(hex)
    if(addFlag){
      addColorToList(hex)
    }
    setColors(extractedColors)
  }

  function addColorToList(hex){
    if(colorList.indexOf(hex) === -1){
      setColorList([hex, ...colorList])
    }
  }

  function setCurrentActive(){

  }

  function resetColor(){
    currentColorRef.current.style.backgroundColor = '#F3F3F3';
    currentColorRef.current.style.color = '#C6C6C6';
    setColors(defColor)
  }

  function removeColorToList(){
    const hex = colors.hex
    setColorList(colorList.filter((color) => color !== hex))
    resetColor()
  }

  const handleClearList = ()=>{
    setColorList([])
    resetColor()
  }

  return (
    <>
    <header>
      <img src={titleIcon} alt="Hue Got It title"/>
      <h1>Color Picker</h1>
      <a>user guide</a>
    </header>
    <main>
      <div ref={currentColorRef} style={{backgroundColor: colors.hex}}>?</div>
      <div>
        <Field labelName = "HEX:" value = {colors.hex}></Field>
        <Field labelName = "HSL:" value = {colors.hsl}></Field>
        <Field labelName = "RGB:" value = {colors.rgb}></Field>
        <Field labelName = "CMYK:" value = {colors.cmyk}></Field>
      </div>
    </main>
    <aside>
      <span>
      <ColorWell>+</ColorWell>
        {
          colorList.map((color, index) => <ColorWell key={index} color={color} onClick={() => updateColor(color, false)}></ColorWell>)
        }
      </span>
    </aside>
    <section>
      <button onClick={handleColorPick}>Pick Color</button>
      <button><img src={downloadIcon} alt="Download"/></button>
      <button onClick={removeColorToList}><img src={deleteIcon} alt="Delete"/></button>
      <button onClick={handleClearList}>Clear</button>
    </section>
    </>
  )
}

export default App

import { useRef, useState } from 'react';
import convertHex from './convertColor';
import ColorWell from './ColorWell'
import Field from './Field'



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
    const extractedColors = convertHex(hex)
    if(addFlag){
      addColorToList(hex)
    }
    setColors(extractedColors)
  }

  function resetColor(){
    currentColorRef.current.style.backgroundColor = 'white';
    setColors(defColor)
  }

  function addColorToList(hex){
    if(colorList.indexOf(hex) === -1){
      setColorList([hex, ...colorList])
    }
  }

  function setCurrentActive(){

  }

  function resetColor(){
    currentColorRef.current.style.backgroundColor = 'white';
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
      <h1>HueGot-It! <span>Color Picker</span></h1>
    </header>
    <main>
      <div ref={currentColorRef} style={{backgroundColor: colors.hex}}></div>
      <div>
        <Field labelName = "HEX:" value = {colors.hex}></Field>
        <Field labelName = "HSL:" value = {colors.hsl}></Field>
        <Field labelName = "RGB:" value = {colors.rgb}></Field>
        <Field labelName = "CMYK:" value = {colors.cmyk}></Field>
      </div>
    </main>
    <aside>
        {
          colorList.map((color, index) => <ColorWell key={index} color={color} onClick={() => updateColor(color, false)}></ColorWell>)
        }
    </aside>
    <section>
      <button onClick={handleColorPick}>Pick Color</button>
      <button>download</button>
      <button onClick={removeColorToList}>delete</button>
      <button onClick={handleClearList}>clear</button>
    </section>
    </>
  )
}

export default App

import { useRef, useState } from 'react';
import convertHex from './convertColor';
import ColorWell from './ColorWell'
import Field from './Field'



function App() {

  const [colorList, setColorList] = useState([])
  const [colors, setColors] = useState({})
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

  function updateColor(hex){
    currentColorRef.current.style.backgroundColor = hex;
    const extractedColors = convertHex(hex)
    addColorToList(hex)
    setColors(extractedColors)
  }

  function addColorToList(hex){
    setColorList([hex, ...colorList])
  }

  function removeColorToList(){
  
  }

  function clearList(){

  }



  return (
    <>
    <header>
      <h1>Color Picker</h1>
    </header>
    <main>
      <div ref={currentColorRef}></div>
      <div>
        <Field labelName = "HEX:" value = {colors.hex}></Field>
        <Field labelName = "HSL:" value = {colors.hsl}></Field>
        <Field labelName = "RGB:" value = {colors.rgb}></Field>
        <Field labelName = "RGBA:" value = {colors.rgba}></Field>
      </div>
    </main>
    <aside>
        {
          colorList.map((color, index) => <ColorWell key={index} color={color}></ColorWell>)
        }
    </aside>
    <section>
      <button onClick={handleColorPick}>Pick Color</button>
      <button>download</button>
      <button>delete</button>
      <button>clear</button>
    </section>
    </>
  )
}

export default App

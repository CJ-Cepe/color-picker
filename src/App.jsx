import { useRef, useState } from 'react';
import convertHex from './convertColor';
import ColorWell from './ColorWell'
import Field from './Field'



function App() {

  const defColor = {
    hex: '#e5e4e2',
    hsl: '(40 , 5.45, 89.22)',
    rgb: '(229, 228, 226)',
    cmyk: '(0, 0, 1, 10)'
  }

  const [colorList, setColorList] = useState([])
  const [colors, setColors] = useState(defColor)
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

  const handleClearList = ()=>{
    setColorList([])
    setColors(defColor)
  }

  return (
    <>
    <header>
      <h1>Color Picker</h1>
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
          colorList.map((color, index) => <ColorWell key={index} color={color}></ColorWell>)
        }
    </aside>
    <section>
      <button onClick={handleColorPick}>Pick Color</button>
      <button>download</button>
      <button>delete</button>
      <button onClick={handleClearList}>clear</button>
    </section>
    </>
  )
}

export default App

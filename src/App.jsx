import { useRef, useState, useEffect } from 'react';
import convertHex from './convertColor';
import handleDownload from './handleDownload'
import ColorWell from './ColorWell'
import Field from './Field'
import titleIcon from './assets/huegotit.svg'
import downloadIcon from './assets/download.svg'
import deleteIcon from './assets/delete.svg'


function App() {

  let defColorList = []
  const defColor = {
    hex: '---------',
    hsl: '---------',
    rgb: '---------',
    cmyk: '---------'
  }

  const [colorList, setColorList] = useState(defColorList) //hex list
  const [colors, setColors] = useState(defColor) //obj of colors
  const currentColorRef = useRef(null)

  useEffect(() => {
    chrome.storage.local.get('updatedColorList', (data) => {
      defColorList = [...data.updatedColorList]
      setColorList(defColorList)
    })
  }, [])

  const handleColorPick = async () => {
    const eyeDropper =  new EyeDropper();
    try {
      const selectedColor = await eyeDropper.open();
      updateColor(selectedColor.sRGBHex)
    } catch (error) {
        console.error('Error selecting color:', error);
    }
  }

  function sendMessage(updatedColorList){
    console.log({updatedColorList})
    chrome.runtime.sendMessage({updatedColorList})
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
      const updatedList = [hex, ...colorList]
      setColorList(updatedList)
      sendMessage(updatedList)
    }
  }

  function resetColor(){
    currentColorRef.current.style.backgroundColor = '#F3F3F3';
    currentColorRef.current.style.color = '#C6C6C6';
    setColors(defColor)
  }

  function removeColorToList(){
    const hex = colors.hex
    const updatedList = colorList.filter((color) => color !== hex);
    setColorList(updatedList)
    sendMessage(updatedList)
    resetColor()
  }

  const handleClearList = ()=>{
    setColorList([])
    sendMessage([])
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
      <button onClick={() => handleDownload(colorList)}><img src={downloadIcon} alt="Download"/></button>
      <button onClick={removeColorToList}><img src={deleteIcon} alt="Delete"/></button>
      <button onClick={handleClearList}>Clear</button>
    </section>
    </>
  )
}

export default App

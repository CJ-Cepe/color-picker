import ReactDOM from 'react-dom';
import { useRef, useState, useEffect } from 'react';
import convertHex from './convertColor';
import handleDownload from './handleDownload'
import ColorWell from './ColorWell'
import Field from './Field'
import downloadIcon from './assets/download.svg'
import deleteIcon from './assets/delete.svg'
import clearIcon from './assets/clear.svg'


function App() {
  let defColorList = []
  const defColor = {
    hex: '--------------',
    hsl: '--------------',
    rgb: '--------------',
    cmyk: '--------------'
  }

  const [colorList, setColorList] = useState(defColorList) //hex list
  const [colors, setColors] = useState(defColor) //obj of colors
  const rootRef = useRef(null)
  const dotsRef = useRef(null)
  const currentColorRef = useRef(null)

  useEffect(() => {
    chrome.storage.local.get('updatedColorList', (data) => {
      if(data.updatedColorList){
        defColorList = [...data.updatedColorList]
        setColorList(defColorList)
      }
    })

    rootRef.current = document.querySelector("#root");
    dotsRef.current = document.querySelector('.snippet')
  }, [])

  function toggleHide(){
    rootRef.current.classList.toggle('invisible')
    dotsRef.current.classList.toggle('invisible')
  }

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  const handleColorPick = async () => {
    toggleHide()
    const eyeDropper =  new EyeDropper();
    try {
      await delay(10);
      const selectedColor = await eyeDropper.open();  
      updateColor(selectedColor.sRGBHex)
    } catch (error) {
       /*  console.error('Error selecting color:', error); */
    } finally {
      toggleHide()
    }
  }

  //eye dropper escaped, right clicked, error?, clicked on screen

  function sendMessage(updatedColorList){
    /* console.log({updatedColorList}) */
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
        <img src='icon.png' alt="HueMore, a simple Color Picker title icon"/>
        <h1>HueMore<span> Color Picker</span></h1>
        <a title="Open user guide" href='https://color-picker-7v4.pages.dev/' target='_blank'>User Guide</a>
      </header>
      <main>
        <div ref={currentColorRef} style={{backgroundColor: colors.hex}}>?</div>
        <div>
          <Field labelName = "HEX:" id="hex" value = {colors.hex}></Field>
          <Field labelName = "HSL:" id="hsl" value = {colors.hsl}></Field>
          <Field labelName = "RGB:" id="rgb" value = {colors.rgb}></Field>
          <Field labelName = "CMYK:" id="cmyk" value = {colors.cmyk}></Field>
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
        <button onClick={handleColorPick} title="Pick a color">Pick Color</button>
        <button onClick={() => handleDownload(colorList)} title="Export color list"><img src={downloadIcon} alt="Download"/></button>
        <button onClick={removeColorToList} title="Delete a color"><img src={deleteIcon} alt="Delete"/></button>
        <button onClick={handleClearList} title="Clear colors list"><img src={clearIcon} alt="Clear"/></button>
      </section>
    </>
  )
}

export default App

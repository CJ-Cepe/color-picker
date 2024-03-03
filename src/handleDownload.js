import convertHex from "./convertColor"

const handleDownload = (colorList)=>{
    const extractedColorList = colorList.map((hex) => {
      const extractedColors = convertHex(hex)
      return extractedColors
    })
    
    const processedList = extractedColorList.map((color) => {
      let tempString = JSON.stringify(color)
      tempString = tempString.replace(/[{}"]/g, '');
      tempString = tempString.replace(/[,]/g, ', ');
      return tempString
    })

    let toPrint = '  _    _                   _____           _              _____   _     _ \n | |  | |                 / ____|         | |            |_   _| | |   | |\n | |__| |  _   _    ___  | |  __    ___   | |_   ______    | |   | |_  | |\n |  __  | | | | |  / _ \\ | | |_ |  / _ \\  | __| |______|   | |   | __| | |\n | |  | | | |_| | |  __/ | |__| | | (_) | | |_            _| |_  | |_  |_|\n |_|  |_|  \\__,_|  \\___|  \\_____|  \\___/   \\__|          |_____|  \\__| (_)\n                                                                          \n                                                                          \n \n\n'
    toPrint = toPrint + '\n • ' + processedList.join('\n\n • ')

    // Create a data URI for file
    const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(toPrint);

    // Create an anchor elem
    const tempAnchor = document.createElement('a');
    tempAnchor.href = dataUri;
    tempAnchor.download = 'my_colors.txt';

    // Simulate a click event -> trigger download
    document.body.appendChild(tempAnchor);
    tempAnchor.click();
    document.body.removeChild(tempAnchor);
  }


export default handleDownload
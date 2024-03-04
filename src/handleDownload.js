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

    let toPrint = '  _  _                 ___         _           ___   _     _ \n | || |  _  _   ___   / __|  ___  | |_   ___  |_ _| | |_  | |\n | __ | | || | / -_) | (_ | / _ \\ |  _| |___|  | |  |  _| |_|\n |_||_|  \\_,_| \\___|  \\___| \\___/  \\__|       |___|  \\__| (_)\n'
    
    toPrint = toPrint + '  _____        __                   ___    _         __             \n / ___/ ___   / / ___   ____       / _ \\  (_) ____  / /__ ___   ____\n/ /__  / _ \\ / / / _ \\ / __/      / ___/ / / / __/ /  \'_// -_) / __/\n\\___/  \\___//_/  \\___//_/        /_/    /_/  \\__/ /_/\\_\\ \\__/ /_/   \n                                                                    \n'

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
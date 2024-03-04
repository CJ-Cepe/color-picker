import convertHex from "./convertColor"

const handleDownload = (colorList)=>{
    let toPrint = '  _  _                __  __                   \n | || |  _  _   ___  |  \\/  |  ___   _ _   ___ \n | __ | | || | / -_) | |\\/| | / _ \\ | \'_| / -_)\n |_||_|  \\_,_| \\___| |_|  |_| \\___/ |_|   \\___|\n'
      
    toPrint = toPrint + '  _____        __                   ___    _         __             \n / ___/ ___   / / ___   ____       / _ \\  (_) ____  / /__ ___   ____\n/ /__  / _ \\ / / / _ \\ / __/      / ___/ / / / __/ /  \'_// -_) / __/\n\\___/  \\___//_/  \\___//_/        /_/    /_/  \\__/ /_/\\_\\ \\__/ /_/   \n                                                                    \n\n'


    if(colorList.length > 0){
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

      toPrint = toPrint + '\n • ' + processedList.join('\n\n • ')

    } else {
      toPrint = toPrint + "\n • No Colors yet, sowwy 😥"
    }

      toPrint = toPrint + "\n\n\n\n Thank you for the download! 😊 Here's a virtual kiss for your support: 💋"
    
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
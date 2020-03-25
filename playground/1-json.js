const fs = require('fs');

const dataStream = fs.readFileSync('1-json.json');
const dataJSONString = dataStream.toString();
const JSONdata = JSON.parse(dataJSONString);
JSONdata.name = "Gokul";
JSONdata.age = 29;

fs.writeFileSync('1-json.json', JSON.stringify(JSONdata));
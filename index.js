
const app = require('express')();
const dateVerify = require('./dateVerify');
const logs = require('./logs');
const extract = require('./extract');
const port = process.env.PORT || 3005;
const server = require('http').createServer(app);
server.listen(port);
let dataObj = [], dates = {};


let promise = new Promise((resolve, reject) => {
  //creates a new promise which resolves
  //when the example file is read completely

  logs.stream(__dirname +'/example.txt', txt => resolve(txt));
})
.then(txt => {
  //Receives the example file and stores every log as an object in dataObj

  for(let i=0; i<txt.length; i++) {
    let obj = {};
    obj['date'] = txt[i].slice(0,txt[i].indexOf('T'));
    obj['time'] = txt[i].slice(txt[i].indexOf('T')+1, txt[i].indexOf('Z'));
    obj['log'] = txt[i].slice(txt[i].indexOf('Z')+2);
    dataObj.push(obj);
  }
  return dataObj;
})
.then(data => {
  /* Receives the dataObj object and creates a dates object
     with key as date and value as an array which
     contains the first index and the last index
     of the log of that particular date in the dataObj*/

  dates[data[0]["date"]] =[0,2];
  for(let i = 1; i < data.length; i++) {
    if(data[i]["date"] in dates)
      continue;
    else {
      dates[data[i]["date"]] = [i,i+1];
      dates[data[i-1]["date"]][1] = i-1;
    }
  }
  dates[data[data.length-1]["date"]][1] = data.length - 1;
  console.log(dates);
});

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/logs', (req,res) => {

  res.set({
      'Content-Type' : 'application/json',
      'charset' : 'utf-8'
  });

  let obj = [req.query['fromDate'],req.query['toDate']];
  obj = [dateVerify.parse(obj[0],'/'), dateVerify.parse(obj[1],'/')];

  if(dateVerify.check(obj[0]) && dateVerify.check(obj[1])) {

    let ans = extract(dates, obj[0], obj[1]) //stores the min and max value of indexes

    if(ans[0]===Infinity || ans[1]===-1) {
      res.send("No Logs found");
    }
    else {
    res.send(JSON.stringify(dataObj.slice(ans[0],ans[1]+1),null," "));
    }
  }
  else {
    res.status(400).send("Please enter date in correct format, i.e. dd/mm/yyyy");
  }
});

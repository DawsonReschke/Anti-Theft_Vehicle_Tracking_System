const fs = require('fs')
const FILE = './server/data/seeds/waypoints.json'

let data = fs.readFileSync(FILE); 

data = data.toString().split('\n').map(val => {
    if(!val.includes('time')) return val; 
    let time = val.split(':')[1]
    time = new Date(Number(time)).toISOString(); 
    return `            "time":"${time}"\r`
})
// console.log(data)

fs.writeFileSync(FILE,data.join('\n')); 
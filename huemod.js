module.exports.get_list = get_list

const http = require('http')
const key = 'tUt2aaOvOJsT4KOoybz0-8CyG14ZRULG1kGxUHpd'
const ip = '192.168.86.237'
const url = `http://${ip}/api/${key}/lights`

function get_list(url) {
    return new Promise(function(resolve,reject) {
        var req = http.get(url, res => { 
            var body = ''
            res.on('data', d => { body += d; });
            res.on('end', () =>{ resolve(JSON.parse(body)) });
        })
        req.on('error', e => { reject(e) });
    })
}

if (!module.parent) { 
    
    get_list(url).then( data => {
        console.log('Got list:',data);
    })
    
} else { console.log("I am a hue orphan") }

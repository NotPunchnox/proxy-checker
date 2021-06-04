const proxycheck = require('../main.js')

let config = {
    type: 'http',
    url: 'https://discord.com/register',
    file: 'file.txt'
}

let l = require('fs').readFileSync('./proxy.txt', 'utf-8').replace(/\r|\"/gi, '').split("\n")
l.forEach(a => {
    proxycheck.check({
        url: config.url,
        type: config.type,
        proxy: a
    }).then(r => {
        if (r.code !== 200) {
            console.info(`\x1b[31mProxy: ${r.proxy}, type: ${r.type}, status: ${r.code} => invalid.\x1b[0m`)
        } else if (r.code == 200) {
            require('fs').appendFileSync(config.file, a + '\n')
            console.info(`\x1b[32mProxy: ${r.proxy}, type: ${r.type}, status: ${r.code} => valid.\x1b[0m`)
        }
    }).catch(e => {
        console.error(e)
        process.exit()
    })
})

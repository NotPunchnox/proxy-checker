var check = function ({
    url: z,
    type: t,
    proxy: p
}) {

    if(!z) throw new Error('Missing url!')
    if(!t) throw new Error('Missing type!')
    if(!p) throw new Error('Missing proxy!')

    x = ['http', 'https', 'socks4', 'socks5']

    if(!x.includes(t)) throw new Error('The type does not exist')

    return new Promise((resolve) => {
        const r = require('request')
        r.get(z, {
            proxy: String(t + '://' + p)
        }, (err, res) => {
            if (err) resolve({
                proxy: String(t + '://' + p),
                code: 500,
                type: t,
                err: err
            })
            if(!res) return;
            if (res.statusCode == 200) resolve({
                proxy: String(t + '://' + p),
                type: t,
                code: res.statusCode
            })
        })
    })
}
module.exports = {
    check: check
}
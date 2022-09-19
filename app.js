const querystring = require('node:querystring')
const crypto = require('node:crypto');

module.exports.requestHooks = [
    context => {
        const mustSendSign = context.request.getEnvironmentVariable('must_send_md5_sign')

        if (!mustSendSign) {
            return
        }

        const secretKey = context.request.getEnvironmentVariable('md5_sign_secret_key')
        const requestBody = context.request.getBody()
        let parameters = {}

        if (requestBody.mimeType === 'application/json') {
            parameters = JSON.parse(requestBody.text)
        }

        if (context.request.getMethod().toUpperCase() === 'GET') {
            parameters = context.request.getParameters().reduce((accumulator, parameter) => {
                accumulator[parameter['name']] = parameter['value']

                return accumulator
            }, {})
        }

        delete parameters['sign']
        delete parameters['lang']

        const orderedParameters = Object.keys(parameters).sort().reduce(
            (ordered, key) => {
                ordered[key] = parameters[key]

                return ordered
            }, {}
        )

        const mustUrlEncode = context.request.getEnvironmentVariable('md5_sign_must_url_encode')
        let preSignString = querystring.encode(orderedParameters)

        if (!mustUrlEncode) {
            preSignString = querystring.unescape(preSignString)
        }

        parameters['sign'] = crypto.createHash('md5').update(
            preSignString + `&secret_key=${secretKey}`,
            'utf8'
        ).digest('hex')

        if (context.request.getMethod().toUpperCase() === 'GET') {
            context.request.addParameter('sign', parameters['sign'])
        } else {
            context.request.setBody({
                mimeType: 'application/json',
                text: JSON.stringify(parameters),
            })
        }
    }
]

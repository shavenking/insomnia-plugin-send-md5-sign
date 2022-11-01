const querystring = require('node:querystring')
const crypto = require('node:crypto');

module.exports.templateTags = [{
    name: 'generateMD5Sign',
    displayName: 'MD5 sign generator',
    description: 'Generate md5 sign',
    args: [
        {
            displayName: 'key',
            type: 'string',
            placeholder: 'MwIwn0G1G96zZIsZMKpKeJr728kxGHjAvFzQX93IdncleEmhikNGgoqIuS6H'
        },
        {
            displayName: 'excludeParameters',
            type: 'string',
            placeholder: 'param1,param2,param3...',
            defaultValue: 'lang,sign'
        },
        {
            displayName: 'needUrlEncode',
            type: 'boolean',
            defaultValue: true
        }
    ],
    async run (ctx, key, excludeParameters, needUrlEncode) {
        // ctx 裡面沒有 request
        console.log(Object.keys(ctx))
        console.log(Object.keys(ctx.context))
        console.log(Object.keys(ctx.app))
        // const requestBody = context.request.getBody()
        // let parameters = {}

        // if (requestBody.mimeType === 'application/json') {
        //     parameters = JSON.parse(requestBody.text)
        // }
        // console.log(excludeParameters.split(','))

        // if (context.request.getMethod().toUpperCase() === 'GET') {
        //     parameters = context.request.getParameters().reduce((accumulator, parameter) => {
        //         accumulator[parameter['name']] = parameter['value']
        //
        //         return accumulator
        //     }, {})
        // }

        return '123'
    }
}];
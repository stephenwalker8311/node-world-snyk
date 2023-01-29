
import { post } from 'express'
import { json } from 'body-parser'
var jsonParser = json()

post('/api/users', jsonParser, function (req, res) {

})


/* Respond with successful resource creation, CORS enabled
let arc = require('@architect/functions')
exports.handler = arc.http.async (http)
async function http (req) {
  return {
    statusCode: 201,
    json: { ok: true },
    cors: true,
  }
}
*/

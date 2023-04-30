
'use strict'
const { v4: uuidv4 } = require('uuid')

const requestBody = {
	context: {
		domain: process.env.DOMAIN,
		country: process.env.COUNTRY,
		city: process.env.CITY,
		action: 'temp',
		bap_id: process.env.BAP_ID,
		bap_uri: process.env.BAP_URI,
		timestamp: new Date().toISOString(),
		message_id: uuidv4(),
		core_version: '1.0.0',
		ttl: 'PT1S',
	},
	message: {},
}

exports.requestBodyGenerator = (api, body, transactionId, messageId) => {
	requestBody.context.transaction_id = transactionId
	requestBody.context.message_id = messageId
	if (api === 'bg_search') {
		requestBody.context.action = 'search'
		requestBody.message = {
			intent: body.intent,
		}
	}  else if (api === 'bpp_select') {
		requestBody.context.action = 'select'
		requestBody.message = {
			order: {
              provider: {
                    id: body.providerId
                },
                fulfillments: body.fulfillmentIds,
                items: [ {id: body.itemId} ]
			},
		}
	}  
	return requestBody
}
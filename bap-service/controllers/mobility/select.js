'use strict'
const requester = require('../../utils/requester')
const { requestBodyGenerator } = require('../../utils/requestBodyGenerator')
const { v4: uuidv4 } = require('uuid')
const io = require('../../index')

exports.select = async (req, res) => {
    console.log(JSON.stringify(req.body))
	try {
		const transactionId = req.body.transaction_id
		const messageId = uuidv4()
		const bppUri = req.body.bpp_uri
		const providerId = req.body.provider_id
		const itemId = req.body.item_id
        const fulfillmentIds = req.body.fulfillment_ids || []
        console.log(req.body)
		await requester.postRequest(
			bppUri + '/select',
			{},
			requestBodyGenerator('bpp_select', { providerId, fulfillmentIds, itemId }, transactionId, messageId),
			{ shouldSign: true }
		)
		res.send("done");
	} catch (err) {
		console.log(err)
		res.status(400).send({ status: false })
	}
}

exports.onSelect = async  (req, res) => {
    console.log(JSON.stringify(req.body))
    try {
        var result = {}
        const message = req.body.responses[0].message
        const context = req.body.responses[0].context
        result = {
            data : {
                form: {
                    data: message.items[0].xinput.form.url,
                    name: message.items[0].descriptor.name,
                    id: message.items[0].id,
                },
                context: {
                    ...context,
                    provider: message.order.provider,
                    items: message.items,
                },
            }
        }
        console.log(JSON.stringify(result))
        io.emit("onSelect", result);
        res.send("done")
    } catch (e) {
        console.log(e)
        res.send("error")
    }
}

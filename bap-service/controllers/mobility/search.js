'use strict'
const requester = require('../../utils/requester')
const { requestBodyGenerator } = require('../../utils/requestBodyGenerator')
const { searchBuilder } = require('../../utils/searchBuilder')
const { v4: uuidv4 } = require('uuid')
const io = require('../../index')
const { select } = require('../mobility/select')

exports.search = async (req, res) => {
	try {
		const transactionId = uuidv4()
		const messageId = uuidv4()
		const intent = searchBuilder(req)
        // console.log(JSON.stringify(intent))
		await requester.postRequest(
			process.env.BECKN_BG_URI + '/search',
			{},
			requestBodyGenerator('bg_search', { intent: intent }, transactionId, messageId),
			{ shouldSign: true }
		)
		res.send("done");
	} catch (err) {
		console.log(err)
		res.status(400).send({ status: false })
	}
}

exports.onSearch = async (req, res) => {
    try {
        var result = {}
        const provider = req.body.responses[0].message.catalog.providers
        const context = req.body.responses[0].context 
        result = {
            response : {
                ...provider[0],
                context: context,
            }
        }
        console.log(result)
        select(req, res)
        res.send("done")
    } catch (e) {
        console.log(e)
        res.send("error")
    }
}

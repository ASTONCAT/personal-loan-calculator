import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../../util/mongodb'

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const {
			docId,
			minAmount,
			maxAmount,
			reqAmount,
			minTerm,
			maxTerm,
			reqTerm,
			interestRate,
			insurance,
			insuranceAmount,
			arrangingFee
		} = req.body

		if (minAmount > 0 && minAmount < 67108864) {
			if (maxAmount > minAmount + 99 && maxAmount < 67108864) {
				if (reqAmount >= minAmount && reqAmount <= maxAmount) {
					if (minTerm >= 1 && minTerm <= 2400) {
						if (maxTerm > minTerm && maxTerm <= 2400) {
							if (reqTerm >= minTerm && reqTerm <= maxTerm) {
								if (insuranceAmount >= 0 && insuranceAmount <= 9999999) {
									if (arrangingFee >= 0 && arrangingFee <= 9999999) {
										if (interestRate >= 0 && interestRate <= 1) {
											const { db } = await connectToDatabase()

											// Update Setup document with the given id
											await db.collection('initialvalues').updateOne(
												{ _id: ObjectId(docId) },
												{
													$set: {
														minAmount,
														maxAmount,
														reqAmount,
														minTerm,
														maxTerm,
														reqTerm,
														insurance,
														insuranceAmount,
														arrangingFee,
														interestRate
													}
												}
											)
											// Send a response
											res.status(201).json({
												error: false,
												message:
													'A new setup inserted. Changes will take effect after a few minutes'
											})

											// interestRate
										} else {
											res.status(412).json({
												error: true,
												message:
													'The Interest Rate must be at least zero and less than 1'
											})
										}
										// arrangingFee
									} else {
										res.status(412).json({
											error: true,
											message:
												'The Arranging Fee must be at least zero and less than 10000000'
										})
									}
									// insuranceAmount
								} else {
									res.status(412).json({
										error: true,
										message:
											'The Insurance Amount must be at least zero and less than 10000000'
									})
								}
								// regTerm
							} else {
								res.status(412).json({
									error: true,
									message:
										'The Requested Term must be at least the same as the Min Term and less than or equal to the Max Term'
								})
							}
							// maxTerm
						} else {
							res.status(412).json({
								error: true,
								message:
									'The Max Term must be greater than the Min Term and at most 2400'
							})
						}
						// minTerm
					} else {
						res.status(412).json({
							error: true,
							message: 'The Min Term must be at least one and at most 2400'
						})
					}
					// reqAmount
				} else {
					res.status(412).json({
						error: true,
						message:
							'The Requested Amount must be at least the same as the Min Amount and less than or equal to the Max Amount'
					})
				}
			} else {
				res.status(412).json({
					error: true,
					message:
						'The Max Amount must be at least 100 greater than the Min Amount and less than 67108864'
				})
			}
		} else {
			res.status(412).json({
				error: true,
				message:
					'The Min Amount must be greater than zero and less than 67108864'
			})
		}
	} else {
		res.status(405).json({
			error: true,
			message: 'Method Not Allowed!'
		})
	}
}

export default handler

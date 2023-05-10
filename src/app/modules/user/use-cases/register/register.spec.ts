import { expect, test } from 'vitest'
import { UCRegisterUser } from '.'
import { ErrorGeneral } from '../../../../util/error'

test('UC Register - User: Correct', async () => {
	const body = {
		name: 'Dan',
		email: 'dan@gmail.com',
	}

	const res = await UCRegisterUser(body)

	expect(res.status).toEqual(200)
	expect(res.data.error).toEqual(undefined)
})

test('UC Register - User: Invalid data', async () => {
	const body1 = {
		name: 'Dan',
		email: 'dan@gmail.com',
	}

	const res1 = await UCRegisterUser(body1)

	expect(res1.data.error).toEqual(undefined)

	const body2 = {
		name: 'Dan',
		email: 'dangmail.com',
	}

	const res2 = await UCRegisterUser(body2)

	expect(res2.data.error).instanceOf(ErrorGeneral)
	expect(res2.data.error.message[0].origin).toEqual('email')
})
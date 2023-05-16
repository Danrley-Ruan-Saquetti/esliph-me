import { db } from '@database'
import { IUser, IUserDataRequest } from '@module/user/schema'
import { ErrorGeneral } from '@util/error'

export type TCreateUserData = { user?: IUser; error?: ErrorGeneral }

export async function MCreateUser({ email, username, age, password }: IUserDataRequest) {
    const response: TCreateUserData = await db.user
        .create({ data: { email, username, age, password } })
        .then((res: IUser) => {
            return { user: res }
        })
        .catch((err) => {
            return { error: new ErrorGeneral({ title: 'Register User', message: [{ message: 'Cannot register user', origin: 'users' }], status: 400 }) }
        })

    return response
}
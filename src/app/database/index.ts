import { PrismaClient, User as TModelUser } from '@prisma/client'
import { dbMemory } from './memory'
import { getEnv } from '@util/var-env'

const db = new PrismaClient({ log: getEnv({ name: 'ENVIRONMENT', default: 'DEVELOPMENT' }) != 'DEVELOPMENT' ? [] : [{ level: 'query', emit: 'event' }, 'info', 'warn', 'error'] }) || dbMemory

async function main() {
    try {
        if (db instanceof PrismaClient) {
            await db.$connect()
            console.log('[Database] Database connected successfully')

            if (getEnv({ name: 'ENVIRONMENT', default: 'DEVELOPMENT' }) == 'DEVELOPMENT') {
                db.$on('query', (e) => {
                    console.log(`Query: ${e.query}`)
                    console.log(`Params: ${e.params}`)
                    console.log(`Duration: ${e.duration}ms`)
                })
            }
        } else {
            // db.model('user')
            console.log('[Database] Database memory connected successfully')
        }
    } catch (err: any) {
        console.error('[Database] Database connection failed')
        throw new Error(err)
    }
}

main()

export { db, TModelUser }

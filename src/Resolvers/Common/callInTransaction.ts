import { Sequelize, Transaction } from "sequelize";
import { logger, sequelize } from "../..";

export async function callInTransaction(callingFunction: (t: Transaction) => Promise<any>, options?: { sequelizeInstance?: Sequelize }) {
    let t: Transaction
    let sequelizeInstance = options?.sequelizeInstance ?? sequelize
    try {
        t = await sequelizeInstance.transaction()
        return callingFunction(t)
    }
    catch (error) {
        if (t)
            await t.rollback()
        logger.error(error)
        throw error
    }
}
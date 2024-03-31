import { Sequelize } from "sequelize";
import { logger } from "../..";

export async function callFunction(callingFunction: () => Promise<any>) {
    try {
        return callingFunction()
    }
    catch (error) {
        logger.error(error)
        throw error
    }
}
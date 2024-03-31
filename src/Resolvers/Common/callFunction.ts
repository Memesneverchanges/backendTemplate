import { Sequelize } from "sequelize";
import { Logger } from "../..";

export async function callFunction(callingFunction: () => Promise<any>) {
    try {
        return callingFunction()
    }
    catch (error) {
        Logger.error(error)
        throw error
    }
}
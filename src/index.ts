import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import bodyParser from "body-parser"
import express from "express"
import { createServer } from 'http'
import cors from 'cors';
import { hostname } from 'os'
import fs from 'fs'
import { Resolvers } from "./Resolvers"
import { Sequelize } from "sequelize"
import log4js from "log4js"
import { graphQLModelNameParser } from "./Middlewares/graphQLModelNameParser"
import { logger } from "./config/config.js"

const app = express()

const httpServer = createServer(app)

log4js.configure(logger)

export const Logger = log4js.getLogger()

export const sequelize = new Sequelize({ dialect: 'mysql', logging: (msg: string) => logger.info(msg) })

// app.use((req,res,next)=>{
//     console.log(req)
//     console.log(res)
//     next()
// })

const apolloServer = new ApolloServer({
    typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
    resolvers: Resolvers,
    logger: Logger,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

apolloServer.start().then(() => {
    app.use(
        cors(),
        bodyParser.json(),
        graphQLModelNameParser,
        expressMiddleware(apolloServer),

    );
    httpServer.listen(3000, () => {
        console.log(`🚀 Server ready at http://${hostname()}:3100/graphql`)
        Logger.info(`🚀 Server ready at http://${hostname()}:3100/graphql`)
    })
})
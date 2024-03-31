import { IResolvers } from '@graphql-tools/utils'

export const QueryResolvers:IResolvers = {
    Query: {
        TestQuery: async (_, { }, { req, res }, info) => {

            return 'sre'
        }
    }
}
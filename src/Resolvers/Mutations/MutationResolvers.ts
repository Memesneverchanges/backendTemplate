import { IResolvers } from '@graphql-tools/utils'

export const MutationResolvers: IResolvers = {
    Mutation: {
        TestMutation: async (_, { }, { req, res }, info) => {
            return 'sre'
        }
    }
}
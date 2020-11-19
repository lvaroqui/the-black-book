import { Resolvers } from '../generated/graphql';
import getUserRepository from '../repository/UserRepository';

const UserResolver: Resolvers = {
  Query: {
    me: () =>
      getUserRepository().findOne({
        select: ['id', 'email', 'username'],
      })
  },
};

export default UserResolver;

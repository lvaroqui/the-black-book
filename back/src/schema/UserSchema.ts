import { gql } from 'apollo-server-express';

const User = gql`
  type User {
    id: Int!
    email: String!
    username: String!
  }

  type Query {
    me: User
  }
`;

export default User;

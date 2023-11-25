import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const typeDefs = `
  type User {
    id: ID!
    username: String!
  }

  type Query {
    me: User
  }
`;

const resolvers = {
  Query: {
    me: (parent, args, context) => {
      return context.user;
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();

app.use("/graphql", apolloMiddleware(apolloServer));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});

import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import connectMongodb from './dbConnection/mongoDB'

@Resolver()
class HelloResolver {
  @Query(() => String)
  // Teste
  async helloWorld() {
    return "Hello World!";
  }
}

const main = async () => {
  connectMongodb();
  const schema = await buildSchema({
    resolvers: [HelloResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main();
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import * as path from 'path';
import { buildSchema, emitSchemaDefinitionFileSync, Query } from 'type-graphql';
import { init } from './typeorm';
import { UserResolver } from './user-resolver';

async function bootstrap() {
  init();
  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [UserResolver],
    // automatically create `schema.gql` file with schema definition in current folder
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });
  // emitSchemaDefinitionFileSync(path.resolve(__dirname, 'schema.gql'), schema);
  // Create GraphQL server
  const server = new ApolloServer({
    schema,
    // enable GraphQL Playground
    playground: {
      tabs: [
        {
          endpoint: `http://localhost:4000`,
          query: `# # Write your query or mutation here
          # query{
          #   user(id:1){
          #     id
          #     age
          #   }
          #   users{
          #     id
          #     age
          #   }
          # }
          mutation {
            addUser(user: { age: 5, firstname: "f2", lastname: "l2" }) {
              id
              firstname
              lastname
              age
            }
            # updateUser(user:{id:1,firstname:"fir",lastname:"123"}){
            #   id
            #   firstname
            #   lastname
            # }
          }
          `,
        },
      ],
    },

    // mockEntireSchema: true,
  });

  // Start the server
  const { url } = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();

import { Field, ObjectType, Int, Float } from 'type-graphql';

@ObjectType({ description: 'Object representing an user' })
export class User {
  @Field()
  id: number;

  @Field({
    nullable: true,
    description: 'user firstname',
  })
  firstname: string;

  @Field({
    nullable: true,
  })
  lastname: string;

  @Field({
    nullable: true,
  })
  age: number;
}

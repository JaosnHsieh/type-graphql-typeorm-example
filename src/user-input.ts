import { User } from './user-type';
import { InputType, Field } from 'type-graphql';

@InputType()
export class AddUserInput implements Partial<User> {
  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  age?: number;
}

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  age?: number;
}

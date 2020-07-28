import {
  Resolver,
  Query,
  FieldResolver,
  Arg,
  Root,
  Mutation,
  Float,
  Int,
  ResolverInterface,
} from 'type-graphql';
import { plainToClass } from 'class-transformer';

import { User } from './user-type';
import { AddUserInput, UpdateUserInput } from './user-input';
// import { createRecipeSamples } from './recipe-samples';
import { User as UserModel } from './entity/User';

@Resolver((of) => User)
export class UserResolver {
  // private readonly items: User[] = createRecipeSamples();
  @Query((returns) => User, { nullable: true })
  async user(@Arg('id') id: number): Promise<User | undefined> {
    const user = await UserModel.findOne(id);
    return {
      id: user.id,
      age: user.age,
      firstname: user.firstName,
      lastname: user.lastName,
    };
  }
  @Query((returns) => [User], {
    description: 'Get all the users',
  })
  async users(): Promise<User[]> {
    const users = await UserModel.find();
    return users.map((u) => ({
      id: u.id,
      age: u.age,
      firstname: u.firstName,
      lastname: u.lastName,
    }));
  }

  @Mutation((returns) => User)
  async addUser(@Arg('user') addUserInput: AddUserInput): Promise<User> {
    const user = new UserModel();
    user.firstName = addUserInput.firstname;
    user.lastName = addUserInput?.lastname;
    user.age = addUserInput.age;
    await user.save();

    return {
      id: user.id,
      firstname: user.firstName,
      lastname: user.lastName,
      age: user.age,
    };
  }

  @Mutation((returns) => User)
  async updateUser(
    @Arg('user') updateUserInput: UpdateUserInput,
  ): Promise<User | null> {
    const user = await UserModel.findOne(updateUserInput.id);
    if (!user) {
      return null;
    }
    if (updateUserInput?.firstname) {
      user.firstName = updateUserInput.firstname;
    }
    if (updateUserInput?.lastname) {
      user.lastName = updateUserInput.lastname;
    }
    if (updateUserInput?.age) {
      user.age = updateUserInput.age;
    }

    return {
      id: user.id,
      firstname: user.firstName,
      age: user.age,
      lastname: user.lastName,
    };
  }
  // @FieldResolver()
  // ratingsCount(
  //   @Root() recipe: Recipe,
  //   @Arg('minRate', (type) => Int, { defaultValue: 0.0 }) minRate: number,
  // ): number {
  //   return recipe.ratings.filter((rating) => rating >= minRate).length;
  // }
}

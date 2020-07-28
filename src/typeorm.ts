import { createConnection } from 'typeorm';
import { User } from './entity/User';

export const init = () =>
  createConnection({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [User],
    synchronize: true,
    logging: false,
  })
    .then(async (connection) => {
      console.log('database connected');
      console.log('Inserting a new user into the database...');
      const user = new User();
      user.firstName = 'Timber';
      user.lastName = 'Saw';
      user.age = 25;
      await user.save();
      console.log('Saved a new user with id: ' + user.id);

      //   console.log('Loading users from the database...');
      //   const users = await connection.manager.find(User);
      //   console.log('Loaded users: ', users);

      //   console.log('Here you can setup and run express/koa/any other framework.');
    })
    .catch((error) => console.log(error));

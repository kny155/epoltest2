import uuid from 'uuid/v1';

import usersDB from '../db/users';
import { validUser } from './valid';

const crud = {
  getAll: async () => {
    return usersDB;
  },
  get: async id => {
    const user = await usersDB.find(user => user.id === id);
    return user;
  },
  create: async user => {
    const valid = await validUser(user);

    if (valid.success) {
      const id = uuid();
      const { firstName, lastName, email, organizationName } = user;
      usersDB.push({
        id,
        firstName,
        lastName,
        email,
        organizationName,
      });

      return {
        user: await crud.get(id),
        ...valid,
      };
    } else {
      return valid;
    }
  },
  update: async (id, newUser) => {
    const userIndex = usersDB.findIndex(user => user.id === id);

    if (~userIndex) {
      usersDB[userIndex] = {
        ...usersDB[userIndex],
        ...newUser,
      };
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: 'Нет такого пользователя',
      };
    }
  },
  delete: async id => {
    const userIndex = usersDB.findIndex(user => user.id === id);

    if (~userIndex) {
      usersDB.splice(userIndex, 1);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: 'Нет такого пользователя',
      };
    }
  },
};

export default crud;

import { v4 } from 'uuid';

class User {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Return fields of class User 
   * @param task class User object 
   * @returns class with User fields 
   */
  static toResponse(user: { id: string, name: string, login: string }) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;

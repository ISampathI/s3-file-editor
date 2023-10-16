import { Injectable, UnauthorizedException } from '@nestjs/common';

const users = [
  {
    username: 'sampath',
    password: '123',
  },
];

@Injectable()
export class UserService {
  async getUser(username: string, password: string): Promise<any> {
    console.log(users, username, password);
    
    return await users.find(
      (user) => user.username === username && user.password === password,
    );
  }
}

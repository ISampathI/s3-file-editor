import { Injectable, UnauthorizedException } from '@nestjs/common';

const users = [
  {
    username: 'user',
    password: '123',
  },
];

@Injectable()
export class UserService {
  async getUser(username: string, password: string): Promise<any> {
    return await users.find(
      (user) => user.username === username && user.password === password,
    );
  }
}

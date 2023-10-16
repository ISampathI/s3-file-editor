import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(username: string, password: string) {
    const user = await this.userService.getUser(username, password);
    console.log(user, username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      return {
        user: {
          username: user.username,
        },
      };
    }
  }
}

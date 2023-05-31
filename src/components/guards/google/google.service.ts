import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleService {
  googleLogin(req) {
    const user = req.user.user._json;

    return {
      message: 'User information from google',
      user: user,
    };
  }
}

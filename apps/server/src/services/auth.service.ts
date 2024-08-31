import { BadRequestError, ReadError } from '@e_commerce_package/errors';
import {
  SafeUserSelect,
  UserInsert,
  UserSelect
} from '@e_commerce_package/models/types';
import UserService from './user.service';
import { UserService as BaseUserService } from '@e_commerce_package/models/services';

class AuthService {
  public static async signUp(
    data: UserInsert
  ): Promise<{ user: SafeUserSelect }> {
    const existingUser = await UserService.findOne({
      email: data.email
    }).catch((e) => {
      if (e instanceof ReadError) return null;
      throw e;
    });

    if (existingUser) {
      throw new BadRequestError('User Already Exists');
    }

    const { password, ...user } = await UserService.createOne(data);

    return { user };
  }

  public static async signIn(
    data: Pick<UserInsert, 'email' | 'password'>
  ): Promise<UserSelect> {
    const { email, password } = data;
    const user = await UserService.findOne({
      email
    });

    await BaseUserService.comparePassword(password, user.password);

    return user;
  }

  public static async changePassword(
    data: Pick<UserInsert, 'email'> & {
      password: string;
    }
  ): Promise<SafeUserSelect> {
    const { email, password: pw } = data;
    const { password, ...user } = await UserService.updateOne(email, {
      password: pw
    });

    return user;
  }
}

export default AuthService;

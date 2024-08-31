import { randomBytes } from 'crypto';
import { BadRequestError, ReadError } from '@e_commerce_package/errors';
import {
  SafeUserSelect,
  UserInsert,
  UserSelect
} from '@e_commerce_package/models/types';
import UserService from './user.service';
import bcrypt from 'bcrypt';

class AuthService {
  public static async signUp(data: {
    user: UserInsert;
  }): Promise<{ user: SafeUserSelect }> {
    const { user: userData } = data;

    const existingUser = await UserService.findOne({
      email: userData.email
    }).catch((e) => {
      if (e instanceof ReadError) return null;
      throw e;
    });

    if (existingUser) {
      throw new BadRequestError('User Already Exists');
    }

    const { password, ...user } = await UserService.createOne(userData);

    return { user };
  }

  public static async signIn(
    data: Pick<UserInsert, 'email' | 'password'>
  ): Promise<UserSelect> {
    const { email, password } = data;
    const user = await UserService.findOne({
      email
    });

    await this.comparePassword(password, user.password);

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

  static async generateTempPassword(length: number): Promise<string> {
    return randomBytes(length).toString('hex').slice(0, length);
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  }

  static async comparePassword(password: string, hash: string): Promise<void> {
    const doesPasswordMatch = await bcrypt.compare(password, hash);
    if (!doesPasswordMatch) {
      throw new BadRequestError('Wrong Password');
    }
  }
}

export default AuthService;

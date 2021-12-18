import { Request, Response } from 'express';
import { users as UserModel } from '@prisma/client';

import UsersService from '../services/UsersService';
import ResponseError from '../shared/errors/ResponseError';
import { verifyHash } from '../shared/utils/hash';
import { getToken } from '../shared/utils/jwt';
import { filterDataWithKeys, validate } from '../shared/utils/validate';
import { UserCreated } from '../shared/types/user';

class UsersController {
  private usersService;

  constructor() {
    this.usersService = new UsersService();
  }

  show = async (req: Request, res: Response) => {
    const { id } = req.auth;

    const user: UserCreated | null = await this.usersService.findUser({ id });

    if (!user) {
      throw new ResponseError('User not found', 404);
    }

    const userScore = this.usersService.calculateScore(user);

    return res.json({
      success: true,
      data: {
        ...user,
        score: userScore,
      },
    });
  };

  store = async (req: Request, res: Response) => {
    validate(req.body, ['email', 'password', 'name'], 'body');
    const userData = filterDataWithKeys(req.body, ['email', 'password', 'name']) as UserModel;

    const user: UserCreated | null = await this.usersService.create(userData);

    if (!user) {
      throw new ResponseError('User with this email already exists', 400);
    }

    return res.status(201).json({
      success: true,
      data: user,
    });
  };

  login = async (req: Request, res: Response) => {
    validate(req.body, ['email', 'password'], 'body');

    const { email, password } = req.body;

    const user: UserCreated | null = await this.usersService.findUser(
      {
        email,
      },
      true,
    );

    if (!user || !user.password) {
      throw new ResponseError('User not found', 404);
    }

    const isVerified = verifyHash(password, user.password);

    if (!isVerified) {
      throw new ResponseError('Wrong password', 401);
    }

    const token = getToken({
      email: user.email,
      id: user.id,
      uuid: user.uuid,
    });

    return res.json({
      success: true,
      data: {
        token,
      },
    });
  };
}

export default UsersController;

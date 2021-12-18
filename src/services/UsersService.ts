import { PrismaClient, users as UserModel, lessons as LessonData } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { UserCreated, UserSearch, UserData } from '../shared/types/user';
import { hash } from '../shared/utils/hash';

class UsersService {
  private users;

  constructor() {
    const prisma = new PrismaClient();

    this.users = prisma.users;
  }

  findUser = async (
    userSearch: UserSearch,
    getPassword: boolean = false,
  ): Promise<UserModel | null> => {
    return this.users.findFirst({
      where: userSearch,
      select: {
        id: true,
        uuid: true,
        email: true,
        name: true,
        lessons: true,
        password: getPassword,
      },
    });
  };

  create = async (userData: UserModel): Promise<UserCreated | null> => {
    const userExists = await this.findUser({
      email: userData.email,
    });

    if (userExists) {
      return null;
    }

    return this.users.create({
      data: {
        email: userData.email,
        password: hash(userData.password),
        name: userData.name,
        uuid: uuid(),
      },
      select: {
        id: true,
        uuid: true,
        email: true,
        name: true,
      },
    });
  };

  calculateScore = (user: UserData): number => {
    const score = user.lessons
      ?.map((lesson: LessonData) => {
        let lessonScore = 1;

        if (lesson.likes) {
          lessonScore += lesson.likes * 5;
        }

        return lessonScore;
      })
      .reduce((previous, current) => previous + current);

    return score ? score : 0;
  };
}

export default UsersService;

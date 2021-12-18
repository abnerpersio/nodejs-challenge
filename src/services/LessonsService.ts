import { PrismaClient, lessons as LessonModel } from '@prisma/client';

class LessonsService {
  private lessons;

  constructor() {
    const prisma = new PrismaClient();

    this.lessons = prisma.lessons;
  }

  findAllFromUser = async ({ user_uuid }: { user_uuid: string }): Promise<LessonModel[] | null> => {
    return this.lessons.findMany({
      where: {
        user_uuid,
      },
    });
  };

  findAll = async (): Promise<LessonModel[] | null> => {
    return this.lessons.findMany();
  };

  findLesson = async (lessonSearch: { id: number }): Promise<LessonModel | null> => {
    return this.lessons.findFirst({
      where: {
        id: lessonSearch.id,
      },
    });
  };

  findLessonByUser = async (lessonSearch: {
    id: number;
    user_uuid: string;
    email: string;
  }): Promise<LessonModel | null> => {
    return this.lessons.findFirst({
      where: {
        id: lessonSearch.id,
        AND: {
          user_uuid: lessonSearch.user_uuid,
          AND: {
            users: {
              email: lessonSearch.email,
            },
          },
        },
      },
      select: {
        id: true,
        user_uuid: true,
        video_url: true,
        name: true,
        likes: true,
        users: {
          select: {
            id: true,
            uuid: true,
            email: true,
          },
        },
      },
    });
  };

  create = async (lessonData: LessonModel): Promise<LessonModel> => {
    return this.lessons.create({
      data: lessonData,
    });
  };

  update = async (id: number, lessonData: LessonModel): Promise<LessonModel> => {
    return this.lessons.update({
      where: {
        id,
      },
      data: lessonData,
    });
  };

  delete = async (id: number): Promise<any> => {
    return this.lessons.delete({
      where: {
        id,
      },
    });
  };
}

export default LessonsService;

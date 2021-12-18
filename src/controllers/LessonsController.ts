import { Request, Response } from 'express';
import { lessons as LessonModel } from '@prisma/client';

import LessonsService from '../services/LessonsService';
import { filterDataWithKeys, validate } from '../shared/utils/validate';
import ResponseError from '../shared/errors/ResponseError';

class LessonsController {
  private lessonsService;

  constructor() {
    this.lessonsService = new LessonsService();
  }

  index = async (_req: Request, res: Response) => {
    const lessons = await this.lessonsService.findAll();

    return res.json({
      success: true,
      data: lessons,
    });
  };

  show = async (req: Request, res: Response) => {
    const { uuid: searchUuid } = req.query;
    const { uuid } = req.auth;

    const lessons = await this.lessonsService.findAllFromUser({ user_uuid: searchUuid ?? uuid });

    return res.json({
      success: true,
      data: lessons,
    });
  };

  get = async (req: Request, res: Response) => {
    const { email, uuid } = req.auth;
    const id = Number(req.params.id);

    const lesson: LessonModel | null = await this.lessonsService.findLessonByUser({
      id,
      email,
      user_uuid: uuid,
    });

    return res.json({
      success: true,
      data: lesson,
    });
  };

  store = async (req: Request, res: Response) => {
    validate(req.body, ['name'], 'body');
    const lessonData = filterDataWithKeys(req.body, ['name', 'video_url']) as LessonModel;

    const { uuid } = req.auth;

    const lesson: LessonModel = await this.lessonsService.create({
      ...lessonData,
      user_uuid: uuid,
    });

    return res.status(201).json({
      success: true,
      data: lesson,
    });
  };

  update = async (req: Request, res: Response) => {
    const { email, uuid } = req.auth;
    const id = Number(req.params.id);

    if (!id) {
      throw new ResponseError('Id is required for update', 400);
    }

    const lessonData = filterDataWithKeys(req.body, ['name', 'video_url']) as LessonModel;

    const lessonExists: LessonModel | null = await this.lessonsService.findLessonByUser({
      id,
      user_uuid: uuid,
      email,
    });

    if (!lessonExists) {
      throw new ResponseError('You are not allowed to update this lesson', 403);
    }

    const updatedLesson: LessonModel = await this.lessonsService.update(id, lessonData);

    return res.json({
      success: true,
      data: updatedLesson,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { email, uuid } = req.auth;
    const id = Number(req.params.id);

    if (!id) {
      throw new ResponseError('Id is required for update', 400);
    }

    const lessonExists: LessonModel | null = await this.lessonsService.findLessonByUser({
      id,
      user_uuid: uuid,
      email,
    });

    if (!lessonExists) {
      throw new ResponseError('You are not allowed to delete this lesson', 403);
    }

    await this.lessonsService.delete(id);

    return res.status(204).json({
      success: true,
    });
  };

  like = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!id) {
      throw new ResponseError('Id is required for liking', 400);
    }

    const lesson: LessonModel | null = await this.lessonsService.findLesson({ id });

    if (!lesson) {
      throw new ResponseError('Lesson not found', 404);
    }

    const newLikesNumber = Number(lesson.likes) + 1;

    const updatedLesson: LessonModel = await this.lessonsService.update(id, {
      ...lesson,
      likes: newLikesNumber,
    });

    return res.json({
      success: true,
      data: updatedLesson,
    });
  };
}

export default LessonsController;

import { lessons as LessonModel } from '@prisma/client';

export type UserSearch = {
  id?: number;
  name?: string;
  email?: string;
  uuid?: string;
};

export type UserCreated = {
  id: number;
  name: string;
  email: string;
  uuid: string;
  password?: string | null;
};

export type UserData = {
  id: number;
  name: string;
  email: string;
  uuid: string;
  password?: string | null;
  lessons?: LessonModel[];
};

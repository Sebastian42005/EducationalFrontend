import {TeacherDto} from "./TeacherDto";
import {ClassLessonDto} from "./ClassLessonDto";

export interface ClassDto {
  id: number,
  name: string,
  description: string,
  roomCode: number,
  expiresAt: Date,
  teacher: TeacherDto,
  lessons: ClassLessonDto[]
}

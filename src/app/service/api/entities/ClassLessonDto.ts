import {LessonDto} from "./LessonDto";

export interface ClassLessonDto {
  id: number,
  lesson: LessonDto,
  showStudents: boolean
}

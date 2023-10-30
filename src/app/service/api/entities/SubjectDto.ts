import {LessonDto} from "./LessonDto";

export interface SubjectDto {
  id: string;
  name: string;
  lessons: LessonDto[];
}

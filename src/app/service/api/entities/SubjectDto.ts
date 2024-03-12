import {TeacherDto} from "./TeacherDto";
import {LessonDto} from "./LessonDto";

export interface SubjectDto {
  id: number;
  name: string;
  image: ArrayBuffer;
  imageType: string;
  lessons: LessonDto[];
  teachers: TeacherDto[];
}

import {TeacherDto} from "./TeacherDto";

export interface StudentDto {
  id: number;
  teachers: TeacherDto[];
}

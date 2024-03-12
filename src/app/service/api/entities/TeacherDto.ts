import {StudentDto} from "./StudentDto";
import {SubjectDto} from "./SubjectDto";

export interface TeacherDto {
  id: number;
  students: StudentDto[];
  subjects: SubjectDto[];
}

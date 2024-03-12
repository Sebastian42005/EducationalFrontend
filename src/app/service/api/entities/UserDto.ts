import {TeacherDto} from "./TeacherDto";
import {StudentDto} from "./StudentDto";
import {UserRole} from "./UserRole";

export interface UserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  teacher: TeacherDto;
  student: StudentDto;
}

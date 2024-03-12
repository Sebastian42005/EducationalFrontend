import {SubjectDto} from "./SubjectDto";

export interface LessonDto {
  id: number;
  name: string;
  teacherPDFContent: ArrayBuffer;
  teacherPDFContentType: string;
  studentPDFContent: ArrayBuffer;
  studentPDFContentType: string;
  subject: SubjectDto;
}

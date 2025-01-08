import {SubjectDto} from "./SubjectDto";

export interface LessonDto {
    id: number;
    name: string;
    studentPDFName: string;
    teacherPDFName: string;
    subject: SubjectDto;
}

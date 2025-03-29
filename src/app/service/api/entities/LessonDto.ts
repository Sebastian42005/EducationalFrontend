import {SubjectDto} from "./SubjectDto";
import {FileDto} from "./FileDto";

export interface LessonDto {
    id: number;
    name: string;
    description: string;
    files: FileDto[];
    subject: SubjectDto;
}

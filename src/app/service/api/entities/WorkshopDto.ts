import {SubjectDto} from "./SubjectDto";

export interface WorkshopDto {
  id: number;
  subject: SubjectDto;
  date: Date;
  school: string;
  message: string;
}

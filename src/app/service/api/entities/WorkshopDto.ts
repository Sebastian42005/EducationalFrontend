import {SubjectDto} from "./SubjectDto";
import {Message} from "./Message";

export interface WorkshopDto {
  id: number;
  subject: SubjectDto;
  date: Date;
  state: WorkshopState;
  school: string;
  messages: Message[]
}

export enum WorkshopState {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED"
}

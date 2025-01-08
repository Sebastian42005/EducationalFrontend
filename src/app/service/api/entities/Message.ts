import {UserDto} from "./UserDto";

export interface Message {
    id: number
    message: string
    sender: UserDto
    receiver: UserDto
    date: Date
    read: boolean
    type: MessageType
}

export enum MessageType {
    MESSAGE = "MESSAGE",
    READ = "READ",
    WORKSHOP_STATE_CHANGE = "WORKSHOP_STATE_CHANGE"
}

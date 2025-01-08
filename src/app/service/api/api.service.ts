import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {StudentDto} from "./entities/StudentDto";
import {UserDto} from "./entities/UserDto";
import {SubjectDto} from "./entities/SubjectDto";
import {LessonDto} from "./entities/LessonDto";
import {WorkshopDto} from "./entities/WorkshopDto";
import {webSocket} from "rxjs/webSocket";
import {Message} from "./entities/Message";


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private chatSocket = webSocket("ws://localhost:8080/chat")

    constructor(private httpClient: HttpClient) {
    }


    // AuthController Requests
    login(email: string, password: string): Observable<{ token: string, role: string }> {
        return this.post<{ token: string, role: string }>(`/auth/login`, {email, password});
    }

    register(email: string, firstname: string, lastname: string, password: string, role: string): Observable<any> {
        return this.post(`/auth/register`, {
            email,
            firstname,
            lastname,
            password,
            role
        });
    }

    // LessonController Requests
    createLesson(lesson: string, subjectId: number): Observable<LessonDto> {
        const lessonEntity = {
            name: lesson
        }
        return this.post<LessonDto>(`/lesson/${subjectId}`, lessonEntity);
    }

    setLessonPDFs(id: number, studentFile: File, teacherFile: File): Observable<{ [key: string]: string }> {
        const formData = new FormData();
        formData.append('studentFile', studentFile);
        formData.append('teacherFile', teacherFile);
        return this.put<{ [key: string]: string }>(`/lesson/${id}/pdf`, formData);
    }

    getAllLessons(): Observable<any[]> {
        return this.get<any[]>(`/lesson`);
    }

    getLessonById(id: number): Observable<any> {
        return this.get<any>(`/lesson/${id}`);
    }

    deleteLesson(id: number): Observable<{ [key: string]: string }> {
        return this.delete<{ [key: string]: string }>(`/lesson/${id}`);
    }

    updateLesson(lesson: LessonDto) {
        return this.put(`/lesson`, lesson);
    }

    updateLessonPDFs(id: number, studentFile: File | undefined, teacherFile: File | undefined): Observable<{
        [key: string]: string
    }> {
        const formData = new FormData();
        if (studentFile)
            formData.append('studentFile', studentFile);
        if (teacherFile)
            formData.append('teacherFile', teacherFile);
        return this.put<{ [key: string]: string }>(`/lesson/update/${id}/pdf`, formData);
    }

    // StudentController Requests
    getAllStudents(): Observable<StudentDto[]> {
        return this.get<StudentDto[]>(`/students`);
    }

    getStudentById(id: number): Observable<StudentDto> {
        return this.get<StudentDto>(`/students/${id}`);
    }

    createStudent(studentEntity: any): Observable<any> {
        return this.post<any>(`/students`, studentEntity);
    }

    getStudentSubjects(id: number): Observable<any[]> {
        return this.get<any[]>(`/students/${id}/subjects`);
    }

    // SubjectController Requests
    createSubject(subject: string, description: string, free: boolean): Observable<any> {
        const subjectEntity: any = {
            name: subject,
            description: description,
            free: free
        }
        return this.post<any>(`/subject`, subjectEntity);
    }

    updateSubject(subject: SubjectDto) {
        return this.put(`/subject`, subject);
    }

    putImageToSubject(id: number, image: File): Observable<{ message: string }> {
        const formData = new FormData();
        formData.append('file', image);
        return this.put<{ message: string }>(`/subject/${id}/image`, formData);
    }

    getImageFromSubject(id: number): Observable<any> {
        return this.get<any>(`/subject/${id}/image`);
    }

    getAllSubjects(): Observable<SubjectDto[]> {
        return this.get<any[]>(`/subject`);
    }

    getAllSubjectsNoAuth(): Observable<SubjectDto[]> {
        return this.get<any[]>(`/subject/no-auth`);
    }

    getAllNotFreeSubjects(): Observable<SubjectDto[]> {
        return this.get<SubjectDto[]>(`/subject/not-free`);
    }

    getSubjectById(id: number): Observable<any> {
        return this.get<any>(`/subject/${id}`);
    }

    deleteSubject(id: number): Observable<{ [key: string]: string }> {
        return this.delete<{ [key: string]: string }>(`/subject/${id}`);
    }

    // TeacherController Requests
    addCourseToTeacher(id: number, subjectId: number): Observable<any> {
        return this.put<any>(`/teacher/${id}/subject/${subjectId}`, null);
    }

    getTeachers(): Observable<any[]> {
        return this.get<any[]>(`/teacher`);
    }

    getTeacherById(id: number): Observable<any> {
        return this.get<any>(`/teacher/${id}`);
    }

    addStudentToTeacher(id: number, studentId: number): Observable<any> {
        return this.put<any>(`/teacher/${id}/student/${studentId}`, null);
    }

    // UserController Requests
    getOwnUser(): Observable<UserDto> {
        return this.get<UserDto>("/user/own");
    }

    getUser(id: number): Observable<UserDto> {
        return this.get<UserDto>(`/user/${id}`)
    }

    getAllUsers(): Observable<UserDto[]> {
        return this.get<UserDto[]>("/user");
    }

    deleteUser(id: number): Observable<any> {
        return this.delete("/user/" + id)
    }

    updateUser(user: UserDto): Observable<UserDto> {
        return this.put("/user", user)
    }

    getUserProfileImage(id: number): string {
        return baseUrl + `/user/${id}/profile-image`;
    }

    setUserProfileImage(id: number, image: File): Observable<{ message: string }> {
        const formData = new FormData();
        formData.append('file', image);
        return this.put<{ message: string }>(`/user/${id}/profile-image`, formData);
    }

// WorkshopController Requests
    bookWorkshop(subject: SubjectDto, date: string, schoolName: string, message: string): Observable<WorkshopDto> {
        return this.post<WorkshopDto>(`/workshop/book`, {
            subject: subject,
            date: date,
            school: schoolName,
        });
    }

    sendWorkshopMessage(workshopId: number, message: string) {
        return this.post<Message>(`/workshop/${workshopId}/message`, message)
    }

    getAllWorkshops(): Observable<WorkshopDto[]> {
        return this.get<WorkshopDto[]>(`/workshop/`);
    }

    getWorkshop(id: number): Observable<WorkshopDto> {
        return this.get<WorkshopDto>(`/workshop/${id}`);
    }

    getOwnWorkshops(): Observable<WorkshopDto[]> {
        return this.get<WorkshopDto[]>(`/workshop/own`);
    }

    changeWorkshopState(id: number, accept: boolean): Observable<WorkshopDto> {
        this.chatSocket.next({
            workshopId: id,
            type: "NEW_MESSAGE",
            message: {
                message: "Your workshop request has been " + (accept ? "accepted" : "declined"),
                type: "WORKSHOP_STATE_CHANGE",
                sender: null,
            }
        });
        return this.put<WorkshopDto>(`/workshop/change-state/${id}/${accept}`, null);
    }

    getMessages(id: number): Observable<Message[]> {
        return this.get<Message[]>(`/message/user/${id}`);
    }

    getChat(): Observable<Message> {
        return this.chatSocket.asObservable() as Observable<Message>;
    }

    joinChat(workshopId: number) {
        this.chatSocket.next({
            type: "JOIN_CHAT",
            workshopId: workshopId
        });
    }

    sendMessage(workshopId: number, message: string, user: UserDto) {
        this.chatSocket.next({
            workshopId: workshopId,
            type: "NEW_MESSAGE",
            message: {
                message: message,
                type: "MESSAGE",
                sender: user,
            }
        });
    }

    getUsersWithWorkshopRequests() {
        return this.get<UserDto[]>("/user/workshop-requests")
    }

    private get<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(baseUrl + url, {
            headers: this.getHeaders()
        });
    }

    private post<T>(url: string, body: any): Observable<T> {
        return this.httpClient.post<T>(baseUrl + url, body, {
            headers: this.getHeaders()
        });
    }

    private delete<T>(url: string): Observable<T> {
        return this.httpClient.delete<T>(baseUrl + url, {
            headers: this.getHeaders()
        });
    }

    private put<T>(url: string, body: any): Observable<T> {
        return this.httpClient.put<T>(baseUrl + url, body, {
            headers: this.getHeaders()
        });
    }

    private getHeaders(): any {
        if (localStorage.getItem('token')) {
            return {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        } else return {
            'Authorization': ''
        }
    }
}

export const baseUrl = 'http://localhost:8080';

import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }


    // AuthController Requests
    login(email: string, password: string ): Observable<{ token: string }> {
        return this.post<{token: string}>(`${baseUrl}/auth/login`, {email, password});
    }

    register(email: string, firstname: string, lastname: string, password: string, role: string): Observable<any> {
        return this.post(`${baseUrl}/auth/register`, {
            email,
            firstname,
            lastname,
            password,
            role
        });
    }

// LessonController Requests
    createLesson(lessonEntity: any, subjectId: number): Observable<any> {
        return this.post<any>(`${baseUrl}/lesson/${subjectId}`, lessonEntity);
    }

    setLessonPDFs(id: number, studentFile: File, teacherFile: File): Observable<{ [key: string]: string }> {
        const formData = new FormData();
        formData.append('studentFile', studentFile);
        formData.append('teacherFile', teacherFile);
        return this.put<{ [key: string]: string }>(`${baseUrl}/lesson/${id}/pdf`, formData);
    }

    getAllLessons(): Observable<any[]> {
        return this.get<any[]>(`${baseUrl}/lesson`);
    }

    getLessonById(id: number): Observable<any> {
        return this.get<any>(`${baseUrl}/lesson/${id}`);
    }

    deleteLesson(id: number): Observable<{ [key: string]: string }> {
        return this.delete<{ [key: string]: string }>(`${baseUrl}/lesson/${id}`);
    }

    // StudentController Requests
    getAllStudents(): Observable<any[]> {
        return this.get<any[]>(`${baseUrl}/students`);
    }

    getStudentById(id: number): Observable<any> {
        return this.get<any>(`${baseUrl}/students/${id}`);
    }

    createStudent(studentEntity: any): Observable<any> {
        return this.post<any>(`${baseUrl}/students`, studentEntity);
    }

    getStudentSubjects(id: number): Observable<any[]> {
        return this.get<any[]>(`${baseUrl}/students/${id}/subjects`);
    }

    // SubjectController Requests
    createSubject(subjectEntity: any): Observable<any> {
        return this.post<any>(`${baseUrl}/subject`, subjectEntity);
    }

    putImageToSubject(id: number, image: File): Observable<{ [key: string]: string }> {
        const formData = new FormData();
        formData.append('file', image);
        return this.put<{ [key: string]: string }>(`${baseUrl}/subject/${id}/image`, formData);
    }

    getImageFromSubject(id: number): Observable<any> {
        return this.get<any>(`${baseUrl}/subject/${id}/image`);
    }

    getAllSubjects(): Observable<any[]> {
        return this.get<any[]>(`${baseUrl}/subject`);
    }

    getSubjectById(id: number): Observable<any> {
        return this.get<any>(`${baseUrl}/subject/${id}`);
    }

    deleteSubject(id: number): Observable<{ [key: string]: string }> {
        return this.delete<{ [key: string]: string }>(`${baseUrl}/subject/${id}`);
    }

    // TeacherController Requests
    addCourseToTeacher(id: number, subjectId: number): Observable<any> {
        return this.put<any>(`${baseUrl}/teacher/${id}/subject/${subjectId}`, null);
    }

    getTeachers(): Observable<any[]> {
        return this.get<any[]>(`${baseUrl}/teacher`);
    }

    getTeacherById(id: number): Observable<any> {
        return this.get<any>(`${baseUrl}/teacher/${id}`);
    }

    addStudentToTeacher(id: number, studentId: number): Observable<any> {
        return this.put<any>(`${baseUrl}/teacher/${id}/student/${studentId}`, null);
    }

    // UserController Requests
    getOwnUser(): Observable<any> {
        return this.get<any>(`${baseUrl}/user/own`);
    }

    private get<T>(url: string): Observable<T> {
        return this.http.get<T>(baseUrl + url, {
            headers: this.getHeaders()
        });
    }

    private post<T>(url: string, body: any): Observable<T> {
        return this.http.post<T>(baseUrl + url, body, {
            headers: this.getHeaders()
        });
    }

    private delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(baseUrl + url, {
            headers: this.getHeaders()
        });
    }

    private put<T>(url: string, body: any): Observable<T> {
        return this.http.put<T>(baseUrl + url, body, {
            headers: this.getHeaders()
        });
    }

    private getHeaders(): any {
        if (localStorage.getItem('token')) {
            return {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }else return {
            'Authorization': ''
        }
    }
}

export const baseUrl = 'http://localhost:8080';

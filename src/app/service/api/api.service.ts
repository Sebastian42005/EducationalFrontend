import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {StudentDto} from "./entities/StudentDto";
import {UserDto} from "./entities/UserDto";
import {UserRole} from "./entities/UserRole";
import {SubjectDto} from "./entities/SubjectDto";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

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
  createLesson(lessonEntity: any, subjectId: number): Observable<any> {
    return this.post<any>(`/lesson/${subjectId}`, lessonEntity);
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
  createSubject(subject: string): Observable<any> {
    const subjectEntity: any = {
      name: subject
    }
    return this.post<any>(`/subject`, subjectEntity);
  }

  putImageToSubject(id: number, image: File): Observable<{ message: string }> {
    const formData = new FormData();
    formData.append('file', image);
    return this.put<{ message: string}>(`/subject/${id}/image`, formData);
  }

  getImageFromSubject(id: number): Observable<any> {
    return this.get<any>(`/subject/${id}/image`);
  }

  getAllSubjects(): Observable<any[]> {
    return this.get<any[]>(`/subject`);
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

  getAllUsers(): Observable<UserDto[]> {
    return this.get<UserDto[]>("/user");
  }

  deleteUser(id: number): Observable<any> {
    return this.delete("/user/" + id)
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

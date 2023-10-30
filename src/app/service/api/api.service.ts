import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDto} from "./entities/UserDto";
import {SubjectDto} from "./entities/SubjectDto";
import {LessonDto} from "./entities/LessonDto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createLesson(name: string, subjectId: string) {
    return this.post<LessonDto>(`/lesson/${subjectId}`, {
      name,
    });
  }

  setLessonPDFs(id: string, studentFile: File, teacherFile: File) {
    const formData = new FormData();
    formData.append('studentFile', studentFile);
    formData.append('teacherFile', teacherFile);
    return this.put(`/lesson/${id}/pdf`, formData);
  }

  getAllLessons() {
    return this.get<LessonDto>('/lesson');
  }

  getLesson(id: string) {
    return this.get<LessonDto>(`/lesson/${id}`);
  }

  deleteLesson(id: string) {
    return this.delete(`/lesson/${id}`);
  }

  createSubject(name: string) {
    return this.post<SubjectDto>('/subject', {
      name
    });
  }

  addSubjectImage(id: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.put(`/subject/${id}/image`, formData);
  }

  getAllSubjects() {
    return this.get<SubjectDto[]>('/subject');
  }

  getSubject(id: string) {
    return this.get<SubjectDto>(`/subject/${id}`);
  }

  deleteSubject(id: string) {
    return this.delete(`/subject/${id}`);
  }

  getOwnUser() {
    return this.get<UserDto>('/user/own');
  }

  login(email: string, password: string) {
    return this.post<{token: string}>('/auth/login', {
      email,
      password
    });
  }

  register(email: string, password: string, firstName: string, lastName: string, role: string) {
    return this.post<UserDto>('/auth/register', {
      email,
      password,
      firstName,
      lastName,
      role
    });
  }

  get<T>(path: string) {
    return this.http.get<T>(baseUrl + path, {
      headers: this.getHeaders()
    });
  }
  post<T>(path: string, body: any) {
    return this.http.post<T>(baseUrl + path, body, {
      headers: this.getHeaders()
    });
  }
  put<T>(path: string, body: any) {
    return this.http.put<T>(baseUrl + path, body, {
      headers: this.getHeaders()
    });
  }
  delete<T>(path: string) {
    return this.http.delete<T>(baseUrl + path, {
      headers: this.getHeaders()
    });
  }

  private getHeaders(): {Authorization: string} {
    const token = localStorage.getItem('token');
    if (token) {
      return {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }else {
      return {
        Authorization: ''
      };
    }
  }
}

export const baseUrl = 'http://localhost:8080';

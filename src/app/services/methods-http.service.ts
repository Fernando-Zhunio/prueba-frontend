import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface IPaginate<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
}
export interface IResponse<T = any> {
  success: boolean;
  data: T;
}
@Injectable({
  providedIn: 'root'
})
export class MethodsHttpService {

  end_point = environment.serverApiUrl;

  constructor(private http: HttpClient) { }

  public methodGet<T = any>(url: string, params: any = null): Observable<IResponse<T>> {
    return this.http.get<IResponse<T>>(this.end_point + url, { params });
  }

  public methodGetPaginate<T = any>(url: string, params: any = null): Observable<IResponse<IPaginate<T>>> {
    return this.http.get<IResponse<IPaginate<T>>>(this.end_point + url, { params });
  }

  public methodPost<T = any>(url: string, params: any = null): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(this.end_point + url,  params );
  }

  public methodPut<T = any>(url: string, params: any = null): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(this.end_point + url, params );
  }

  public methodDelete<T = any>(url: string): Observable<IResponse<T>> {
    return this.http.delete<IResponse<T>>(this.end_point + url);
  }

  public methodGetCustom<T = any>(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

}

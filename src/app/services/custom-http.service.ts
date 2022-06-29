import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {

  constructor(private httpService: HttpClient) {
  }

  /**
   *
   * @param url the end point to request
   */
  async get<returnType>(
    url: string,
  ): Promise<returnType | void> {
    try {
      return firstValueFrom(this.httpService.get<returnType>(url, { observe: "body" }));
    } catch (e) {
      return this.handleError(e, { url })
    }
  };

  /**
   *
   * @param url the end point to request
   * @param payload request body
   */
  async post<returnType>(
    url: string,
    payload: any,
  ): Promise<returnType | void> {
    try {
      return firstValueFrom(this.httpService.post<returnType>(url, payload, { observe: "body" }));
    } catch (e) {
      return this.handleError(e, { url, payload })
    }
  };

  /**
   *
   * @param url the end point to request
   * @param payload request body
   */
  async put<returnType>(
    url: string,
    payload: any,
  ): Promise<returnType | void> {
    try {
      return firstValueFrom(this.httpService.put<returnType>(url, payload, { observe: "body" }));
    } catch (e) {
      return this.handleError(e, { url, payload })
    }
  };

  /**
   *
   * @param url the end point to request
   */
  async delete<returnType>(
    url: string,
  ): Promise<returnType | void> {
    try {
      return firstValueFrom(this.httpService.delete<returnType>(url, { observe: "body" }));
    } catch (e) {
      return this.handleError(e, { url })
    }
  };

  async handleError(error: any, config: any) {
    console.error(`Axios Error`, { config, error });

    //  TODO: Handle errors with interceptor

    throw error;
  };
}

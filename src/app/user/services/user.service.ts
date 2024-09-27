import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public constructor(private httpClient: HttpClient) {}
  private baseUrl = environment.apiUrl;

  getUser() {
    return this.httpClient.get<any>(`${this.baseUrl}/users/me`);
  }
}

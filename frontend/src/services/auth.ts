import axios from "axios";
import { Auth } from "../types/interfaces";

export class AuthService {
  private static user: Auth | null = null;
  private static api = axios.create({
    baseURL: "http://localhost:4000",
  });

  public static isAuthenticated(): boolean {
    return !!AuthService.user;
  }

  public static getUser(): any {
    return AuthService.user;
  }
  
  public static async login(username: string, password: string): Promise<any> {
    return await AuthService.api
      .post("/auth/login", {
        username,
        password,
      })
      .then((res) => {
        if (res.data.user) {
          AuthService.user = res.data.user;
          return res.data.user;
        } else {
          return null;
        }
      })
      .catch((err) => {
        return null;
      });
  }

  public static logout(): void {
    AuthService.user = null;
  }
}

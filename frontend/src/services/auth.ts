import axios from "axios";

class AuthService {
  private static user: any;
  private api: any;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:4000",
    });
  }

  public isLoggedIn(): boolean {
    return !!AuthService.user;
  }

  public async login(username: string, password: string): Promise<any> {
    const res = await this.api.post("/auth/login", { username, password });
    if (res.data.user) {
      AuthService.user = res.data.user;
      return res.data.user;
    } else {
      return null;
    }
  }

  public logout(): void {
    AuthService.user = null;
  }
}

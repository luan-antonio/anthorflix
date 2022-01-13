export default class AnthorflixAPI {
  constructor() {
    this.API_BASE = "http://localhost:3001";
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async basicFetch(endpoint, fetchOptions) {
    const req = await fetch(`${this.API_BASE}${endpoint}`, fetchOptions);
    const res = { json: await req.json(), status: req.status };
    return res;
  }

  setTokenOnHeaders(token) {
    this.token = token;
    this.headers = {
      ...this.headers,
      "authorization": this.token
    }
  }



  async getHomeList() {
    return [
      {
        title: "Filmes",
        items: await this.basicFetch("/movies"),
      },
    ];
  }

  async register({ name, email, password, confirmPassword }) {
    const res = await this.basicFetch("/auth/register", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });
    return res;
  }

  async login({ email, password }) {
    const res = await this.basicFetch("/auth/login", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    });
    return res;
  }
}

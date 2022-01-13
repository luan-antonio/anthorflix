export default class AnthorflixAPI {
  constructor() {
    this.API_BASE = "http://localhost:3001";
  }

  async basicFetch(endpoint, fetchOptions) {
    const req = await fetch(`${this.API_BASE}${endpoint}`, fetchOptions);
    const res = { json: await req.json(), status: req.status };
    return res;
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
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });
    return res;
  }
}

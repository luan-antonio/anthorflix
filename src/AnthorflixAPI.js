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
    const res = await this.basicFetch("/movies");
    return res;
  }

  async register({ name, email, password, confirmPassword }) {
    const res = await this.basicFetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });
    return res;
  }

  async login({ email, password }) {
    const res = await this.basicFetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return res;
  }

  async addMovie(payload) {
    const res = await this.basicFetch("/movies/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });
    return res;
  }

  async getMovieInfo(movieId) {
    const res = await this.basicFetch(`/movies/${movieId}`);
    return res;
  }
  async deleteMovie(movieId) {
    const res = await this.basicFetch(`/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return res;
  }
}

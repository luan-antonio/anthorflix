export default class AnthorflixAPI {
  constructor() {
    this.API_BASE = "http://localhost:3001";
  }

  async basicFetch(endpoint, fetchOptions) {
    const req = await fetch(`${this.API_BASE}${endpoint}`, fetchOptions);
    const json = await req.json();
    return json;
  }

  async getHomeList() {
    return [
      {
        title: "Filmes",
        items: await this.basicFetch("/movies"),
      },
    ];
  }
}

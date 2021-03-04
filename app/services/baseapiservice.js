const serviceBaseUrl = "https://localhost:44305/api";

class BaseAPIService {
    constructor(url) {
        this.headers = new Headers();
        this.url = `${serviceBaseUrl}/${url}`;
    };
}
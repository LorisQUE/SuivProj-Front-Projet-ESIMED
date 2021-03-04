class UtilisateurAPI extends BaseAPIService{
    constructor() {
        super("Utilisateurs");
    };

    getAll() {
        return fetchJSON(this.url);
    };

    getById(id) {
        return fetchJSON(`${this.url}/${id}`);
    };
}
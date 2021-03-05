class JalonAPI extends BaseAPIService{
    constructor() {
        super("Jalons");
    };
    
    getAllByProj(id) {
        return fetchJSON(`${this.url}/Proj/${id}`);
    };

    getById(id) {
        return fetchJSON(`${this.url}/${id}`);
    };
    
    delete(id) {
        this.headers.delete('Content-Type');
        return fetch(`${this.url}/${id}`, { method: 'DELETE', headers: this.headers });
    };

    insert(jalon) {
        this.headers.set( 'Content-Type', 'application/json' );
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({libelle: jalon.libelle, responsableId: jalon.responsableId, projetId: jalon.projetId})
        });
    };
}
class ExigenceAPI extends BaseAPIService{
    constructor() {
        super("Exigences");
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

    insert(exigence) {
        this.headers.set( 'Content-Type', 'application/json' );
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({description: exigence.description, isFonctionnel: exigence.isFonctionnel, nonFonctionnel: exigence.nonFonctionnel, projetId: exigence.projetId})
        });
    };

    update(exigence){
        this.headers.set( 'Content-Type', 'application/json' );
        return fetch(`${this.url}/${exigence.id}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify({description: exigence.description, isFonctionnel: exigence.isFonctionnel, nonFonctionnel: exigence.nonFonctionnel})
        });
    }
}
class ProjetAPI extends BaseAPIService{
    constructor() {
        super("Projets");
    };

    getAll() {
        return fetchJSON(this.url);
    };

    getById(id) {
        return fetchJSON(`${this.url}/${id}`);
    };

    delete(id) {
        this.headers.delete('Content-Type');
        return fetch(`${this.url}/${id}`, { method: 'DELETE', headers: this.headers });
    };

    

    insert(projet) {
        this.headers.set( 'Content-Type', 'application/json' );
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({nom: projet.nom, chefProjetId: projet.chefProjet.id})
        });
    };

    update(projet){
        this.headers.set( 'Content-Type', 'application/json' );
        return fetch(`${this.url}/${projet.id}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify({nom: projet.nom, chefProjetId: projet.chefProjet.id})
        });
    }
}
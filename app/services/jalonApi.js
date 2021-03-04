class JalonAPI extends BaseAPIService{
    constructor() {
        super("Exigences");
    };

    insert(jalon) {
        this.headers.set( 'Content-Type', 'application/json' );
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({libelle: jalon.libelle, responsableId: jalon.isFonctionnel, projetId: jalon.projetId})
        });
    };
}
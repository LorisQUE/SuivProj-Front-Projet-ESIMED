class Model {
    constructor() {
        this.projetApi = new ProjetAPI();
        this.utilisateurApi = new UtilisateurAPI();
    };
    
    /*
    REGION DES PROJETS
     */
    async getAllProjets() {
        let projets = [];
        for (let projet of await this.projetApi.getAll()) {
            projets.push(projet);
        }
        return projets;
    };

    async getProjetById(id){
        return this.projetApi.getById(id);
    }

    async deleteProjet(id){
        return this.projetApi.delete(id).then(res => res.status);
    }

    async postProjet(projet){
        return this.projetApi.insert(projet).then(res => res.status);
    }

    /*
    REGION DES UTILISATEURS
    */
   async getAllUtilisateurs() {
    let utilisateurs = [];
    for (let u of await this.utilisateurApi.getAll()) {
        utilisateurs.push(u);
    }
    return utilisateurs;
};
}
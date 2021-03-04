class Model {
    constructor() {
        this.projetApi = new ProjetAPI();
        this.utilisateurApi = new UtilisateurAPI();
        this.exigenceApi = new ExigenceAPI();
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

    async insertProjet(projet){
        return this.projetApi.insert(projet).then(res => res.status);
    }

    async updateProjet(projet) {
        return this.projetApi.update(projet).then(res => res.status);
    };

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
    /*
    REGION DES EXIGENCES
    */

   async getAllExigences(id){
        let exigences = [];
        for (let exigence of await this.exigenceApi.getAllByProj(id)) {
            exigences.push(exigence);
        }
        return exigences;
    }

    async getExigenceById(id){
        return this.exigenceApi.getById(id);
    }

    async deleteExigence(id){
        return this.exigenceApi.delete(id).then(res => res.status);
    }

    async insertExigence(exigence){
        return this.exigenceApi.insert(exigence).then(res => res.status);
    }

    async updateExigence(exigence) {
        return this.exigenceApi.update(exigence).then(res => res.status);
    };
}
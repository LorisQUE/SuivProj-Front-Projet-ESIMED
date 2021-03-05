class Model {
    constructor() {
        this.projetApi = new ProjetAPI();
        this.utilisateurApi = new UtilisateurAPI();
        this.exigenceApi = new ExigenceAPI();
        this.jalonApi = new JalonAPI();
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

    async getUtilisateurById(id){
        return this.utilisateurApi.getById(id);
    }

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

    /*
    REGION DES JALONS
    */

    async getJalonById(id){
        return this.jalonApi.getById(id);
    }

   async getAllJalons(id){
    let jalons = [];
    for (let jalon of await this.jalonApi.getAllByProj(id)) {
        jalons.push(jalon);
    }
    return jalons;
    }

    async deleteJalon(id){
        return this.jalonApi.delete(id).then(res => res.status);
    }

    async insertJalon(jalon){
        return this.jalonApi.insert(jalon).then(res => res.status);
    }

    async updateJalon(jalon) {
        return this.jalonApi.update(jalon).then(res => res.status);
    };
}
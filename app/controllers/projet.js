class ProjetController extends BaseController {
    constructor() {
        super();
        this.showProjet();
    }

    
    async showProjet(){
        var content = "";
        for (const projet of await this.model.getAllProjets()) {
            content += `
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title">${projet.nom}</span>
                  <p>Chef de projet : ${projet.chefProjet.nom} ${projet.chefProjet.prenom} - ${projet.chefProjet.trigramme}</p>
                </div>
              </div>`
        }
        $('#projets-liste').innerHTML = content;
    }

    async clickProjet(){
        
    }
    
}

window.indexController = new IndexController()
class IndexController extends BaseController {
    constructor() {
        super();
        this.showProjets();
    }
    
    async showProjets(){
        let content = "";
        for (const projet of await this.model.getAllProjets()) {
            content += `
              <div id="projet-card-${projet.id}" class="card blue-grey">
                <div class="card-content white-text" onclick="indexController.openProjet('${projet.id}')">
                  <span class="card-title">${projet.nom}</span>
                  <p>Chef de projet : ${projet.chefProjet.nom} ${projet.chefProjet.prenom} - ${projet.chefProjet.trigramme}</p>
                  <br/>
                  <a class="btn" onclick="indexController.updateProjet('${projet.id}');"><i class="material-icons">edit</i></a>
                  <a class="btn" onclick="indexController.deleteProjet('${projet.id}');"><i class="material-icons">delete_forever</i></a>
                  </div>
              </div>`; 
        }
        $('#projets-liste').innerHTML = content;
    }

    async openProjet(id){
        console.log(id);
    }

    async deleteProjet(id){ 
        let e = $(`#projet-card-${id}`);
        if(confirm("Êtes-vous sûr de vouloir supprimer ce Projet ? ")){
            this.model.deleteProjet(id);

            e.parentNode.removeChild(e);
        }
    }

    async updateProjet(id){
        let utilisateurs = await this.model.getAllUtilisateurs();
        console.log(utilisateurs);
        let dataAutocomplete = utilisateurs.map(u => { u.trigramme, null });
        console.log(dataAutocomplete);
        var elem = $('#inputProjetChef');
        M.Autocomplete.init(elem, { data:dataAutocomplete,  onAutocomplete: e =>{
            console.log("displayName");
    }});

        let projet = await this.model.getProjetById(id);
        console.log(projet);
        $("#inputProjetNom").value = projet.nom;
        $("#inputProjetChef").value = projet.chefProjet.trigramme;
        this.getModal("#modal-crud-projet").open();
    }

    async validateProjet(projet){
        if(projet.id){
            //C'est un update
        }else{
            //C'est un insert
        }
    }
    
}

window.indexController = new IndexController()
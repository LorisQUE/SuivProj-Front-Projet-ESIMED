class IndexController extends BaseController {
    constructor() {
        super();
        this.showProjets();
        this.projets = [];
        this.projet = {};
    }
    
    async showProjets(){
        let content = "";
        this.projets = await this.model.getAllProjets()
        for (const projet of this.projets) {
            content += `
              <div id="projet-card-${projet.id}" class="card">
                <div class="card-content">
                  <span class="card-title">${projet.nom}</span>
                  <p>Chef de projet : ${projet.chefProjet.nom} ${projet.chefProjet.prenom} - ${projet.chefProjet.trigramme}</p>
                  <br/>
                  <a class="btn" onclick="indexController.openProjet('${projet.id}')"><i class="material-icons">arrow_forward</i></a>
                  <a class="btn" onclick="indexController.updateProjet('${projet.id}');"><i class="material-icons">edit</i></a>
                  <a class="btn" onclick="indexController.deleteProjet('${projet.id}');"><i class="material-icons">delete_forever</i></a>
                  </div>
              </div>`; 
        }
        $('#projets-liste').innerHTML = content;
    }

    async openProjet(id){
        let res = this.projets.filter(p => p.id == id)[0];
        self.projetSelected = res;
        navigate('projet');
    }

    async deleteProjet(id){ 
        let e = $(`#projet-card-${id}`);
        if(confirm("Êtes-vous sûr de vouloir supprimer ce Projet ? ")){
            this.model.deleteProjet(id);
            e.parentNode.removeChild(e);
        }
    }

    async updateProjet(id){
        $("#modal-crud-projet .modal-title").innerText = "Mettre à jour le Projet";

        this.projet = await this.model.getProjetById(id);
        let utilisateurs = await this.model.getAllUtilisateurs();
        let dataTrigramme = utilisateurs.map(u => u.trigramme );
        let dataAutocomplete = {};

        dataTrigramme.forEach(e => {
            dataAutocomplete[e] = null;
        });

        var elem = $('#inputProjetChef');
        M.Autocomplete.init(elem, { data:dataAutocomplete,  onAutocomplete: e =>{
            let res = utilisateurs.filter(u => u.trigramme == e)[0];
            this.projet.chefProjet = res;
        }});

        $("#inputProjetNom").value = this.projet.nom;
        $("#inputProjetChef").value = this.projet.chefProjet.trigramme;
        this.getModal("#modal-crud-projet").open();
    }

    async insertProjet(){
        $("#modal-crud-projet .modal-title").innerText = "Mettre à jour le Projet";

        this.projet = {nom: "", chefProjet: { id: 0 } }
        let utilisateurs = await this.model.getAllUtilisateurs();
        let dataTrigramme = utilisateurs.map(u => u.trigramme );
        let dataAutocomplete = {};

        dataTrigramme.forEach(e => {
            dataAutocomplete[e] = null;
        });

        var elem = $('#inputProjetChef');
        M.Autocomplete.init(elem, { data:dataAutocomplete,  onAutocomplete: e =>{
            let res = utilisateurs.filter(u => u.trigramme == e)[0];
            this.projet.chefProjet = res;
        }});

        $("#inputProjetNom").value = "";
        $("#inputProjetChef").value = "";
        this.getModal("#modal-crud-projet").open();
    }

    async validateProjet(){
        console.log(this.projet)
        this.projet.nom = $("#inputProjetNom").value;

        if(this.projet.chefProjet.id !== 0 && !!this.projet.nom){
            console.log(this.projet.id);
            if(this.projet?.id){
                await this.model.updateProjet(this.projet);
            }else if (this.projet){
                await this.model.insertProjet(this.projet);
            }

            this.getModal("#modal-crud-projet").close();
            this.projet = {};
            window.location.reload();
        } else {
            alert("Veuillez saisir un nom de projet et un chef de projet");
        }
    }
    
}

window.indexController = new IndexController()
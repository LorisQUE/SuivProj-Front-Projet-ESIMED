class JalonController extends BaseController {
    constructor() {
        super();
        this.projet = self.projetSelected;
        this.jalons = [];
        this.jalon = {};
        this.showJalon();
    }

    
    async showJalon(){
        $("#title-jalon").innerText = `Jalon du projet ${this.projet.nom}`;
        
        this.jalons = await this.model.getAllJalons(this.projet.id);
        let content = "";

        for (const jalon of this.jalons) {
            let responsable = await this.model.getUtilisateurById(jalon.responsableId);
            let dateFin = (new Date(jalon.dateFinTheoriqueCalculer)).toLocaleDateString();
            let dateLivrP = (new Date(jalon.dateLivraisonPrevue)).toLocaleDateString();
            let dateLivrR = (new Date(jalon.dateLivraisonReelle)).toLocaleDateString();
            
            console.log(responsable);
            content += `
              <div id="jalon-card-${jalon.id}" class="card">
                <div class="card-content">
                  <span class="card-title">${jalon.libelle}</span>
                  <p>
                  Date de Fin Théorique : ${dateFin} <br/>
                  Date de Livraison Prévue : ${dateLivrP} <br/>
                  Date de Livraison Réelle : ${dateLivrR} <br/>
                  Responsable : ${responsable.nom} ${responsable.prenom} - ${responsable.trigramme}<br/>
                  Progressions : ${jalon.progression}<br/>
                  Nombre de Tâches : ${jalon.taches.length}
                  </p>
                  <br/>
                  <a class="btn" onclick=""><i class="material-icons">arrow_forward</i></a>
                  <a class="btn" onclick="jalonController.updateJalon('${jalon.id}'"><i class="material-icons">edit</i></a>
                  <a class="btn" onclick="jalonController.deleteJalon('${jalon.id}')"><i class="material-icons">delete_forever</i></a>
                  </div>
              </div>`;
        }
        $('#jalons-liste').innerHTML = content;
    }

    async deleteJalon(id){ 
        let e = $(`#jalon-card-${id}`);
        if(confirm("Êtes-vous sûr de vouloir supprimer ce Jalon, toutes les tâches seront également supprimer ? ")){
            this.model.deleteJalon(id);
            e.parentNode.removeChild(e);
        }
    }

    
    async updateJalon(id){
        this.jalon = await this.model.getJalonById(id);
        console.log(this.jalon);

        $("#modal-crud-jalon .modal-title").innerText = "Mettre à jour le Jalon";
        this.getModal("#modal-crud-jalon").open();
    }

    async insertJalon(){
        $("#modal-crud-jalon .modal-title").innerText = "Créer un Jalon";



        this.jalon = {libelle: "", responsableId: null, projetId: this.projet.id }
        let utilisateurs = await this.model.getAllUtilisateurs();
        let dataTrigramme = utilisateurs.map(u => u.trigramme );
        let dataAutocomplete = {};

        dataTrigramme.forEach(e => {
            dataAutocomplete[e] = null;
        });

        var elem = $('#inputReponsable');
        M.Autocomplete.init(elem, { data:dataAutocomplete,  onAutocomplete: e =>{
            let res = utilisateurs.filter(u => u.trigramme == e)[0];
            this.jalon.responsableId = res.id;
        }});

        $("#inputLibelleJalon").value = "";
        $("#inputReponsable").value = "";
        this.getModal("#modal-crud-jalon").open();
    }

    async validateJalon(){
        this.jalon.libelle = $("#inputLibelleJalon").value;
        console.log(this.jalon)
        if(this.jalon.responsableId && !!this.jalon.libelle){
            if(this.jalon?.id){
                await this.model.updateJalon(this.jalon);
            }else if (this.jalon){
                await this.model.insertJalon(this.jalon);
            }

            this.getModal("#modal-crud-jalon").close();
            this.jalon = {};
            this.showJalon();
        } else {
            alert("Veuillez saisir un libelle de jalon et un responsable");
        }
    }

}

window.jalonController = new JalonController()
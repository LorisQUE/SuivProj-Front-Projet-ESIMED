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
        console.log(this.jalons);
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
                  <a class="btn" onclick=""><i class="material-icons">edit</i></a>
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

}

window.jalonController = new JalonController()
class ProjetController extends BaseController {
    constructor() {
        super();
        this.projet = self.projetSelected;
        this.showProjet();
    }

    
    async showProjet(){
      $("#title-projet").innerText = this.projet.nom;
      $("#detail-projet-chef").innerText = `${this.projet.chefProjet.nom} ${this.projet.chefProjet.prenom} - ${this.projet.chefProjet.trigramme} - ${this.projet.chefProjet.mail}`;
      let dateDebut = (new Date(this.projet.dateDebut)).toLocaleDateString();
      let dateFinT = (new Date(this.projet.dateFinTheorique)).toLocaleDateString();
      let dateFinR = (new Date(this.projet.dateFinReelle)).toLocaleDateString();
      console.log(Date.parse(dateDebut))
      let exigence = `
        <div class="card">
          <div class="card-content">
            <span class="card-title">Exigences</span>
            <p> Nombre d'exigences : ${this.projet.exigences.length} </p>
            <br/>
            <a class="btn" onclick="projetController.openExigence()"><i class="material-icons">arrow_forward</i></a>
            </div>
        </div>`;

        let jalon = `
        <div class="card">
          <div class="card-content">
            <span class="card-title">Jalons</span>
            <p> Nombre de jalons : ${this.projet.jalons.length} </p>
            <br/>
            <a class="btn" onclick="projetController.openJalon()"><i class="material-icons">arrow_forward</i></a>
            </div>
        </div>`;

        let tache = `
        <div class="card">
          <div class="card-content">
            <span class="card-title">Taches</span>
            <p> Nombre de taches : ${this.projet.taches.length} </p>
            <br/>
            <a class="btn" onclick="projetController.openTache()"><i class="material-icons">arrow_forward</i></a>
            </div>
        </div>`;

        $('#detail-projet-debut').innerHTML = dateDebut;
        $('#detail-projet-finT').innerHTML = dateFinT;
        $('#detail-projet-finR').innerHTML = dateFinR;
        $('#exigences-liste').innerHTML = exigence;
        $('#jalons-liste').innerHTML = jalon;
        $('#taches-liste').innerHTML = tache;
    }
    
    async openExigence(){
      navigate('exigence');
    }

    async openJalon(){
      navigate('jalon');
    }

    async openTache(){
      navigate('tache');
    }

}

window.projetController = new ProjetController()
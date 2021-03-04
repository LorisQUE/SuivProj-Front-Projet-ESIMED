class ExigenceController extends BaseController {
    constructor() {
        super();
        this.exigences = [];
        this.exigence = {};
        this.projet = self.projetSelected;
        this.showExigence();
    }

    
    async showExigence(){
      $("#title-exigence").innerText = `Exigence du projet ${this.projet.nom}`;
    
      let content = "";
      let nb = 0;
      this.exigences = await this.model.getAllExigences(this.projet.id);
      for (const exigence of this.exigences) {
          nb++;
          let isFonc = exigence.isFonctionnel ? "Est Fonctionnel" : "N'est pas fonctionnel : " + exigence.nonFonctionnel;
          content += `
            <div id="exigence-card-${exigence.id}" class="card">
              <div class="card-content">
                <span class="card-title">Exigence n°${nb}</span>
                <p>${exigence.description}</p>
                <p>${isFonc}</p>
                <br/>
                <a class="btn" onclick="exigenceController.updateExigence('${exigence.id}')"><i class="material-icons">edit</i></a>
                <a class="btn" onclick="exigenceController.deleteExigence('${exigence.id}')"><i class="material-icons">delete_forever</i></a>
                </div>
            </div>`; 
      }
      $('#exigences-liste').innerHTML = content;
    }

    async deleteExigence(id){ 
        let e = $(`#exigence-card-${id}`);
        if(confirm("Êtes-vous sûr de vouloir supprimer cette Exigence ? ")){
            this.model.deleteExigence(id);
            e.parentNode.removeChild(e);
        }
    }

    async updateExigence(id){
        this.exigence = await this.model.getExigenceById(id);
        $("#modal-crud-exigence .modal-title").innerText = `Mise à jour de l'exigence`;
        $("#inputExigenceDesc").value = this.exigence.description;
        $("#checkbox-fonctionnel").checked = this.exigence.isFonctionnel;
        
        
        if(!!this.exigence.nonFonctionnel) $(`#select-nonfonctionnel option[value='${this.exigence.nonFonctionnel}']`).setAttribute("selected", "selected");
        

        M.FormSelect.init($("#select-nonfonctionnel"));
        this.getModal("#modal-crud-exigence").open();
    }

    async insertExigence(){
        this.exigence = {description: "", isFonctionnel: true, nonFonctionnel: "", projetId: this.projet.id }
        $("#modal-crud-exigence .modal-title").innerText = `Création d'une exigence`;
        $("#inputExigenceDesc").value = "";
        this.getModal("#modal-crud-exigence").open();
        M.FormSelect.init($("#select-nonfonctionnel"));
    }
    

    async validateExigence(){
        console.log(this.exigence)
        this.exigence.description = $("#inputExigenceDesc").value;
        this.exigence.isFonctionnel = $("#checkbox-fonctionnel").checked;
        this.exigence.nonFonctionnel = this.exigence.isFonctionnel ? "" : $("#select-nonfonctionnel").value;
        
        if(this.exigence?.id){
            //Update
            await this.model.updateExigence(this.exigence);
        }else{
            //Insert
            await this.model.insertExigence(this.exigence);
        }
        this.exigence = {};
        
        this.getModal("#modal-crud-exigence").close();
        this.showExigence();
    }

}

window.exigenceController = new ExigenceController()
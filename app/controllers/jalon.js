class JalonController extends BaseController {
    constructor() {
        super();
        this.projet = self.projetSelected;
        this.showJalon();
    }

    
    async showJalon(){
        $("#title-jalon").innerText = `Jalon du projet ${this.projet.nom}`;
      
    }

}

window.jalonController = new JalonController()
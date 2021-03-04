// Business classes definitions

class Utilisateur {
    constructor(id, trigramme, prenom, nom, mail) {
        this.id = id;
        this.trigramme = trigramme;
        this.prenom = prenom;
        this.nom = nom;
        this.mail = mail;
    };
}

class Projet {
    constructor(id, nom, chefProjet, exigences, taches, jalons, dateDebut, dateFinTheorique, dateFinReelle) {
        this.id = id;
        this.nom = nom;
        this.chefProjet = chefProjet;
        this.exigences = exigences;
        this.taches = taches;
        this.jalons = jalons;
        this.dateDebut = dateDebut;
        this.dateFinTheorique = dateFinTheorique;
        this.dateFinReelle = dateFinReelle;
    };
    
}
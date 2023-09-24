"use scrict"




class Personnage {
    constructor(nom, pointsDeVie, probabiliteAttaque, probabiliteContreAttaque, degats) {
      this.nom = nom;
      this.pointsDeVie = pointsDeVie;
      this.probabiliteAttaque = probabiliteAttaque;
      this.probabiliteContreAttaque = probabiliteContreAttaque;
      this.degats = degats;
    }
  //actions d'attaque sur cible aléatoire 
    attaquer(cible) {
      let random = Math.random();//je creer cette variable pour ne paas avoir de boucle infini
      if (random < this.probabiliteAttaque) {
        console.log(`${this.nom} attaque ${cible.nom} et inflige ${this.degats} points de dégâts.`);
        cible.encaisserDegats(this.degats);
      } else {
        console.log(`${this.nom} rate son attaque contre ${cible.nom}.`);//affiche message si le personnage a raté son attaque de lécrire dans la console
      }
    }
  //action ou le personnage encaise des degats aleatoirement 
    encaisserDegats(degats) {
      let random = Math.random();// je fait cette vraraible pour ne pas avoir de boucle inifni
      if (random < this.probabiliteContreAttaque) {
        console.log(`${this.nom} contre-attaque et encaisse ${degats} points de dégâts.`);//affiche quand personnage contre attaque et encaisse des degats
        this.pointsDeVie -= degats;
      } else {
        console.log(`${this.nom} encaisse ${degats} points de dégâts.`);//affiche mlessage de quel personnage encaisse des point de degats
      }
  
      if (this.pointsDeVie <= 0) {
        console.log(`${this.nom} est vaincu.`);//affiche quand un personnage a été vaincu 
      }
    }
  }
  //creation du tueur et des personnages 
  let jason = new Personnage("Jason", 100, 0.3, 0.5, 5);//
  //attibuts des personnages (nom, caracteristique)
  let caracteristiques = ["nerd", "sportif", "blonde", "courageux", "peureux"];
  let prenoms = ["Camille", "Erve", "Raphael", "Poupoune", "Rodolphe"];
  //algorithme aléatoire datribution des nom et caractérisques
  let survivants = prenoms.map(nom => {//dire que les survivants sont les 5 personnages, et ne pas compter jason
    let caracteristique = caracteristiques[Math.floor(Math.random() * caracteristiques.length)];
    return new Personnage(nom, 100, 0.1, 0.6, 5, caracteristique);//pour Que lalgorithme recommence avec un personnage aleatoire
  });
  //boucle pour le combat entre Jason et les survivants 
  while (jason.pointsDeVie > 0 && survivants.some(survivant => survivant.pointsDeVie > 0)) {
    for (let i = 0; i < survivants.length; i++) { //boucle pour tous les survivants qui sont dans le tableau
      if (jason.pointsDeVie <= 0) break;//pour voir si Jason a été vaincu et si cest le cas "Break" arret la boucle car Jason est mort
      if (survivants[i].pointsDeVie > 0) {//voir si les survivants a encore des points de vie, au quel cas ils peuvent attaqué
        jason.attaquer(survivants[i]);//methode pour que Jason attaque 
      }
    }
  
    for (let j = 0; j < survivants.length; j++) {//boucle qui continue tant quelle est inferieur au nombre de survivants
      if (survivants[j].pointsDeVie > 0) {//verifie que les points de vie sont superieur a zero 
        survivants[j].attaquer(jason);//action pour que le survivant attaque Jason
      }
    }
  }
  
  let morts = [];//bouvle pour savoir si les survivants sont decedé, ceux qui sont morts, leurs noms sont rajouté dans le tableau mort
  for (let k = 0; k < survivants.length; k++) {//boucle survivants , boucle continue tant que k est inferieur au tableau survivant
    if (survivants[k].pointsDeVie <= 0) { //verifie si les points de vie sont inferieur ou egale 0 
      morts.push(survivants[k].nom);//si le survuvant est mort alors son nom au tableau mort en utilisant psuh
    }
  }
  
  if (jason.pointsDeVie <= 0) {
    console.log("les survivants ont gagné !");//si Jason na plus de poitn de vie alors, affiche message
//sinon 
  } else if (survivants.pointsDeVie <= 0) {//si les survivants nont plus de points de vie alors, affiche message + le nombre de mort
    console.log("Jason a gagné !" + morts.join(", "));
  }
   
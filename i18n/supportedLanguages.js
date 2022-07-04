
const fr = {


  // home.js
  connexionAcceuil:'Connexion',
  inscriptionAcceuil:'Inscription',
  contactAcceuil:'Contact',
  textAcceuil:`Application fiable et sécurisée`,
  h1Acceuil:`Envoie Facilement`,

  //connexion.js

  renseigneConnexion:'Renseignez les champs !',
  VerifiezInfo:'Verifiez les informations !',
  soumettre:`Pour des raisons de securité, veuillez nous contacter afin d'obtenir un nouveau mot de passe`,
  //inscription.js
  Inscription:'Inscription',
  pass:'Mot de passe',
  nomInscription:'Nom',
  prenomInscription:'Prenom',
  numeroInscription:'Telephone',
  oups:'Oups, une erreur est survenue lors de votre inscription',
  passDif:'Vous avez entré deux (2) mots de passe differents',
  connexionImpossible:'Impossible de se connecter , veuillez ressayer plus tard !',
  pseudoExiste:'Ce pseudo existe deja',
  passCondition:'Votre mot de passe doit contenir plus de 5 caracteres !',

  //ajouter.js
  verifierBien:'Verifier bien les donnees de la carte ',
  ajouter:'Ajouter',

  //visa.js
  TransTable:' Aucun transfert effectué ',
  dernierTrans:' Derniers Transferts ',
  welcome:'Salut',
  //traitement.js
  demarrer:'Demarrer',
  montant:'Montant',
  clientPhone:'Numero du client',
  ChoixDevise:'Choisissez votre monnaie',
  configuration:'Configuration',
  etape1:'Etape 1',
  montantsuperieur:'Le montant doit etre superieur a 10',
  montantinferieur:'Le montant ne doit pas depasser 1.000.000 XOF',
  remplirBien:'Veillez bien renseigner les champs ',
  transferer:`Envoyer de l'argent`,

  //web.js
  Initialisation:'Initialisation',
  Verification:'Verification',
  Preparation:'Preparation',
  VeriificationTrans:'Verification de transaction',
  Redirection:'Redirection',
  envoieRes:'Envoie de reponse',
  preparationRes1:'Preparation de resultat',
  preparationRes2:'Traitement du resultat',
  erreur : 'Un probleme est survenu lors du traitement des données !',
  preparationRes:'Analyse et verification des informations',
  webRetour :'Retour',
  //resultat.js
  Transfert:'Transfert',
  numeroTikect:'Numero de Tikect',
  TransfertEchec:' Transfert echoué ! ',
  Reesayer:'Acceuil',
  TransfertWin:'Transfert effectué avec Success',


  //connexion internet
  messageInternet:'Activez votre connexion Internet  ',
  TitleInternet:'Connexion Internet',
  RechargePage:`Rechargez l'application`,
  passeOublier:`Mot de passe oublié`,

  // modalAcceuil.js
  information:`Il est important de connaitre notre politique de confidentialité , avant toute inscription sur notre plateforme`,
  lire:`Lire Maintenant`,
  fermer:`FERMER`,

  //parametre.js
  Parametres:`Parametres`,
  Appelez:`Appelez le service client`,
  contacter:`Nous contacter par E-mail`,
  localisation:`Ou sommes nous ? `,
  deconnecter:`Se deconnecter`,
  Partenaires:`Nos Partenaires`,
  PolitiqueConfidentialite:`Politique de confidentialite`,

}

// traduction en anglais

const en = {

    // home.js
    connexionAcceuil:'Login',
    inscriptionAcceuil:'Registration',
    contactAcceuil:'Contact',
    textAcceuil:`Reliable and secure app`,
    h1Acceuil:`Send easily`,


 //connexion.js

  renseigneConnexion:'Fill in the fields!',
  VerifiezInfo:'Check the information!',
  soumettre:`For security reasons, please contact us to obtain a new password.`,
  //inscription.js
  Inscription:'Registration',
  pass:'Password',
  nomInscription:'First Name',
  prenomInscription:'Last Name',
  numeroInscription:'Number Phone',
  oups:'Oops, an error occurred during your registration',
  passDif:'You have entered two (2) different passwords',
  connexionImpossible:'Unable to connect , please try again later !',
  pseudoExiste:'This nickname already exists',
  passCondition:'Your password must contain more than 5 characters!',

  //ajouter.js
  verifierBien:'check card details ',
  ajouter:'Add',
  //traitement.js
  demarrer:'Run',
  montant:'Amount',
  clientPhone:'Customer number',
  ChoixDevise:'Choose your currency',
  configuration:'Configuration',
  etape1:'Step 1',
  montantsuperieur:'The amount must be greater than 10',
  montantinferieur:'The amount must not exceed 1,000,000 XOF',
  remplirBien:'Please fill in the fields correctly.',
  transferer:`Send Money`,

    //visa.js
    TransTable:' Aucun transfert effectué ',
    dernierTrans:'Last Transfert ',
    welcome:'Welcome',
      //web.js
  Initialisation:'Initialization',
  Verification:'Verification',
  Preparation:'Preparation',
  VeriificationTrans:'Transaction Verification',
  Redirection:'Redirect',
  envoieRes:'Send response',
  preparationRes1:'Preparation of result',
  preparationRes2:'Processing of the result',
  erreur : 'A problem occurred while processing the data !',
  preparationRes:'Analysis and verification of information',
  webRetour :'Go To Back',
  //resultat.js
  Transfert:'Transfer',
  numeroTikect:'Ticket number',
  TransfertEchec:' Transfer failed! ',
  Reesayer:' Home ',
  TransfertWin:'Transfer made with Success',

  //connexion internet
  messageInternet:'Activate your internet connection  ',
  TitleInternet:'Internet connection',
  RechargePage:`Reload the app`,
  passeOublier:`Forgot your password`,
  // modalAcceuil.js
  information:`It is important to know our privacy policy, before registering on our platform`,
  lire:`Read Now`,
  fermer:`CANCEL`,


    //parametre.js
    Parametres:`Setting`,
    Appelez:`Call customer service`,
    contacter:`Contact us by E-mail`,
    localisation:`Where are we ? `,
    deconnecter:`Sign out`,
    Partenaires:`Our partners`,
    PolitiqueConfidentialite:`Privacy Policy`,
}



// exporter toutes les constantes langues dans les components specifiques
export { fr, en }
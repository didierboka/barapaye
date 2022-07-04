import update from 'react-addons-update'

const initialState ={
    profil:{
        id:'',
        nom: '',
        prenom: '',
        pseudo: '',
        date: 'N',
        pays: 'N',
        ville: 'N',
        commune: 'N',
        quartier: 'N',
        telephone: '',
        zip:'',
        langue:'Francais',
        sexe:'M',
        email:'',
        files:'',
        items:'loading',
        acces:false
    },
    dataLogin:{
        nom: '',
        prenom: '',
        pseudo: '',
        date: '',
        pays: '',
        ville: '',
        commune: '',
        langue: '',
        quartier: '',
        telephone: '',
        zip:'',
        livre:'',
        dollar:'',
        euro:'',

    },
    dataUser:{
        email: '',
        pseudo: '',
    },
}
// ---------- Inscription de nouvelle utilisateur
const CREATE_ID = 'CREATE_ID'
const CREATE_NOM = 'CREATE_NOM'
const CREATE_PRENOM = 'CREATE_PRENOM'
const CREATE_PSEUDO = 'CREATE_PSEUDO'
const CREATE_TELEPHONE = 'CREATE_TELEPHONE'
const CREATE_ZIP = 'CREATE_ZIP'

const CREATE_DATE = 'CREATE_DATE'
const CREATE_PAYS = 'CREATE_PAYS'
const CREATE_VILLE = 'CREATE_VILLE'
const CREATE_COMMUNE = 'CREATE_COMMUNE'
const CREATE_QUARTIER = 'CREATE_QUARTIER'
const CREATE_EMAIL = 'CREATE_EMAIL'
const CREATE_SEXE = 'CREATE_SEXE'
const CREATE_FILES = 'CREATE_FILES'
const CREATE_ITEMS = 'CREATE_ITEMS'
const CREATE_ACCES = 'CREATE_ACCES'

const CREATE_LIVRE = 'CREATE_LIVRE'
const CREATE_DOLLAR = 'CREATE_DOLLAR'
const CREATE_EURO = 'CREATE_EURO'

export const actionId = (a)=>{
    return{
        type: CREATE_ID,
        payload: a,
    }
}


export const actionNom = (a)=>{
    return{
        type: CREATE_NOM,
        payload: a,
    }
}



export const actionLivre = (a)=>{
    return{
        type: CREATE_LIVRE,
        payload: a,
    }
}


export const actionDollar = (a)=>{
    return{
        type: CREATE_DOLLAR,
        payload: a,
    }
}


export const actionEuro = (a)=>{
    return{
        type: CREATE_EURO,
        payload: a,
    }
}




 export const actionPrenom = (a)=>{
     return{
         type: CREATE_PRENOM,
         payload: a,
     }
 }

 export const actionPseudo = (a)=>{
    return{
        type: CREATE_PSEUDO,
        payload: a,
    }
}


 export const actionTelephone = (a)=>{
    return{
        type: CREATE_TELEPHONE,
        payload: a,
    }
}

export const actionZip = (a)=>{
    return{
        type: CREATE_ZIP,
        payload: a,
    }
}

export const actionAcces = (a)=>{
    return{
        type: CREATE_ACCES,
        payload: a,
    }
}


export const actionDate = (a)=>{
    return{
        type: CREATE_DATE,
        payload: a,
    }
}

export const actionSexe = (a)=>{
    return{
        type: CREATE_SEXE,
        payload: a,
    }
}

// ---------------------------------------
export const actionPays = (a)=>{
    return{
        type: CREATE_PAYS,
        payload: a,
    }
}

export const actionVille = (a)=>{
    return{
        type: CREATE_VILLE,
        payload: a,
    }
}

export const actionCommune = (a)=>{
    return{
        type: CREATE_COMMUNE,
        payload: a,
    }
}

export const actionQuartier = (a)=>{
    return{
        type: CREATE_QUARTIER,
        payload: a,
    }
}

export const actionEmail = (a)=>{
    return{
        type: CREATE_EMAIL,
        payload: a,
    }
}

export const actionFiles = (a)=>{
    return{
        type: CREATE_FILES,
        payload: a,
    }
}

export const actionItems = (a)=>{
    return{
        type: CREATE_ITEMS,
        payload: a,
    }
}
// ---------- Fin de processus d'inscription


// ---------- Authentification de l'utilisateur
const USER_PSEUDO = 'USER_PSEUDO'
const USER_EMAIL = 'USER_EMAIL'

export const actionUserEmail = (a)=>{
    return{
        type: USER_EMAIL,
        payload: a,
    }
}

export const actionUserPseudo = (a)=>{
    return{
        type: USER_PSEUDO,
        payload: a,
    }
}

// ---------- Fin de processus d'authentification

// ------------------------------------------

function reducerProfil(state = initialState, action){
    // let nextState
    switch (action.type) {

        case CREATE_ID:

            return update( 
                state, {
                    profil:{
                        id:{$set:action.payload.idUtilisateur },
                    }
                }
                
            )


        case CREATE_NOM:

            return update( 
                state, {
                    profil:{
                        nom:{$set:action.payload.nomUtilisateur },
                    }
                }
                
            )

            case CREATE_PRENOM:
                return update( 
                    state, {
                        profil:{
                            prenom:{$set:action.payload.prenomUtilisateur },
                        }
                    } 
                )

            case CREATE_PSEUDO:
                return update( 
                    state, {
                        profil:{
                            pseudo:{$set:action.payload.pseudoUtilisateur },
                        }
                    } 
                )

                case CREATE_LIVRE:
                    return update( 
                        state, {
                            profil:{
                                livre:{$set:action.payload.livreUtilisateur },
                            }
                        } 
                    )

                case CREATE_DOLLAR:
                    return update( 
                        state, {
                            profil:{
                                dollar:{$set:action.payload.dollarUtilisateur },
                            }
                        } 
                    )


                case CREATE_EURO:
                    return update( 
                        state, {
                            profil:{
                                euro:{$set:action.payload.euroUtilisateur },
                            }
                        } 
                    )



                case CREATE_TELEPHONE:
                    return update( 
                        state, {
                            profil:{
                                telephone:{$set:action.payload.telephoneUtilisateur },
                            }
                        } 
                    )

                case CREATE_FILES:
                    return update( 
                        state, {
                            profil:{
                                files:{$set:action.payload.filesUtilisateur },
                            }
                        } 
                    )

                case CREATE_ITEMS:
                    return update( 
                        state, {
                            profil:{
                                items:{$set:action.payload.itemsUtilisateur },
                            }
                        } 
                    )

                    case CREATE_ACCES:
                        return update( 
                            state, {
                                profil:{
                                    acces:{$set:action.payload.accesUtilisateur },
                                }
                            } 
                        )


                    case CREATE_ZIP:
                        return update( 
                            state, {
                                profil:{
                                    zip:{$set:action.payload.zipUtilisateur },
                                }
                            } 
                        )


                    case CREATE_DATE:
                        return update( 
                            state, {
                                profil:{
                                    date:{$set:action.payload.dateUtilisateur },
                                }
                            } 
                        )


                    case CREATE_PAYS:
                        return update( 
                            state, {
                                profil:{
                                    pays:{$set:action.payload.paysUtilisateur },
                                }
                            } 
                        )


                        case CREATE_COMMUNE:
                            return update( 
                                state, {
                                    profil:{
                                        commune:{$set:action.payload.communeUtilisateur },
                                    }
                                } 
                            )


                    case CREATE_VILLE:
                        return update( 
                            state, {
                                profil:{
                                    ville:{$set:action.payload.villeUtilisateur },
                                }
                            } 
                        )


                    case CREATE_QUARTIER:
                        return update( 
                            state, {
                                profil:{
                                    quartier:{$set:action.payload.quartierUtilisateur },
                                }
                            } 
                        )

                        case CREATE_EMAIL:
                            return update( 
                                state, {
                                    profil:{
                                        email:{$set:action.payload.emailUtilisateur },
                                    }
                                } 
                            )


                        case CREATE_SEXE:
                            return update( 
                                state, {
                                    profil:{
                                        sexe:{$set:action.payload.sexeUtilisateur },
                                    }
                                } 
                            )
                        // ---------- Authentification

                        case USER_PSEUDO:
                            return update( 
                                state, {
                                    dataUser:{
                                        pseudo:{$set:action.payload.userPseudo },
                                    }
                                } 
                            )

            
                        case USER_EMAIL:
                            return update( 
                                state, {
                                    dataUser:{
                                        email:{$set:action.payload.userEmail },
                                    }
                                } 
                            )
        default: return state 
    }
}

export default reducerProfil;
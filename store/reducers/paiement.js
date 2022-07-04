import update from 'react-addons-update'

const initialState ={
    depot:{
        nom:'',
        prenom: '',
        pseudo: '',
        numero: '',
        montant: '50',
        email: '',
        devise:'livre',
        quota:'750',
        montantConvertir:'750',
        url :'www.google.com',
        token:'',
        date:'',
        statut:'',

    },

}
// ---------- Inscription de nouvelle utilisateur

const CREATE_NOMP = 'CREATE_NOMP'
const CREATE_DEVISEP = 'CREATE_DEVISEP'
const CREATE_PRENOMP = 'CREATE_PRENOMP'
const CREATE_PSEUDOP = 'CREATE_PSEUDOP'
const CREATE_EMAILP = 'CREATE_EMAILP'
const CREATE_NUMEROP = 'CREATE_NUMEROP'
const CREATE_MONTANT = 'CREATE_MONTANT'
const CREATE_QUOTA = 'CREATE_QUOTA'
const CREATE_TOKEN = 'CREATE_TOKEN'
const CREATE_STATUT = 'CREATE_STATUT'
const CREATE_DATE = 'CREATE_DATE'



const CREATE_MONTANT_CONVERTIR = 'CREATE_MONTANT_CONVERTIR'
const URLWEB= 'URLWEB'



export const actionEmailP = (a)=>{
    return{
        type: CREATE_EMAILP,
        payload: a,
    }
}

export const actionUrlWeb = (a)=>{
    return{
        type: URLWEB,
        payload: a,
    }
}

export const actionDate = (a)=>{
    return{
        type: CREATE_DATE,
        payload: a,
    }
}

export const actionStatut = (a)=>{
    return{
        type: CREATE_STATUT,
        payload: a,
    }
}

export const actionDeviseP = (a)=>{
    return{
        type: CREATE_DEVISEP,
        payload: a,
    }
}

export const actionToken = (a)=>{
    return{
        type: CREATE_TOKEN,
        payload: a,
    }
}


export const actionNomP = (a)=>{
    return{
        type: CREATE_NOMP,
        payload: a,
    }
}

 export const actionPrenomP = (a)=>{
     return{
         type: CREATE_PRENOMP,
         payload: a,
     }
 }

 export const actionPseudoP = (a)=>{
    return{
        type: CREATE_PSEUDOP,
        payload: a,
    }
}

 export const actionNumeroP = (a)=>{
    return{
        type: CREATE_NUMEROP,
        payload: a,
    }
}

 export const actionMontant = (a)=>{
    return{
        type: CREATE_MONTANT,
        payload: a,
    }
}

export const actionQuota = (a)=>{
    return{
        type: CREATE_QUOTA,
        payload: a,
    }
}


export const actionMontantConvertir = (a)=>{
    return{
        type: CREATE_MONTANT_CONVERTIR,
        payload: a,
    }
}



// ---------- Fin de processus d'authentification

function reducerPaiement(state = initialState, action){
    // let nextState
    switch (action.type) {

        case CREATE_EMAILP:

            return update( 
                state, {
                    depot:{
                        email:{$set:action.payload.paiementEmail },
                    }
                }
                
            )


        case CREATE_NOMP:

            return update( 
                state, {
                    depot:{
                        nom:{$set:action.payload.paiementNom },
                    }
                }
                
            )

        case CREATE_DEVISEP:

            return update( 
                state, {
                    depot:{
                        devise:{$set:action.payload.paiementDevise },
                    }
                }
                
            )

            case CREATE_PRENOMP:
                return update( 
                    state, {
                        depot:{
                            prenom:{$set:action.payload.paiementPrenom },
                        }
                    } 
                )

            case CREATE_PSEUDOP:
                return update( 
                    state, {
                        depot:{
                            pseudo:{$set:action.payload.paiementPseudo },
                        }
                    } 
                )

                case CREATE_TOKEN:
                    return update( 
                        state, {
                            depot:{
                                token:{$set:action.payload.paiementToken },
                            }
                        } 
                    )


                case CREATE_STATUT:
                    return update( 
                        state, {
                            depot:{
                                statut:{$set:action.payload.paiementStatut },
                            }
                        } 
                    )
    
                    case CREATE_DATE:
                        return update( 
                            state, {
                                depot:{
                                    date:{$set:action.payload.paiementDate },
                                }
                            } 
                        )

            case CREATE_NUMEROP:
                return update( 
                    state, {
                        depot:{
                            numero:{$set:action.payload.paiementNumero },
                        }
                    } 
                )

                case URLWEB:
                    return update( 
                        state, {
                            depot:{
                                url:{$set:action.payload.paiementUrl },
                            }
                        } 
                    )

            case CREATE_MONTANT:
                return update( 
                    state, {
                        depot:{
                            montant:{$set:action.payload.paiementMontant },
                        }
                    } 
                )

            case CREATE_QUOTA:
                    return update( 
                        state, {
                            depot:{
                                quota:{$set:action.payload.paiementQuota },
                            }
                        } 
                    )
            
            case CREATE_MONTANT_CONVERTIR:
                return update( 
                    state, {
                        depot:{
                            MontantConvertir:{$set:action.payload.paiementMontantConvertir },
                        }
                    } 
                )


        default: return state 
    }
}

export default reducerPaiement;
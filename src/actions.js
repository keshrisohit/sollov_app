import {getAccountData,createProfile,getDataFromIPFS,getAccountAndSpouseData,initiateMarriage,initiateDivorce}from './web3_util'
import Timeout from 'await-timeout';
import { sys } from 'typescript';

export function connectedAction(wallet) {
    return async (dispatch) => {
   
        let response;
        
        try {
            dispatch({type : "NOT_CONNECTED",loading:true,msg:"Connecting Please wait ...."});
            response = await getAccountData(wallet); 
            //dispatch({type : "PROFILE_CREATED",myData:response});
            let myDataAndSpouseData=await getAccountAndSpouseData(wallet)
            dispatch({type : "SPOUSE_DATA_FETCHED",myData:myDataAndSpouseData.myData,spouseData:myDataAndSpouseData.spouseData,loading:false});

                   
        } catch(error) {
              dispatch({type : "PROFILE_NOT_CREATED", error,loading:false});
            return;
        }
        
       // dispatch({type: "CONNECTED", payload: response});
    }
}



export function createProfileAction(wallet,profile_data) {
    return async (dispatch) => {
   
        let response;
        
        try {
            //",loading:true,msg:"Creating Your Profile"});
            dispatch({type : "PROFILE_CREATION_STARTED",loading:true,msg:"Creating Your Profile"});
            response = await createProfile(wallet,{"profile_data":profile_data}); 
            let myDataAndSpouseData=await getAccountAndSpouseData(wallet)
            dispatch({type : "PROFILE_CREATED",myData:myDataAndSpouseData.myData,spouseData:myDataAndSpouseData.spouseData,loading:false});
                   
        } catch(error) {  
            dispatch({type :"PROFILE_CREATED_ERROR",msg:"Error While Creating profile! Check your token balance ,make sure you have selected the correct wallet or Refresh and Retry ", error ,loading:false});
            return;
        }
        console.log('next')    
       // dispatch({type: "CONNECTED", payload: response});
    }
}

export function getAccountAndSpouseDataAction(wallet) {
    return async (dispatch) => {
        
        try {
            let myDataAndSpouseData=await getAccountAndSpouseData(wallet)
            dispatch({type : "SPOUSE_DATA_FETCHED",myData:myDataAndSpouseData.myData,spouseData:myDataAndSpouseData.spouseData});
                        
        } catch(error) {     
            dispatch({type : "ERROR",msg:"Error While Creating profile ", error});
            return;
        }

    }
}


export function initiateMarriageAction(wallet,spousePublicKey) {
    return async (dispatch) => {
       
        let data;
        console.log('Enter spouse publlic key')
        console.log(spousePublicKey)
        try {
            dispatch({type : "MARRIAGE_INITIATED_STARTED",loading:true,msg:"Please wait we are initiating your Marriage"});
            data = await initiateMarriage(wallet,spousePublicKey); 

            console.log("before")

            let myDataAndSpouseData=await getAccountAndSpouseData(wallet)
  
         
            dispatch({type : "MARRIAGE_INITIATED",myData:myDataAndSpouseData.myData,spouseData:myDataAndSpouseData.spouseData,loading:false});
     
  
         
                      
        } catch(error) {
            dispatch({type : "MARRIAGE_INITIATED_ERROR",msg:"Error! Check if your partner has created his/her profile / you have give correct address or Make sure you have selected the correct wallet or Refresh and Retry", error,loading:false});
            return;
        }
        

    }
}

export function initiateDivorceAction(wallet,spousePublicKeys) {
    return async (dispatch) => {
  
          let response;
        
        try {
            console.log('cancel marriage')
            console.log(spousePublicKeys)
            dispatch({type : "DIVORCE_INITIATION_STARTED",loading:true,msg:"Please wait we are initiating your Divorce"});
            response = await initiateDivorce(wallet,spousePublicKeys); 
            let myDataAndSpouseData=await getAccountAndSpouseData(wallet)
               
            dispatch({type : "DIVORCE_INITIATED",myData:myDataAndSpouseData.myData,spouseData:myDataAndSpouseData.spouseData,loading:false});
 
      

            console.log("before")

            // setTimeout(async () => {
            //     console.log("after")
        
     
            //   }, 5000)
   
                     
        } catch(error) {
      
            dispatch({type : "DIVORCE_INITIATION_ERROR",msg:"Error While cancelling the Partnership , Make sure you have selected the correct wallet ,please Refresh and Retry ", error,loading:false});
            return;
        }
        
       // dispatch({type: "CONNECTED", payload: response});
    }
}

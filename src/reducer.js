

export const  weddingReducer = function (state = {"currentState":"NOT_CONNECTED","myData":{},"spouseData":{},"loading":false,"msg":"",error:false}, action) {

    console.log("Action is")
    console.log(action.type)
    switch (action.type) {
      case "NOT_CONNECTED":
        return {...state,"currentState":"NOT_CONNECTED",loading:action.loading,msg:action.msg,error:false} ;
      case "CONNECTED":
        return {"currentState":"CONNECTED"};
        case "PROFILE_NOT_CREATED":
        return {...state ,"currentState":"PROFILE_NOT_CREATED",loading:action.loading,error:false};
        case "LOADING":
            return {...state,"currentState":"LOADING"};
        case "PROFILE_CREATED":
            console.log(action)
        return {"currentState":"PROFILE_CREATED","myData":action.myData,"spouseData":{},loading:action.loading,error:false};
        case "PROFILE_CREATION_STARTED":
            console.log(action)
        return {...state,"currentState":"PROFILE_NOT_CREATED",loading:action.loading,msg:action.msg,error:false};
        case "PROFILE_CREATED_ERROR":
            console.log(action)
        return {...state,"currentState":"PROFILE_NOT_CREATED",loading:action.loading,msg:action.msg,error:true};
        case "SPOUSE_DATA_FETCHED":
            console.log(action)
        return {"currentState":"SPOUSE_DATA_FETCHED","myData":action.myData,"spouseData":action.spouseData,loading:action.loading,error:false};
        case "MARRIAGE_INITIATED":
            console.log(action)
        return {"currentState":"MARRIAGE_INITIATED","myData":action.myData,"spouseData":action.spouseData,loading:action.loading,error:false};
        case "MARRIAGE_INITIATED_STARTED":
        return {...state,"currentState":"MARRIAGE_INITIATED_STARTED",loading:action.loading,msg:action.msg,error:false};
        case "MARRIAGE_INITIATED_ERROR":
            return {...state,"currentState":"MARRIAGE_INITIATED_ERROR",loading:action.loading,msg:action.msg,error:true};
        case "DIVORCE_INITIATED":
            console.log(action)
        return {"currentState":"DIVORCE_INITIATED","myData":action.myData,"spouseData":action.spouseData,loading:action.loading,error:false};
        case "DIVORCE_INITIATION_STARTED":
            console.log(action)
        return {...state,"currentState":"DIVORCE_INITIATION_STARTED",loading:action.loading,msg:action.msg,error:false};
        case "DIVORCE_INITIATION_ERROR":
            console.log(action)
        return {...state,"currentState":"DIVORCE_INITIATION_ERROR",loading:false,msg:action.msg,error:true};
        case "INPUT_CHANGE":
            console.log("action payload")
            console.log(action.payLoad)
        return {
            ...state,
            value: action.payLoad
        }
        case "ERROR":
         return {
             ...state,msg:action.msg,loading:false,
         }
      default:
        return state;
    }
  };
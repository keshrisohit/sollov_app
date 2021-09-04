import LoginPage from '../views/examples/LoginPage';

import React,{ Component } from "react";
import { connect } from 'react-redux';
import {connectedAction }from '../actions'
import CreateEditProfile from './CreateEditProfile';
import WeddingDashBoard from './WeddingDashBoard';
import LoadingOverlay from 'react-loading-overlay';


class WeedingLandingPage extends Component{



 

 

    render(){
      //     console.log(window.solana)
//     window.solana.connect();
      console.log(this.props.currentState)
       window.solana.on("connect", () => this.props.handleConnected())
       

      //let walletPublicKey=window.solana.publicKey;
     // let accountData= getAccountData(walletPublicKey)
     let  landingPageView=<h1>Loading ...... </h1>
      // if(this.props.currentState=="LOADING"){
     
      // }
  
       if(this.props.currentState=="CONNECTED"){
        // this,props.state='connected'
  
        landingPageView=<h1>Connected</h1>
    
  
      }
      else if(this.props.currentState=="PROFILE_NOT_CREATED"){
        landingPageView=<LoadingOverlay
        active={this.props.loading}
        spinner
        text={this.props.msg}
        ><div><CreateEditProfile/></div></LoadingOverlay>

      }

      else if(this.props.currentState=="NOT_CONNECTED"){

        landingPageView= <LoadingOverlay
        active={this.props.loading}
        spinner
        text={this.props.msg}
        >
          <div><LoginPage/></div>
          </LoadingOverlay>
  
      }

      else {
        // this,props.state='Not connected'
        
        landingPageView= <LoadingOverlay
        active={this.props.loading}
        spinner
        text={this.props.msg}
        ><div><WeddingDashBoard/></div>  </LoadingOverlay>
    
      }


        return (
           
          <div> {landingPageView}</div>
          
       
       )
    }
}

const mapStateToProps = state => {
  console.log("heree in index")
  console.log(state)
  return {
    currentState: state.wedding.currentState,
    accountData: state.wedding.accountData,
    spouseData: state.wedding.spouseData,
    loading:state.wedding.loading,
    msg:state.wedding.msg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleConnected: () => dispatch(connectedAction(window.solana)),
    handleDisConnected: () => dispatch({
      type: 'NOT_CONNECTED',
    })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WeedingLandingPage);


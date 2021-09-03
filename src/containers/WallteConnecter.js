import * as solanaWeb3 from '@solana/web3.js';
import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import LoginPage from '../views/examples/LoginPage';

import React,{ Component } from "react";
import { connect } from 'react-redux';
import Wallet from 'components/wallet';


class WalletConnector extends Component{




 

    render(){
        console.log('here')
      if(window.solana && window.solana.publicKey){
        this.props.handleConnected()
        
  
      }
      else {
        this.props.handleDisConnected()
      }


        return (
          <div></div>
       
       )
    }
}

const mapStateToProps = state => {
  return {
    currentState: state.currentState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleConnected: () => dispatch({
      type: 'CONNECTED',
    }),
    handleDisConnected: () => dispatch({
      type: 'NOT_CONNECTED',
    })
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(WalletConnector);


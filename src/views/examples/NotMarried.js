import * as solanaWeb3 from '@solana/web3.js';
import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';


import React,{ Component } from "react";
import { connect } from 'react-redux';
import Wallet from 'components/wallet';
import { createProfileAction,getAccountAndSpouseDataAction,initiateMarriageAction,initiateDivorceAction } from 'actions';
import { isMarried } from 'web3_util';
import ProfilePageHeader from 'components/Headers/ProfilePageHeader';
import IndexHeader from 'components/Headers/IndexHeader';
import LandingPageHeader from 'components/Headers/LandingPageHeader';



class NotMarried extends Component{



    // componentWillMount(){
    //     this.props.populateAccountAndSpouseData()
    //     this.setState()
    // }
    

    render(){

        let dashboard_view=<h1>Loading... {this.props.name}</h1>
        return (
          <div>
              <nav class="navbar navbar-expand-lg navbar-light bg-primary">
                <div class="container">
                <a class="navbar-brand" >Love Is for Ever</a>
                </div>
            </nav>
          
            {dashboard_view} 
        </div>
       
       )
    }
}



export default NotMarried;


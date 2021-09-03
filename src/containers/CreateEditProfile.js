import * as solanaWeb3 from '@solana/web3.js';
import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import LoginPage from '../views/examples/LoginPage';

import React,{ Component } from "react";
import { connect } from 'react-redux';
import Wallet from 'components/wallet';
import { createProfileAction } from 'actions';
import LoginForm from 'components/LoginForm';
import LandingPageHeader from 'components/Headers/LandingPageHeader';
import { DirectionsBike } from '@material-ui/icons';
import { UncontrolledAlert } from 'reactstrap';
import TransparentFooter from 'components/Footers/TransparentFooter';
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';


class CreateEditProfile extends Component{



    submit=(value)=>{
        console.log("form values")
        console.log(value)
        this.props.handleCreateProfile(value)
    }
 

    render(){
        let failure=<div></div>
        if(this.props.error)
        {
          //   failure=<div class="alert alert-danger" role="alert">
          //   <div class="container">
          //     <div class="alert-icon">
          //       <i class="now-ui-icons"></i>
          //     </div>
          //     <strong>Error!</strong> Please Make Sure your wallet has enough balance or retry Again
          //     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          //       <span aria-hidden="true">
          //         <i class="now-ui-icons ui-1_simple-remove"></i>
          //       </span>
          //     </button>
          //   </div>
          // </div>
          failure=<UncontrolledAlert color="danger">
          <b>{this.props.msg} </b> 
      </UncontrolledAlert>
        }
        return (
          <div>
              {/* <nav class="navbar navbar-expand-lg navbar-light bg-primary">
                <div class="container">
                <a class="navbar-brand" >Love Is for Ever</a>
                </div>
            </nav> */}
                    <ExamplesNavbar/>
            <LandingPageHeader />
            {failure}
            <h3>Create Profile</h3>
             
            <LoginForm onSubmit={this.submit} />
            <TransparentFooter/>
        </div>
       
       )
    }
}

const mapStateToProps = state => {
  return {
    currentState: state.wedding.currentState,
    error:state.wedding.error,
    msg:state.wedding.msg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCreateProfile: (value) => dispatch(createProfileAction(window.solana,value)),
    handleDisConnected: () => dispatch({
      type: 'NOT_CONNECTED',
    })
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateEditProfile);


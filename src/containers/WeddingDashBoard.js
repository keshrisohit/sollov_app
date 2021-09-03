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

import Certificate   from './certificate/cert';
import DownloadCert from './certificate/downloadCert';
import { UncontrolledAlert } from 'reactstrap';
import TransparentFooter from 'components/Footers/TransparentFooter';
import CompleteExamples from 'views/index-sections/CompleteExamples';
import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';



class WeddingDashboard extends Component{



    // componentWillMount(){
    //     this.props.populateAccountAndSpouseData()
    //     this.setState()
    // }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    render(){
        
        console.log(this.props.currentState)
        console.log(this.props.myData )
        console.log(this.props.spouseData)
        console.log(this.state)
        const initDivroce=this.props.myData.accountData.initDivorce
        
        //console.log(this.props.myData.accountData.spouse.toString() )
        //console.log(this.props.spouseData.accountData.spouse.toString())

        let dashboard_view=<h1>Loading...</h1>
        let failure=<div></div>
        if(this.props.error)
        {
           failure=<UncontrolledAlert color="danger">
           <b>{this.props.msg} </b> 
       </UncontrolledAlert>
        }

        if (Object.keys(this.props.spouseData).length ==0 )
        {
            //Not married  no sposue found or divorced
            //|| (initDivroce && !isMarried(window.solana,this.props.spouseData)  this guys has selected the partner 
             dashboard_view=<div>  

                <div class="card text-center">
                <div class="card-header mt-2">
                     <h3>Hi {this.capitalizeFirstLetter(this.props.myData.profileData.name)} <br/>Address: {this.props.myData.accountData.authority.toString()}</h3>
                </div>
                <div class="card-body">
                    <h4 class="card-title">Let's get you Married</h4>
                    <p class="card-text">Please Enter your spouse unique Identifier(Wallet Address) here</p>
                    <input onChange={ (e) => this.props.onSearchTermChange(e.target.value)} value={this.props.inputValue}  />
                    <button type="button" class="btn btn-primary" onClick={()=>this.props.handleInitMarriage(this.props.inputValue)}>Marry</button>
                </div>
                <div class="card-footer text-muted mb-2">
                    
                </div>
                </div>
                            

           
            </div>

             
        }
        else
        {   
            //divorce one guy have to initalize it and then bot the people need to accept it
            
            const spouseInitDivorce=this.props.spouseData.accountData.initDivorce
            let title=""
            let text=""
            let button=""
            if(spouseInitDivorce)
            {
                //Spouse has init the divorce you can finalize it, or if you have initialize and spouse has accepted and you  ar eno married anymore but  then you have to also finalize it from you side to mry again
                title= <h4 class="card-title">Ughhh Sorry! Your Spouse <b>{this.capitalizeFirstLetter(this.props.spouseData.profileData.name.toString())}</b> <br/>({this.props.spouseData.accountData.authority.toString()})</h4>
                text=  <p class="card-text">has initiated the divorce <br/></p> 
                button=<button type="button" class="btn btn-primary" onClick={()=>this.props.handleInitDivorce(this.props.myData.accountData.spouse)}>Finalize Divorce</button>
            }
            else if(initDivroce)
            {
                title= <h4 class="card-title">Ughhh You have initialized divorce with your spouse <b>{this.capitalizeFirstLetter(this.props.spouseData.profileData.name.toString())}</b> <br/>({this.props.spouseData.accountData.authority.toString()})</h4>
                text=  <p class="card-text">  <br/></p> 
                button=<button type="button" class="btn btn-primary disabled">Divorce Initiated</button>
            }
            else{
                title= <h4 class="card-title">Congratualtions!! you are married to <b>{this.capitalizeFirstLetter(this.props.spouseData.profileData.name.toString())}</b> <br/>({this.props.spouseData.accountData.authority.toString()})</h4>
                text=  <p class="card-text"> You can download your ceritifcate<br/></p> 
                button=<button type="button" class="btn btn-primary disabled" onClick={()=>this.props.handleInitDivorce(this.props.myData.accountData.spouse)}>Initalize Divorce</button>
            }
            if(isMarried(window.solana,this.props.spouseData))
            {
                dashboard_view=<div>  

                <div class="card text-center">
                <div class="card-header mt-2">
                     <h3>Hi <b>{this.capitalizeFirstLetter(this.props.myData.profileData.name)}</b> <br/>Address: {this.props.myData.accountData.authority.toString()}</h3>
                </div>
                <div class="card-body">
                   {title}
                   {text}
                   {button}
                 
                </div>
                <div class="card-footer text-muted mb-2">
                    
                </div>
                </div>

                <DownloadCert name={this.props.myData.profileData.name} spouseName={this.props.spouseData.profileData.name.toString()} key1={this.props.myData.accountData.authority.toString()} key2={this.props.spouseData.accountData.authority.toString()} >
                            
                            </DownloadCert>
           
            </div>
            }
            else{

                if(initDivroce)
                {
                    //Not maaried but init divorce that mean previous maariage is not settled finalize it first
                    title= <h4 class="card-title">Ughhh Sorry! Your Spouse has finalized the divorce <b>{this.capitalizeFirstLetter(this.props.spouseData.profileData.name.toString())}</b> <br/>({this.props.spouseData.accountData.authority.toString()})</h4>
                    text=  <p class="card-text"> You need to finalize it too <br/></p> 
                    button=<button type="button" class="btn btn-primary" onClick={()=>this.props.handleInitDivorce(this.props.myData.accountData.spouse)}>Finalize Divorce</button>
                    dashboard_view=<div>  

                    <div class="card text-center">
                    <div class="card-header mt-2">
                         <h3>Hi <b>{this.capitalizeFirstLetter(this.props.myData.profileData.name)}</b> <br/>Address: {this.props.myData.accountData.authority.toString()}</h3>
                    </div>
                    <div class="card-body">
                       {title}
                       {text}
                       {button}
                     
                    </div>
                    <div class="card-footer text-muted mb-2">
                        
                    </div>
                    </div>
    
                    <DownloadCert name={this.props.myData.profileData.name} spouseName={this.props.spouseData.profileData.name.toString()} key1={this.props.myData.accountData.authority.toString()} key2={this.props.spouseData.accountData.authority.toString()} >
                                
                                </DownloadCert>
               
                </div>




                }
                else{

                    dashboard_view=<div>  

                    <div class="card text-center">
                    <div class="card-header mt-2">
                         <h3>Hi {this.props.myData.profileData.name} <br/>Your Address: {this.props.myData.accountData.authority.toString()}</h3>
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">Your Partner <b>{this.props.spouseData.profileData.name} </b>is yet to accepted your Proposal</h4> <br/>Partner Address: {this.props.spouseData.accountData.authority.toString()}
                        <p class="card-text">Let's wait for it <br/> or</p>
                        <button type="button" class="btn btn-primary" onClick={()=>this.props.handleInitDivorce(this.props.myData.accountData.spouse)}>Cancel Proposal</button>
                    </div>
                    <div class="card-footer text-muted mb-2">
                        
                    </div>
                    </div>
                    </div>
                }

                            

           
           
            }
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
            <br/>
            

            {dashboard_view} 
            <TransparentFooter/>
        </div>
       
       )
    }
}

const mapStateToProps = state => {
  return { 
    currentState: state.wedding.currentState,
    myData: state.wedding.myData,
    spouseData:state.wedding.spouseData,
    inputValue: state.wedding.value,
    error:state.wedding.error,
    msg:state.wedding.msg
  };
};

const mapDispatchToProps = dispatch => {
  return {
   handleInitMarriage: (spousePublicKey) => dispatch(initiateMarriageAction(window.solana,spousePublicKey)),
   handleInitDivorce: (spousePublicKey) => dispatch(initiateDivorceAction(window.solana,spousePublicKey)),
   onSearchTermChange: (value) =>dispatch({
        type: "INPUT_CHANGE",
        payLoad: value
      })
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(WeddingDashboard);


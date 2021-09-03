
import { ContactsOutlined } from '@material-ui/icons';
import * as anchor from '@project-serum/anchor'
import * as solanaWeb3 from '@solana/web3.js';
import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import { Keypair, LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import Timeout from 'await-timeout';

const PROGRAM_ID="FCyBRCbnCKee7NLBTn2mD4NoXJD2wmxeCMMEwbA358WL"
const IPFS_URL="https://l3b0bab8zd.execute-api.ap-south-1.amazonaws.com/dev/ipfs"
const CONNECTION_URL="https://api.devnet.solana.com"

const axios = require('axios')

var connection = new Connection(clusterApiUrl('devnet'));


function getKeyPair(wallet){
    return  getKeyPairByPublicKey(wallet.publicKey)
}

function getKeyPairByPublicKey(publicKey){
    return anchor.web3.Keypair.fromSeed(new Uint8Array(Object.assign([],publicKey.toString().slice(7,39))))
}

function cleanProfileDataIPFSUrl(profileDataIPFSUrl){
    let ipsUrlWithAppendedData = String.fromCharCode.apply(null, profileDataIPFSUrl);
    console.log("ipfs data from account")
    console.log(ipsUrlWithAppendedData)
    let ipfsUrl=ipsUrlWithAppendedData.slice(0,-18)
    console.log(ipfsUrl) 
    return ipfsUrl
}

function getAnchorProgram(wallet){
    
  
    console.log("solana")
    console.log(window.solana)
    let provider = new anchor.Provider(connection,window.solana,{
        preflightCommitment: "finalized",
        commitment: "finalized",
      })
    let idl={
        "version": "0.0.0",
        "name": "wed_program",
        "instructions": [
          {
            "name": "create",
            "accounts": [
              {
                "name": "myAccount",
                "isMut": true,
                "isSigner": false
              }
            ],
            "args": [
              {
                "name": "authority",
                "type": "publicKey"
              },
              {
                "name": "profileData",
                "type": {
                  "array": [
                    "u8",
                    64
                  ]
                }
              }
            ]
          },
          {
            "name": "marry",
            "accounts": [
              {
                "name": "myAccount",
                "isMut": true,
                "isSigner": false
              },
              {
                "name": "spouseAccount",
                "isMut": false,
                "isSigner": false
              },
              {
                "name": "authority",
                "isMut": false,
                "isSigner": true
              }
            ],
            "args": []
          },
          {
            "name": "update",
            "accounts": [
              {
                "name": "myAccount",
                "isMut": true,
                "isSigner": false
              },
              {
                "name": "authority",
                "isMut": false,
                "isSigner": true
              }
            ],
            "args": [
              {
                "name": "profileData",
                "type": {
                  "array": [
                    "u8",
                    64
                  ]
                }
              }
            ]
          },
          {
            "name": "divorce",
            "accounts": [
              {
                "name": "myAccount",
                "isMut": true,
                "isSigner": false
              },
              {
                "name": "authority",
                "isMut": false,
                "isSigner": true
              },
              {
                "name": "spouseAccount",
                "isMut": false,
                "isSigner": false
              }
            ],
            "args": []
          }
        ],
        "accounts": [
          {
            "name": "WedAccount",
            "type": {
              "kind": "struct",
              "fields": [
                {
                  "name": "authority",
                  "type": "publicKey"
                },
                {
                  "name": "count",
                  "type": "u64"
                },
                {
                  "name": "spouse",
                  "type": "publicKey"
                },
                {
                  "name": "initDivorce",
                  "type": "bool"
                },
                {
                  "name": "profileData",
                  "type": {
                    "array": [
                      "u8",
                      64
                    ]
                  }
                }
              ]
            }
          }
        ],
        "metadata": {
          "address": "8Vw5UhFpKMqixE94GGRtXnhLpEQix2sJwXwCQNCrmkfE"
        }
      }
    let program=new anchor.Program(idl
    , new solanaWeb3.PublicKey(PROGRAM_ID), provider)

  return program
}



export async function getAccountData(wallet){
    let program=getAnchorProgram(wallet)
    let keypair=getKeyPair(wallet)
    let accountData=await program.account.wedAccount.fetch(keypair.publicKey)
    let ipfsUrl=cleanProfileDataIPFSUrl(accountData.profileData)
    let profileData= await getDataFromIPFS(ipfsUrl)

    return {"accountData":accountData,"profileData":profileData}
}

export async function getAccountAndSpouseData(wallet){
    let program=getAnchorProgram(wallet)
    let keypair=getKeyPair(wallet)
    let spouseData={}

    let myData=await getAccountData(wallet)
    console.log("here my data")
    console.log(myData)
    if ( myData.accountData.spouse.toString() == keypair.publicKey.toString()){
        //not married no posue data is there
        console.log("not populating spouse data")
    }
    else
    {
        let spouseAccountData=await program.account.wedAccount.fetch(myData.accountData.spouse)
        let ipfsUrl=cleanProfileDataIPFSUrl(spouseAccountData.profileData)
        let spouseProfileData= await getDataFromIPFS(ipfsUrl)
        spouseData=  {"accountData":spouseAccountData,"profileData":spouseProfileData}
    }
    //reconstituted = String.fromCharCode.apply(null, counterAccount.profileData);
    console.log("Returning")
    console.log({"myData":myData,"spouseData":spouseData})
    return {"myData":myData,"spouseData":spouseData}
}


export async function createProfile(wallet,profile_data){
    let program=getAnchorProgram(wallet)
    let reposne=await saveDataInIPFS(profile_data)

    console.log("got back the ipfs saved data url")
    console.log(reposne.data.path)
    console.log(reposne.data.path.length)
    console.log("pub key")
    console.log(wallet.publicKey.toString().length)
   
    let ipfs_profile_data_path=reposne.data.path
    let dummy_data_to_append="____________________"
    let keypair=getKeyPair(wallet)
    let response=await createAccountInProgram(program,wallet.publicKey,keypair, Buffer.from(ipfs_profile_data_path+dummy_data_to_append, 'utf8'))
    return response


}

 async function createAccountInProgram(program,authorityPublicKey,accountKeyPair,profile_data)
{
    let response=await program.rpc.create(authorityPublicKey,profile_data, {
        accounts: {
          myAccount: accountKeyPair.publicKey,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        },
        signers: [accountKeyPair],
        instructions: [await program.account.wedAccount.createInstruction(accountKeyPair)],
      })

      return response
}

  async function saveDataInIPFS(profile_data)
{
    console.log('saving data to ipfs')
    console.log(profile_data)
    let response=await axios.post(IPFS_URL,profile_data)
    return response

}

export async function getDataFromIPFS(ipfsAddress){
    let response=await axios.get(IPFS_URL+"?id="+ipfsAddress);
    return response.data

}

export async function initiateMarriage(wallet,spouse2PublicKey)
{
    let program=getAnchorProgram(wallet)
    let keypair=getKeyPair(wallet)
    let spouseKeyPair=getKeyPairByPublicKey(spouse2PublicKey)
    let response=await program.rpc.marry({
        accounts: {
          myAccount: keypair.publicKey,
          authority: wallet.publicKey,
          spouseAccount: spouseKeyPair.publicKey,
        },
      })
    return response
}

export async function initiateDivorce(wallet,spouse2PublicKey){
    //spouse1 is initiating the divorce
    // if marriage is not yet finalized it will cancel the initialization of marriage by spouse1 
    let program=getAnchorProgram(wallet)
    let keypair=getKeyPair(wallet)
    console.log('div2')
   // let spouseKeyPair=getKeyPair(spouse2PublicKey)
    let response=await program.rpc.divorce({
        accounts: {
          myAccount: keypair.publicKey,
          authority: wallet.publicKey,
          spouseAccount: spouse2PublicKey,
        },
      })

      return response

}
export  function isMarried(walllet,spouseData){
    
    if(spouseData.accountData.spouse.toString()==getKeyPair(walllet).publicKey.toString())
        return true
    
        return false
    
}

// export  function isDivorceSettled(walllet,spouseData){
    
//     if(spouseData.accountData.spouse.toString()==getKeyPair(walllet).publicKey.toString())
//         return true
    
//         return false
    
// }

// export  function isPartnerMarried(walllet,spouseData){
    
//     if(spouseData.accountData.spouse.toString()==getKeyPair(walllet).publicKey.toString())
//         return true
    
//         return false
    
// }

function getAllAccountsOfProgram(){

}


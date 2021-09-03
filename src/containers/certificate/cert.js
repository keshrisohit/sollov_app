
import React,{ Component } from "react";
import { connect } from 'react-redux';
import './cert.css'


class Certificate extends Component{


    render(){

       return  ( <div class="content">
       <div class="certificate-wrapper frame">
         <div class="certificate">
           <div class="certificate__header">
             <div class="certificate__title title-decoration">
               <span class="title-decoration__main">Certificate</span>
               <span class="title-decoration__sub">of Marriage</span>
             </div>
           </div>
           <div class="certificate__body">
             <div class="certificate__description">This is to certify that</div>
             <div class="certificate__recipient-name">{this.props.name}</div>
             <div class="certificate__description">and</div><div class="certificate__recipient-name">{this.props.spouseName}</div>  got digitally married on  
             <div class="ribbon certificate__content">Marriage Bureau of Solana</div>
             <div class="certificate__description"> and promise to abide by all rules</div>
           </div>
           <div class="certificate__footer">
             {/* <div class="certificate__date entry-column"><span class="entry-column__input"><time datetime="1970-01-01">[DATE]</time>.</span><span class="entry-column__label">completed on </span></div> */}
             <div class="certificate__signature entry-column"><span class="entry-column__input">{this.props.key1} {this.props.key2}</span><span class="entry-column__label">Digitally Signed by both Parties </span></div>
           </div>
         </div>
       </div>
       </div>
  
       )
    }
}

export default Certificate


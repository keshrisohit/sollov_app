
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import React from 'react';
import Certificate from './cert';

// class ComponentToPrint extends React.Component {
//  render() {
//    return <div>Hello World</div>;
//  }
// }
export default class DownloadCert extends React.Component {
    constructor(props) {
      super(props);
      this.componentRef = React.createRef();
    }
   
    render() {
      return (
        <React.Fragment>
        <div>
          <div  style={ {display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <button class="btn btn-primary btn-sm" onClick={() => exportComponentAsJPEG(this.componentRef)}>
            Download As JPEG
          </button>
          <button class="btn btn-primary btn-sm" onClick={() => exportComponentAsPDF(this.componentRef)}>
            Download As PDF
          </button>
          <button class="btn btn-primary btn-sm" onClick={() => exportComponentAsPNG(this.componentRef)}>
            Download As PNG
          </button>
          <button class="btn btn-primary btn-sm" >
            Create NFT(Coming soon..)
          </button>
          </div>
          <Certificate name={this.props.name} spouseName={this.props.spouseName} key1={this.props.key1} key2={this.props.key2} ref={this.componentRef} />
        </div>
        </React.Fragment>
      );
    }
   }
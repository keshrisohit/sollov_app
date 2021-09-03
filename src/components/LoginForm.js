import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class LoginForm extends Component {
  render () {
    const {handleSubmit} = this.props;
    return (
    //   <form onSubmit={handleSubmit}>
    //        <div class="form-group">
    //     <Field
    //       name="username"
    //       component="input"
    //       type="text"
    //       placeholder="Username"
    //     />
    //     <Field
    //       name="password"
    //       component="input"
    //       type="password"
    //       placeholder="Password"
    //     />
    //     <button type="submit" label="submit">Submit</button>
    //     </div>
    //   </form>
    <form onSubmit={handleSubmit}>
    {/* <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <Field name="email" type="email" component="input" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <Field  name="password"   component="input" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
    </div>
  
  
    <button type="submit" class="btn btn-primary">Submit</button>
  </form> */}


  <div class="form-row">
  <div class="form-group col-md-6">
      <label for="name">Name</label>
      <Field name="name" type="text" component="input" class="form-control" id="inputPassword4" placeholder="Name" required/>
    </div>
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <Field name="email" type="email" component="input" class="form-control" id="inputEmail4" placeholder="Email"/>
    </div>
 
  </div>
  <div class="form-group">
    <label for="inputAddress">Address</label>
    <Field name="inputAddress" type="text" class="form-control" component="input" id="inputAddress" placeholder="1234 Main St"/>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <Field  name="inputCity" type="text" class="form-control" id="inputCity" component="input" />
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <Field name="inputZip" type="text" class="form-control" id="inputZip" component="input"/>
    </div>

  </div>
  <button type="submit" class="btn btn-primary">Create Profile</button>
</form>

    );
  }
}

LoginForm = reduxForm ({
  form: 'login',
}) (LoginForm);

export default LoginForm;
  import React, { Component } from 'react'
  import Button from '../../components/UI/Button/Button'
  import Spinner from '../../components/UI/Spinner/Spinner'
  import classes from './Auth.module.css'
  import axios from '../../axios-order'
  import Input from '../../components/UI/Input/Input';
  import withErrorHandler from '../withErrorHandle/withErrorHandle'
  import { connect } from 'react-redux'
  import * as authactions from '../../store/actions'
  import { Redirect } from 'react-router-dom'

  class ContactDetail extends Component {
    state = {
        control: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
			password:{
			elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: ''			
			}
        },
		isSignup:true
    }
	
	componentDidMount(){
	 if(!this.props.isbuilding && this.props.authredirect !== '/')
		{	
			this.props.OnSetAuthRedirect()
		}
	}

    inputChangedHandler = (event, inputIdentifier) => {
            const updatedControl = {
                ...this.state.control
            };
            const updatedFormElement = {
                ...updatedControl[inputIdentifier]
            };
            updatedFormElement.value = event.target.value;
            updatedControl[inputIdentifier] = updatedFormElement;
            this.setState({control: updatedControl});
    }

  signHandler = () =>{
	this.setState(prevState =>{
	return{isSignup:!prevState.isSignup}
	})
  }

	onsubmitHandler = (event) =>{
		event.preventDefault()
		this.props.OnSubmit(this.state.control.email.value,this.state.control.password.value,this.state.isSignup)
	}

    render() {

	  let authredirect = null
	  if(this.props.isAuthenticated)
	  {	
		authredirect = <Redirect to = { this.props.authredirect } />
	  }

		const formElementsArray = [];
		for (let key in this.state.control) {
			formElementsArray.push({
				id: key,
				config: this.state.control[key]
			});
		}

      let form = formElementsArray.map(formElement => (
					<Input
					key={formElement.id}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					changed={(event) => this.inputChangedHandler(event, formElement.id)} />
				))
	  if(this.props.loading)
	  {
	  form = (<Spinner />)
	  }

	  
      return (
	  
        <div className={classes.Control}>
		{authredirect}
          <h5>Enter Your Credentials</h5>
		  <form onSubmit={this.onsubmitHandler}>
			{form}
			<Button  btnType="Success">Submit</Button>
		  </form>
		  <Button btnType="Danger" clicked={this.signHandler}>Siwtch to {this.state.isSignup?'SIGNIN':'SIGNUP'}</Button>
        </div>
      )
    }
  }

  const mapStateToProps = state =>{
	return {
		loading:state.auth.loading,
		isAuthenticated: state.auth.token !== null,
		authredirect:state.auth.authredirect,
		isbuilding:state.burger.isbuilding
	}
  }


  const mapDispatchToProps = dispatch =>{
  	  return{
		OnSubmit:(email,password,isSignup)=>dispatch(authactions.authinit(email,password,isSignup)),
		OnSetAuthRedirect:()=>dispatch(authactions.authredirect('/'))
	  }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactDetail,axios))

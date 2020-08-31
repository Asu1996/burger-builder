import React, {Component} from 'react'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import classes from './ContactData.module.css'

class contactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'YourName?'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'YourStreet?'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'YourZipCode?'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'YourCountry?'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'YourEmail?'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod : {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {vaule: 'fastest', displayValue: 'Fastest'},
                        {vaule: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                valid:true,
                validation: {},

            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
           this.setState({loading: true});
           const formData = {};
           for(let formElementIdentifier in this.state.orderForm) {
               formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
           }
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.price,
                orderData: formData
            }
        axios.post('/orders.json', order)
        .then(response => {this.setState({loading: false,})
                            this.props.history.push('/')})
        .catch(error => {this.setState({loading: false,})});
    }

    checkValidity(value, rules) {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        } 
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }  
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updtaedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {...updtaedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updtaedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedFormElement) {
            formIsValid = updatedFormElement[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm:updtaedOrderForm, formIsValid: formIsValid});
    }

    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                    ))}
                    <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER!!!</Button>
                </form>
        );
        if (this.state.loading) {
            form = <Spinner />; 
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data!</h4>
                {form}
            </div>
        );
    }

}

export default contactData;
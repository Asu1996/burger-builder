import React, {Component} from 'react'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

import classes from './ContactData.module.css'

class contactData extends Component {

    state = {
        name:'',
        email:'',
        address: {
            street:'',
            postalCode: '' 
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
           this.setState({loading: true});
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.price,
                customerdata: {
                    name: 'alpha',
                    address: {
                        street: 'unit 69',
                        zipCode: '690069',
                        country: 'pakistan'
                    },
                    email: 'chod@chut.com'
                },
            deliveryMethod : 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {this.setState({loading: false,})
                            this.props.history.push('/')})
        .catch(error => {this.setState({loading: false,})});
    }

    render() {

        let form = (
            <form>
                    <input className={classes.Input} type='text' name='Name' placeholder='Your Name'/>
                    <input className={classes.Input} type='email' name='email' placeholder='Your Email'/>
                    <input className={classes.Input} type='text' name='street' placeholder='Your street'/>
                    <input className={classes.Input} type='text' name='postal' placeholder='Postal Code'/>
                    <Button btnType='Success' clicked={this.orderHandler}>ORDER!!!</Button>
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
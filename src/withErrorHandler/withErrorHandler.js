import React, {Component} from 'react'

import Modal from '../components/UI/Modal/Modal'
import Aux from '../hoc/Aux'


const withErrorHandler = (WrappedContent, axios) => {
    return class extends Component {

        state = {
            error: null
        };

        componentDidMount () {

            axios.interceptors.request.use( req=> {
                this.setState({error: null});
                return req;
            })

            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use( req=> {
                this.setState({error: null});
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount () {
            axios.interceptors.request.ejesct(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmHandler = () => {
            this.setState({error:null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedContent {...this.props} />
                </Aux>
            );
        }
    }
};

export default withErrorHandler;
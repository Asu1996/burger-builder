import React from 'react'

import Modal from '../components/UI/Modal/Modal'
import Aux from '../hoc/Aux'
const withErrorHandler = (WrappedContent) => {
    return (props) => {
        return (
            <Aux>
                <Modal>
                    kuch galat ho raha!!
                </Modal>
                <WrappedContent {...props} />
            </Aux>
        );
    }
};

export default withErrorHandler;
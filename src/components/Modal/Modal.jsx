import PropTypes from 'prop-types';
import { Component } from "react";
import { createPortal } from "react-dom";
import { ModalStyled, Overlay } from "./Modal.styles";

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.closeModal);
    };

    componentWillUnmount () {
        window.removeEventListener('keydown', this.closeModal)
    };
    
    closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === "Escape") {
            this.props.onClick();
        }
    };

    render() {
        return createPortal(
            <Overlay onClick={this.closeModal}>
                <ModalStyled>
                    {this.props.children}
                </ModalStyled>
            </Overlay>, modalRoot
        )       
    };
};

Modal.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}
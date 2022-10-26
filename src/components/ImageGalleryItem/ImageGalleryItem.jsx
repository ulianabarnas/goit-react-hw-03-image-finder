import PropTypes from 'prop-types';
import urlPropType from 'url-prop-type';
import Modal from "components/Modal/Modal";
import { Component } from "react";
import { Image, Item } from "./ImageGalleryItem.styles";

export default class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
    }));
  };

  render() {
    const { isOpenModal } = this.state;
    const { smallUrlImg, largeUrlImg, alt } = this.props;
    return (
      <>
        <Item>
          <Image
            src={smallUrlImg}
            alt={alt}
            onClick={this.toggleModal}
          />
        </Item>
        {isOpenModal && (
          <Modal onClick={this.toggleModal}>
            <img src={largeUrlImg} alt={alt} />
          </Modal>
        )}
      </>
    );
  };
};

ImageGalleryItem.propTypes = {
  smallUrlImg: urlPropType.isRequired,
  largeUrlImg: urlPropType.isRequired,
  alt: PropTypes.string.isRequired,
}
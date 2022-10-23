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
        {isOpenModal && <Modal src={largeUrlImg} alt={alt}  />}
      </>
    )
  }
}

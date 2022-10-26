import PropTypes from 'prop-types';
import urlPropType from 'url-prop-type';
import { List } from "./ImageGalery.styles";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

export default function ImageGallery ({images}){
  return (
    <List>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return <ImageGalleryItem
          key={id}
          smallUrlImg={webformatURL}
          largeUrlImg={largeImageURL}
          alt={tags}
        />
      })}
    </List>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: urlPropType.isRequired,
      largeImageURL: urlPropType.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
}
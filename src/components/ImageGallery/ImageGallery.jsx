import { List } from "./ImageGalery.styles";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

export default function ImageGallery ({images}){
  return (
    <List>
      {images.map(({id, webformatURL, largeImageURL, tags}) => {
        return <ImageGalleryItem
          key={id}
          smallUrlImg={webformatURL}
          largeUrlImg={largeImageURL}
          alt={tags}
        />
      })}
    </List>
  )
}

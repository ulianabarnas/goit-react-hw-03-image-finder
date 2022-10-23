import { Component } from "react";
import { List } from "./ImageGalery.styles";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

export default class ImageGallery extends Component {
  state = {
    images: [],
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const currentQuery = this.props.query;
    const prevPage = prevProps.page;
    const currentPage = this.props.page;

    if (prevQuery !== currentQuery || prevPage !== currentPage) {
      fetch(`https://pixabay.com/api/?q=${currentQuery}&page=${currentPage}&key=14611902-cba6e6d3c19977a925f1406cc&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => response.json())
        .then(images => this.setState(prevState => ({images: [...prevState.images, ...images.hits]})));
    }
  }


  
  render() {
    const { images } = this.state;
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
}

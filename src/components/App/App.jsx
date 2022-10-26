import { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import Button from "components/Button/Button";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Loader from "components/Loader/Loader";
import Searchbar from "components/Searchbar/Searchbar";
import { AppStyled } from "./App.styles";
import { fetchImages } from "services/api";

export default class App extends Component {
  state = {
    images: [],
    query: "",
    page: 1,
    loading: false,
    error: null,
    totalPages: null,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const currentQuery = this.state.query;
    const prevPage = prevState.page;
    const currentPage = this.state.page;
    

    if (prevQuery !== currentQuery || prevPage !== currentPage) {
      this.setState({ loading: true });
      
      fetchImages(currentQuery, currentPage)
      .then(images => {
        const totalPages = Math.ceil(images.totalHits / 12);
        this.setState({ totalPages });

        if (images.totalHits === 0) {
          return toast.info(
            "No photo with such request."
          );
        };

        if (this.state.page >= totalPages) {
          toast.info(
            "Sorry, but we have no more photos for you."
          );
        };

        this.setState(prevState => ({ images: [...prevState.images, ...images.hits] }))
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
    }
  }

  handleSearchbarSubmit = (query) => {
    this.setState({
      query,
      page: 1,
      images: [],
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  };

  render() {
    const { images, loading, error, page, totalPages } = this.state;
  
    return (
      <AppStyled>
        <Searchbar onSubmit={this.handleSearchbarSubmit}/>
        {loading && <Loader />}
        {error && <p>{error.message}</p>}
        {images.length > 0 && <ImageGallery images={images} />}
        {page < totalPages && <Button onClick={this.loadMore} />}
        <ToastContainer
          autoClose={4000}
          hideProgressBar
        />
      </AppStyled>
    );
  };
};

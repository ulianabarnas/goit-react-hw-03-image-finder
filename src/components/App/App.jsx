import { Component } from "react";
import { ToastContainer } from "react-toastify";
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
    // status: "idle",
  }

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const currentQuery = this.state.query;
    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (prevQuery !== currentQuery || prevPage !== currentPage) {
      this.setState({ loading: true })
      
      fetchImages(currentQuery, currentPage)
      .then(images => this.setState(prevState => ({ images: [...prevState.images, ...images.hits] })))
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
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  render() {
    const { images, loading, error } = this.state;

    // if (status === "idle") {
    //   return <Searchbar onSubmit={this.handleSearchbarSubmit}/>
    // };

    // if (status === "pending") {
    //   return (
    //     <>
    //       <Searchbar onSubmit={this.handleSearchbarSubmit} />
    //       <Loader />
    //     </>
    //   )
    // };

    // if (status === "resolved") {
    //   return (
    //     <AppStyled>
    //       <Searchbar onSubmit={this.handleSearchbarSubmit}/>
    //       <ImageGallery images={images} />
    //       <Button onClick={this.loadMore} />
    //     </AppStyled>
    //   )
    // };

    // if (status === "rejected") {
    //   return <p>{error.message}</p>
    // };    
    
    return (
      <AppStyled>
        <Searchbar onSubmit={this.handleSearchbarSubmit}/>
        {loading && <Loader />}
        {error && <p>{error.message}</p>}
        {/* {images.length === 0 && toast.error('Sorry, we found nothing')} */}
        {images.length > 0 && <ImageGallery images={images} />}
        {images.length > 0 && <Button onClick={this.loadMore} />}
        <ToastContainer
          autoClose={3000}
          hideProgressBar
        />
      </AppStyled>
    );
  }
  
};

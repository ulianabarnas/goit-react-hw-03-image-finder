import { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import Button from "components/Button/Button";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Loader from "components/Loader/Loader";
import Searchbar from "components/Searchbar/Searchbar";
import { AppStyled } from "./App.styles";

export default class App extends Component {
  state = {
    images: [],
    query: "",
    page: 1,
    loading: false,
    error: null,
    status: "idle",
  }

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const currentQuery = this.state.query;
    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (prevQuery !== currentQuery || prevPage !== currentPage) {
      this.setState({loading: true})
      fetch(`https://pixabay.com/api/?q=${currentQuery}&page=${currentPage}&key=14611902-cba6e6d3c19977a925f1406cc&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
          if (response.ok) {
            return response.json()
          }

          return Promise.reject(new Error(`Sorry, no results found for ${currentQuery}`))
        })
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
    const { images, loading, error, status } = this.state;

    if (status === "idle") {
      return <Searchbar onSubmit={this.handleSearchbarSubmit}/>
    };

    if (status === "pending") {
      return <Loader />
    };

    if (status === "resolved") {
      return (
        <AppStyled>
          <ImageGallery images={images} />
          <Button onClick={this.loadMore} />
        </AppStyled>
      )
    };

    if (status === "rejected") {
      return <p>{error.message}</p>
    };    
    
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

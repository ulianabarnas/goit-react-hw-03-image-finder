import Button from "components/Button/Button";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Searchbar from "components/Searchbar/Searchbar";
import { Component } from "react";
import { ToastContainer } from "react-toastify";
import { AppStyled } from "./App.styles";


export default class App extends Component {
  state = {
    images: [],
    query: "",
    page: 1,
  }

  handleSearchbarSubmit = (query) => {
    this.setState({ query, page: 1 });
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  render() {
    const { query, page } = this.state;
    return (
      <AppStyled>
        <Searchbar
          onSubmit={this.handleSearchbarSubmit}
        />
        <ToastContainer
          autoClose={3000}
          hideProgressBar
        />
        <ImageGallery query={query} page={page} />
        {query && <Button onClick={this.loadMore} />}
      </AppStyled>
    );
  }
  
};

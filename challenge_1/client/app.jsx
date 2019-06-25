import React from 'react';
import ReactDOM from 'react-dom';
import Stream from './Stream.jsx';
import ReactPaginate from 'react-paginate'
import $ from 'jquery';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      search: '',
      results: '',
      submitted: false,
      offset: 0,
      pageCount: 0,
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    this.grabItemsFromJason();
  }

  grabItemsFromJason() {
    const { offset, currentLimit } = this.state;
    const query = this.state.search;
    $.ajax({
        type: 'GET',
        url: `/events/?q=${query}&_start=${offset}&_limit=10`,
        dataType: "json",
        success: (response, status, xhr) => {
          console.log(response, status, xhr)
          this.setState({
              results: response,
              submitted: true,
              pageCount: Math.ceil(response.length / 10),
          }, () => console.log(this.state));
        },
        error: (error) => {
          console.log(err);
        },
    });
  }

  handleChange (e) {
    e.preventDefault();
    this.setState({
      search: e.target.value,
    })
  }

  handlePageClick (data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);

    this.setState({ 
      offset: offset,
    }, () => this.grabItemsFromJason());
  };

  render() {
    return (
      <div style={centerizer}>
        <h1>Welcome to the Historical Events App</h1>
          <form onSubmit={this.handleSearch}>
            <label>
              What do you want to know about?
              <div>
              <input type="text" name="name" onChange={this.handleChange}/>
              </div>
            </label>
            <input type="submit" value="Submit" />
          </form>
          { this.state.submitted && 
          <div>
          <Stream results={this.state.results}/>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={10}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            />
          </div>
          }
      </div>
    )
  }
}

const centerizer = {
  textAlign: "center",
}

ReactDOM.render(<App />, document.getElementById("app"));
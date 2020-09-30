import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Shortlist from './components/Shortlist';
import All from './components/All';
import { DebounceInput } from 'react-debounce-input';

const api = axios.create({
  baseURL: `https://api.jsonbin.io/b/5f5c76a5302a837e9564b5ca`
})

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      cities: [],
      all: [],
      shortlisted: [],
      search: null,
    }
  }

  //get req to fetch data from api
  getInfo = async () => {
    let data = await api.get('/').then(({ data }) => data);
    this.setState({ cities: data, all: data });
  }

  //function to search result
  handleSearch = (e) => {
    let keyword = e.target.value;
    if (!!keyword) {
      keyword = keyword.toLowerCase();
    }
    const filteredList = this.state.cities.filter(({ City, State, District }) => {
      return City.toLowerCase().includes(keyword) === true || State.toLowerCase().includes(keyword) === true || District.toLowerCase().includes(keyword) === true;
    });
    console.log(filteredList);
    this.setState({ all: filteredList });
  }

  //function to add shortlisted data to shortlist tab
  addToShortlist = (index) => {
    if (index < this.state.all.length) {
      const selectedCity = this.state.all[index];

      const newShortlistedCities = [...this.state.shortlisted];
      newShortlistedCities.push(selectedCity);
      this.setState({ shortlisted: newShortlistedCities });

    }
    console.log('addd', index, this.state.all[index]);
  }

  //function to delete row/data from All and Shortlist tab
  delFromAll = (index) => {
    if (index < this.state.all.length) {
      const delFromAll = [...this.state.all];
      const delCity = delFromAll[index];
      delFromAll.splice(index, 1);
      this.setState({ all: delFromAll });
      const shortlistIndex = this.state.shortlisted.findIndex((city) => {
        return city.City === delCity.City && city.State === delCity.State && city.District === delCity.District;
      })
      console.log(shortlistIndex);
      if (shortlistIndex !== -1) {
        this.delFromShortlist(shortlistIndex);
      }
    }
  }

  //function to delete row from shortlist tab
  delFromShortlist = (index) => {
    if (index < this.state.shortlisted.length) {
      const newShortlistedList = [...this.state.shortlisted];
      newShortlistedList.splice(index, 1);
      this.setState({ shortlisted: newShortlistedList });
    }
    console.log('abcd');
  }

  componentDidMount() {
    this.getInfo();
  }

  render() {
    const { all, shortlisted } = this.state;
    return (
      <Router>
        <div className="container">
          <ul>
            <li><Link to="/">All</Link></li>
            <li><Link to="/shortlist">Shortlisted</Link></li>
            <button onClick={this.addNewRow} className="add_btn">Add</button>
            <form>
              <DebounceInput minLength={2} debounceTimeout={1000} value={this.search} onChange={this.handleSearch} placeholder="search...." className="searchBox" />
            </form>

          </ul>
          <Switch>
            <Route exact path="/">
              <All list={all} addToShortlist={this.addToShortlist} delFromAll={this.delFromAll} />
            </Route>
            <Route exact path="/shortlist">
              <Shortlist list={shortlisted} delFromShortlist={this.delFromShortlist} />
            </Route>
          </Switch>

        </div>
      </Router>
    )
  }
}

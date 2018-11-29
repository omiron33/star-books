import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Library from "../Library/Library";
import "./Layout.css";
import stars from "../../stars.jpg";
import axios from "axios";

class Layout extends Component {
  state = {
    libraries: [],
    searchTerm: []
  };

  componentDidMount() {
    axios.get("http://localhost:3000/api/libraries").then(response => {
      this.setState({ libraries: response.data });
      console.log(response.data);
    });
  }
  satIDSort = () => {
    let sortedLibraries = [...this.state.libraries];
    sortedLibraries.sort(function (a, b) {
        return a.satellite_id - b.satellite_id;
    });
    this.setState({ libraries: sortedLibraries });
  };
  timestampSort = () => {
    let sortedLibraries = [...this.state.libraries];
    sortedLibraries.sort(function(a, b) {
      return a.timestamp - b.timestamp;
    });
    this.setState({ libraries: sortedLibraries });
  };


  collectionIdSort = () => {
    let filteredLibraries = [...this.state.libraries];
    filteredLibraries.forEach(a => a.collections.sort(function(a,b) {
        return a.set_id - b.set_id;
    }))
    this.setState({ libraries: filteredLibraries })
  };

  collectionConditionSort = () => {
    let filteredLibraries = [...this.state.libraries];
    filteredLibraries.forEach(a => a.collections.sort(function (a, b) {
        if(a.condition < b.condition) { return -1; }
        if(a.condition > b.condition) { return 1; }
        return 0;
    }))
    this.setState({ libraries: filteredLibraries })
  };

  collectionStatusSort = () => {
    let filteredLibraries = [...this.state.libraries];
    filteredLibraries.forEach(a => a.collections.sort(function (a, b) {
        if (a.status < b.status) { return -1; }
        if (a.status > b.status) { return 1; }
        return 0;
    }))
    this.setState({ libraries: filteredLibraries })
  };


  render() {
    const libraries = this.state.libraries.map(library => {
      return (
        <Library
          satellite_id={library.satellite_id}
          key={library.satellite_id}
          collections={library.collections}
        />
      );
    });

    const styles = {
      layoutBack: {
        backgroundImage: `url(${stars})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat"
      }
    };

    return (
      <div style={styles.layoutBack} className="LayoutGrid">
        <div className="SelectionChoices">
        <h3>Sort Options</h3>
          <div>
            <button onClick={this.satIDSort}>Satellite ID Sort</button>
            <button onClick={this.timestampSort}>Timestamp Sort</button>
            <button onClick={this.collectionIdSort}>Set ID Sort</button>
            <button onClick={this.collectionConditionSort}>Condition Sort</button>
            <button onClick={this.collectionStatusSort}>Status Sort</button>
          </div>
        </div>
        <Header />
        <div className="LibraryCard">{libraries}</div>
        <Footer />
      </div>
    );
  }
}

export default Layout;

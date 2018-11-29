import React, { Component } from "react";
import Collection from '../Collection/Collection';
import './Library.css'

class Library extends Component {
  render() {
      const collections = this.props.collections.map(collection => {
          return <Collection id={collection.set_id} condition={collection.condition} status={collection.status} key={collection.set_id}/>
      });
      return (
        <div className="Sat">
        <h1>Satellite ID: {this.props.satellite_id}</h1>
        {collections}
        </div>
    )
  }
}

export default Library;

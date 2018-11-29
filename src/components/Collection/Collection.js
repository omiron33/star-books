import React from 'react';
import './Collection.css'

const Collection = (props) => (
    <div className="Collection">
        <h4>Set_id: {props.id}</h4>
        <h4>{props.condition}</h4>
        <p>{props.status}</p>
        <p>{props.errors}</p>
    </div>
)

export default Collection;
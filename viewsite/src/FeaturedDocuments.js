import React, { useState, useEffect } from 'react';
import axios from 'axios';
const FeaturedDocuments = () => {
  const [Documents, setDocuments] = useState([]);
useEffect(() => {
  fetchDocuments();
}, []);
const fetchDocuments = () => {
  axios
    .get('https://wlzrefvumum4rxdnyb767w54xu0xvcpe.lambda-url.eu-west-1.on.aws/')
    .then((res) => {
      console.log(res);
      setDocuments(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
return (
    <div>
      <h1>Featured Documents</h1>
      <div className='item-container'>
        {Documents.map((document) => (
          <div className='card' key={document.Id}>
            <h3>{document.Id}</h3>
            <p>{document.File}</p>
            <p>{document.Entities.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FeaturedDocuments;
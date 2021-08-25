import React from "react";
// import ReactDOM from "react-dom";
import "./App.module.css";

import GetImg from "./GetImg/GetImg.jsx";
import ImgContainer from "./ImgContainer/ImgContainer.jsx";
import DownloadImg from "./DownloadImg/DownloadImg.jsx";

function App() {
  return (
    <div className="App">
      <GetImg />

      <ImgContainer />

      <DownloadImg />
    </div>
  );
}

export default App;

// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=22248336-3f9f08778186b55c7ac32d168&image_type=photo&orientation=horizontal&per_page=12

import './App.css';
import Navbar from './component/Navbar/Navbar';
import News from "./component/NewComponent/News"
import React, { Component } from 'react'



export default class App extends Component {

  c ="John";

  render() {
    return (
      <div>
        <Navbar />
        <News />
      </div>
    )
  }
}

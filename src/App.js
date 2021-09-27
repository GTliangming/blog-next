import './App.css';
import * as React from "react"
import axios from 'axios';
const fetch = require("node-fetch");
const { fetchData, ferchTry } = require("./api/index")
export default class App extends React.Component {
  componentDidMount() {
    fetchData({
      data:{
        username:"2",
        password:"333"
      },
      header: {
        'Content-Type': 'application/json charset=UTF-8'
      },
      method: "POST",
    })  // axios请求在这里
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // fetch('http://localhost:3001/api/login', {method:"POST"})
    // axios.post('http://localhost:3001/api/login',{
    //       username:"2",
    //       password:"333"
    //     })
  }
  try = () => {
    ferchTry({
      method: "get"
    })  // axios请求在这里
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p onClick={this.try}>hahahh1</p>
        </header>
      </div>
    )
  }
};

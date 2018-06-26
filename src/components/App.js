import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';
import Post from './Post/Post'

const url = 'https://practiceapi.devmountain.com/api'
class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`${url}/posts`).then(((res) => {
      this.setState({posts: res.data})
    }))
  }

  updatePost(id, text) {
    axios.put(`${url}/posts?id=${id}`, {text}).then((res) => {
      this.setState({posts: res.data})
    }).catch(err => console.log(err))

  }

  deletePost(id) {
    axios.delete(`${url}/posts?id=${id}`).then((res) => {
      this.setState({posts: res.data})

    })
  }

  createPost(text) {
    axios.post(`${url}/posts`, {text}).then((res) => {
      this.setState({posts: res.data})
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose 
            createPostFn={this.createPost}
          />

          {posts.map( post => {
            return(
              <Post 
              key={post.id}
              text={post.text}
              date={post.date}
              updatePostFn={this.updatePost}
              id={post.id}
              deletePostFn={this.deletePost}
            />
            )
           
})}
          
        </section>
      </div>
    );
  }
}

export default App;

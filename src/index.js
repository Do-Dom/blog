import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Title extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const title = this.props.title;
    return (
      <div className="title-container">
        [ {title} ]
      </div>
    );
  }
}

class Context extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const context = this.props.context;
    return (
      <div className="context-container">
        {context}  
      </div>
    );
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <fieldset className="post-field-container">
        <legend>
          <Title title={this.props.title} />
        </legend>        
        <span> Posted Time : {this.props.time} </span>
        <Context context = {this.props.context} />
      </fieldset>
    );
  }
}

class PostForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input 
          type = "text" 
          onChange={this.props.handleChange}
          name = "title"/>
        <br/>
        <textarea 
          type = "text"
          onChange={this.props.handleChange}
          name = "context"/>
        <br/>
        <input type = "submit" value = "POST!" />
      </form>
    );
  }
}

class PostCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (event) => {
    this.setState(
      {[event.target.name]: event.target.value});
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    
    this.setState(
      {time:new Date().toLocaleTimeString()}, ()=>{
        const post = 
              <Post key = {this.state.time}
                title = {this.state.title}
                context = {this.state.context}
                time = {this.state.time}
              />;
        
        this.props.handleNewPost(post);
       }
    );
  }

  render() {
    return (
      <div>
        <PostForm 
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
        />
      </div>
    );
  }
}

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewPost = this.handleNewPost.bind(this);
    this.state = {
      postList : []
    };
  }

  handleNewPost (data) {
    console.log(data);
    const postList = this.state.postList;
    this.setState(
      {postList: postList.concat([data]) }
    );
  }
  
  render() {
    return (
      <div>
        <PostCreator 
          handleNewPost = {this.handleNewPost}
        />
        {this.state.postList}
      </div>
    );
  }
  
  
}

// ReactDOM.render(
//   <div>
//     <Blog />
//   </div>,
//   document.getElementById("app")
// );

document.addEventListener("DOMContentLoaded", function(event) {
    ReactDOM.render(
        <div>
            <Blog />
        </div>,
        document.getElementById('app'));
});

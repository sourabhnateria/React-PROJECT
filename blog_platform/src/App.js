import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Markdown from "react-markdown";
import { useState } from "react";

// Redux setup
const initialState = {
  posts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_POST":
      return {...state, posts: [...state.posts, action.payload] };
    default:
      return state;
  }
};

const store = createStore(reducer);

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Blog Platform</h1>
      <h2> <Link to="/create">Create a New Post</Link> </h2>
      
      <h2> <Link to="/posts">View Posts</Link> </h2>
    </div>
  );
};

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const handleSubmit = () => {
    store.dispatch({ type: "ADD_POST", payload: { title, content } });
  };

  return (
    <div>
      <h2>Create a Blog Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write in Markdown"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const Posts = () => {
  const posts = store.getState().posts;
  return (
    <div>
      <h2>Blog Posts</h2>
      {posts.map((post, index) => (
        <div key={index}>
          <h3>{post.title}</h3>
          <Markdown>{post.content}</Markdown>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

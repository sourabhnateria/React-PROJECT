import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Redux Setup
const initialState = {
  user: null,
  analytics: { views: 1000, likes: 250, comments: 120 },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

// Components
const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch({ type: "SET_USER", payload: result.user });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

const Dashboard = () => {
  const analytics = useSelector((state) => state.analytics);
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

  const data = {
    labels: ["Views", "Likes", "Comments"],
    datasets: [
      {
        label: "Engagement Metrics",
        data: [analytics.views, analytics.likes, analytics.comments],
        backgroundColor: ["blue", "green", "red"],
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Bar data={data} />
    </div>
  );
};

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <Provider store={store}>
      <Router>
        <nav>
          <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import Post from "./screens/Post";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>App reddit</h1>
        <Post />
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

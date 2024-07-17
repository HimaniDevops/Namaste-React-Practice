import React from "react";
import ReactDOM from "react-dom/client";

     
//React Element
const title = (
    <h1>
        Hello from jsx
    </h1>
);

//React Functional component
const HeadingComponent = () => (
   <div id="container">
        <h1>Hello from functional component</h1>
       
    </div>
);
  
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />); 
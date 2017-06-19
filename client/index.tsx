import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./app";


/* import antd style. you can remove next line if you use babel-plugin-antd */


ReactDOM.render(
    <div>
        <App />
    </div>,
    document.getElementById("root")
);


// for hot reloading
if (module.hot) {
    module.hot.accept();
}

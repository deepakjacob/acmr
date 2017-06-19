
import * as React from "react";
import {
    Button,
    Intent,
    Spinner,
    Tabs2,
    Tab2,
    Classes,
    AnchorButton
} from "@blueprintjs/core";

import { CustomTabHeader } from "./app/custom-tab-header";
import { ChartComponent } from "./app/container/monthly-spending-pattern-component";


import "./app.scss";
import { EarningsExpenseComponent } from './app/container/earnings-expense-component';
import { configureStore } from './app/store';
import { Provider } from 'react-redux';

const store = configureStore();

export class App extends React.Component<{}, {}> {
    private onUserPreferences = () => {
    }

    render() {
        return (
            <div >
                <div className="left col">
                    <div className="header">
                    </div>

                    <div className="body row" style={{ overflow: "hidden" }}>
                    </div>

                    <div className="footer">
                        Icons go here
                    </div>
                </div>


                <div className="right col">
                    <div className="header row">
                    </div>
                    < div className="body row" style={{ overflow: "hidden" }}>
                        <Tabs2 id="mainTabs" className="mainTab">

                            <Tab2 id="ng"
                                title={<CustomTabHeader title={"Generate Reports "} />}
                                panel={
                                    <div style={{ overflowX: "scroll" }}>
                                        <Provider store={store}>
                                            <div>
                                                <div className="left-inner col" style={{ overflowX: "hidden" }}>
                                                    <EarningsExpenseComponent />
                                                </div>
                                                <div className="right-inner col" style={{ overflowX: "hidden" }}>
                                                    <ChartComponent />
                                                </div>
                                            </div>
                                        </Provider>

                                    </div>

                                }
                            />

                            <Tab2 id="nx"
                                title={<CustomTabHeader title={"Import External Data"} />}
                                panel={<Spinner />} />
                        </Tabs2>

                    </div >
                    <div className="footer row">
                        Get a bird's eye view of statistics !
                    </div>

                </div >
            </div >

        );
    }
}

export default App;

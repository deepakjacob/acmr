import * as React from "react";
import { FocusStyleManager } from "@blueprintjs/core";

export interface CustomTabHeaderProps {
    title: string;
    backgroundColor?: string;
}

export class CustomTabHeader extends React.Component<CustomTabHeaderProps, {}> {
    render() {
        FocusStyleManager.onlyShowFocusOnTabs();
        return (
            <div
                className="pt-button"
                style={{
                    height: "35px",
                    borderBottom: "none",
                }}
            >
                <span>{this.props.title}</span>
                <span className="pt-icon-standard pt-icon-duplicate pt-align-right"></span>
            </div>
        );
    }
}

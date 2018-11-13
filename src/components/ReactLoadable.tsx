import * as React from "react";
import Loadable from "react-loadable";
import { Spin } from "antd";

export const ReactLoadable = loadComponent => {
    return Loadable({
        loader: loadComponent,
        loading: () => (
            <div style={{ textAlign: "center", marginTop: "10%" }}>
                <Spin size="large" />
            </div>
        )
    });
};

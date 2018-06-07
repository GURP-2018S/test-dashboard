import * as React from "react";
import {RouteComponentProps} from "react-router";
import {Link, Route} from "react-router-dom";

import Card from "../components/ScenarioCard";
import TestUploader from "../components/TestUploader";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import {Create} from "@material-ui/icons";

interface IParam {
    featureID: string;
}

const bgColor = "#5c6bc0";

const select = () => <h3>Please select a topic.</h3>;

const Features = ({match}: RouteComponentProps<IParam>) => (
    <div style={{ margin: 'auto', width: "80%" }}>
      <Link to={`${match.url}/create`}>
        <Chip label="생성하기" avatar={<Avatar style={{backgroundColor: bgColor, color: "white"}}><Create/></Avatar>}
        style={{backgroundColor: bgColor, color: "white", margin: 4, marginBottom: "1vh"}} />
        </Link>
        <Route exact={true} path={match.url} render={select}/>
        <Route path={`${match.url}/edit/:featureID`} component={Feature}/>
        <Route path={`${match.url}/create`} component={TestUploader}/>
    </div>
);

const Feature = ({match}: RouteComponentProps<IParam>) => (
    <Card title={match.params.featureID}/>
);

export default Features;

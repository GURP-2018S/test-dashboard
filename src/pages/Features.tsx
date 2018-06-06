import * as React from "react";
import {RouteComponentProps} from "react-router";
import {Link, Route} from "react-router-dom";

import Card from "../components/ScenarioCard";
import TestUploader from "../components/TestUploader";

interface IParam {
    featureID: string;
}

const select = () => <h3>Please select a topic.</h3>;

const Features = ({match}: RouteComponentProps<IParam>) => (
    <div>
        <ul>
            <li>
                <Link to={`${match.url}/all`}> 전체 보기 </Link>
            </li>
            <li>
                <Link to={`${match.url}/create`}> 생성하기 </Link>
            </li>
            <li>
                <Link to={`${match.url}/edit`}> 수정하기 </Link>
            </li>
        </ul>

        <Route exact={true} path={match.url} render={select}/>
        <Route path={`${match.url}/edit/:featureID`} component={Feature}/>
        <Route path={`${match.url}/create`} component={TestUploader}/>
    </div>
);

const Feature = ({match}: RouteComponentProps<IParam>) => (
    <Card title={match.params.featureID}/>
);

export default Features;

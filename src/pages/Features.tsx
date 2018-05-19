import * as React from 'react';
import {RouteComponentProps} from "react-router";
import {Link, Route} from 'react-router-dom';

import Card from '../components/ScenarioCard';

interface IParam {
    featureID: string
}

const select = () => <h3>Please select a topic.</h3>;

const Features = ({ match }: RouteComponentProps<IParam>) => (
    <div>
        <h2>Features</h2>
        <ul>
            <li>
                <Link to={`${match.url}/all`}>All</Link>
            </li>
            <li>
                <Link to={`${match.url}/create`}>Create</Link>
            </li>
            <li>
                <Link to={`${match.url}/edit`}>Edit (Modify/Delete)</Link>
            </li>
        </ul>

        <Route path={`${match.url}/edit/:featureID`} component={Feature} />
        <Route
            exact={true}
            path={match.url}
            render={select}
        />
    </div>
);

const Feature = ({ match }: RouteComponentProps<IParam>) => (
    <Card title={match.params.featureID} />
);

export default Features;
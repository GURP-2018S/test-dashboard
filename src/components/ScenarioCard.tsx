import * as React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {withStyles, WithStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        minWidth: 275,
    },

    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },

    title: {
        fontSize: 14,
        marginBottom: 16,
    },

    pos: {
        marginBottom: 12,
    },
};

interface IProps {
    title?: any;
    success?: any;
    content?: any;
}

type PropTypes = IProps & WithStyles<'card' | 'bullet' | 'title' | 'pos'>;

function ScenarioCard(props: PropTypes) {
    const {title, content, classes} = props;

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                        {title}
                    </Typography>
                    {content}
                </CardContent>
                <CardActions>
                    <Button size="small">자세히 보기</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default withStyles(styles)(ScenarioCard);
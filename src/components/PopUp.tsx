import * as React from 'react';

// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import {Theme, WithStyles, withStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme: Theme) => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

interface IProps extends WithStyles<"close"> {
    open: boolean;
    message?: string;
    onClose: any;
}

class PopUp extends React.Component<IProps, {}> {
    public render() {
        const {classes, message, open, onClose} = this.props;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={onClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{message}</span>}
                action={
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={onClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                }
            />
        );
    }
}


export default withStyles(styles)(PopUp);
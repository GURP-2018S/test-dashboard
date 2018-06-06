import * as React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Theme, WithStyles, withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const styles = (theme: Theme) => ({
    menu: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

const options = [
    '수강신청',
    '학적',
    '업무',
    '기타',
];

interface IProps extends WithStyles<"menu"> {

}

interface IState {
    anchorEl?: HTMLElement;
    selectedIndex: number;
}

class SimpleListMenu extends React.Component<IProps, IState> {
    public state = {
        anchorEl: undefined,
        selectedIndex: 1,
    };

    public button = undefined;

    public handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({anchorEl: event.currentTarget});
    };

    public handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        this.setState({selectedIndex: index, anchorEl: undefined});
    };

    public handleMenuItemClickCurried = (index: number) => (event: React.MouseEvent<HTMLElement>) => {
        this.setState({selectedIndex: index, anchorEl: undefined});
    };

    public handleClose = () => {
        this.setState({anchorEl: undefined});
    };

    public render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;

        return (
            <div className={classes.menu}>
    <List component="nav">
            <ListItem
        button={true}
        aria-haspopup="true"
        aria-controls="lock-menu"
        aria-label="When device is locked"
        onClick={this.handleClickListItem}
    >
    <ListItemText
        primary="테스트 잡"
        secondary={options[this.state.selectedIndex]}
        />
    </ListItem>
    </List>
        <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
        >
            {options.map((option, index) => (
                <MenuItem
                    key={option}
                    selected={index === this.state.selectedIndex}
                    onClick={this.handleMenuItemClickCurried(index)}
                >
                    <AddIcon/> {option}
                </MenuItem>
            ))}
        </Menu>
        </div>
        );
    }
}

export default withStyles(styles)(SimpleListMenu);
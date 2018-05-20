import * as React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Dashboard as Home, Detail, Features } from "./pages";

import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import "./App.css";

import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList/MenuList";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Dashboard from "@material-ui/icons/Dashboard";
import Edit from "@material-ui/icons/Edit";
import MenuIcon from "@material-ui/icons/Menu";

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {}
});

export interface IMenuData {
  icon: any;
  text: string;
  to: string;
}

interface IProps
  extends WithStyles<
      "root" | "flex" | "menuButton" | "menuItem" | "primary" | "icon"
    > {}

interface IState {
  auth: boolean;
  menuOpen: boolean;
  anchorEl?: HTMLElement;
}

class App extends React.Component<IProps, IState> {
  public state = {
    auth: true,
    menuOpen: false,
    anchorEl: undefined
  };

  public handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  public handleClose = () => {
    this.setState({ anchorEl: undefined });
  };

  public toggleDrawer = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  public render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const menus: IMenuData[] = [
      { icon: <Dashboard />, text: "대쉬보드", to: "/" },
      { icon: <Edit />, text: "테스트 관리", to: "/features" }
    ];

    return (
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={this.toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Drawer open={this.state.menuOpen} onClose={this.toggleDrawer}>
                <MenuList>
                  {menus.map((element, index) => (
                    <Link key={index} to={element.to}>
                      <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                          {element.icon}
                        </ListItemIcon>
                        <ListItemText
                          classes={{ primary: classes.primary }}
                          inset={true}
                          primary={element.text}
                        />
                      </MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Drawer>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                KAIST 테스팅 툴
              </Typography>
              {auth && (
                <div>
                  <IconButton
                    aria-owns={open ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>내 계정 정보</MenuItem>
                    <MenuItem onClick={this.handleClose}>로그아웃</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>

          <Route exact={true} path="/" component={Home} />
          <Route path="/detail/:jobID" component={Detail} />
          <Route path="/features" component={Features} />
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);

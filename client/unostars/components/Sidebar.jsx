import { Fragment } from "react";
import { useRouter } from "next/router";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useDispatch, useSelector } from "react-redux";
import { updateDarkMode } from "../redux/actions/uiActions";

import AnalyticsIcon from "@mui/icons-material/Analytics";
import ListAltIcon from "@mui/icons-material/ListAlt";

const pages = [
  {
    title: "Home",
    route: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Questions",
    route: "/questions",
    icon: <QuestionMarkIcon />,
  },
  {
    title: "Analytics",
    route: "/analytics",
    icon: <AnalyticsIcon />,
  },
  {
    title: "Catalog",
    route: "/catalog",
    icon: <ListAltIcon />,
  },
];

const Sidebar = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isDarkModeActive = useSelector((state) => state.ui.darkMode);

  const dispatchUpdateDarkMode = (isActive) =>
    dispatch(updateDarkMode(isActive));

  const navigate = (route) => {
    router.push(route);
  };

  const toggleDarkMode = () => {
    dispatchUpdateDarkMode(!isDarkModeActive);
  };

  return (
    <Fragment>
      <Drawer open={props.open} onClose={props.onClose}>
        <List sx={{ width: 250 }}>
          {pages.map((page, index) => (
            <Fragment key={`${page.title}-${index}`}>
              <ListItem button onClick={navigate.bind(null, page.route)}>
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText>{page.title}</ListItemText>
              </ListItem>
            </Fragment>
          ))}
          <ListItem
            secondaryAction={
              <Switch checked={isDarkModeActive} onChange={toggleDarkMode} />
            }
            sx={{ marginTop: "2rem" }}
          >
            <ListItemIcon>
              <Brightness4Icon />
            </ListItemIcon>
            <ListItemText>Dark Mode</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </Fragment>
  );
};

export default Sidebar;

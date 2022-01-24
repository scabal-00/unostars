import { Fragment } from "react";
import { useRouter } from "next/router";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
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

  const navigate = (route) => {
    router.push(route);
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
        </List>
      </Drawer>
    </Fragment>
  );
};

export default Sidebar;

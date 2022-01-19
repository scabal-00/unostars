import { Fragment, useState } from "react";
import Image from "next/image";

import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  CircularProgress,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

import { Sidebar } from ".";

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Fragment>
      <SAppBar position="static">
        <SToolbar>
          <Wrapper>
            <IconButton onClick={() => setOpenSidebar(!openSidebar)}>
              <MenuIcon />
            </IconButton>
            <Image
              src="/assets/UnostarsLogo.png"
              quality={100}
              width={100}
              height={25}
            />
          </Wrapper>
          <div style={{ display: "flex" }}>
            <IconButton sx={{ position: "relative", padding: "1.6rem" }}>
              <CircularProgress
                variant="determinate"
                value={75}
                size={46}
                sx={{ position: "absolute" }}
              />
              <Avatar
                src="https://www.mantruckandbus.com/fileadmin/media/bilder/02_19/219_05_busbusiness_interviewHeader_1485x1254.jpg"
                sx={{ position: "absolute", height: 35, width: 35 }}
              />
            </IconButton>
            <TextWrapper>
              <Typography color="text.primary">John Doe</Typography>
              <Typography variant="caption" color="text.secondary">
                Nivel: Pegaso
              </Typography>
            </TextWrapper>
          </div>
        </SToolbar>
      </SAppBar>

      <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />
    </Fragment>
  );
};

export default Navbar;

const SAppBar = styled(AppBar)`
  background-color: white;
`;

const SToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 0.5rem;
`;

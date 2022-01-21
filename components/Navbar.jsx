import { Fragment, useState } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";

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

  const { user } = useUser();
  console.log(user);

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
              <Avatar sx={{ position: "absolute", height: 35, width: 35 }} />
            </IconButton>
            <TextWrapper>
              <Typography color="text.primary"></Typography>
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

import { memo } from "react";
// materialUI
import {
  AppBar,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";

const HeadBar = styled(AppBar)({
  backgroundColor: "#FFF",
  color: "#333",
});

export const Header = memo(() => {
  return (
    <HeadBar position="static">
      <Toolbar sx={{ mx: 4 }}>
        <Typography sx={{ fontSize: 20, flexGrow: 1 }}>
          hinako blog
          <IntegrationInstructionsOutlinedIcon
            sx={{ ml: 1, verticalAlign: "middle" }}
          />
        </Typography>
        <List sx={{ display: "flex" }}>
          <ListItemButton component="a" href="/">
            <ListItemText primary="Blog" />
            <DescriptionOutlinedIcon sx={{ fontSize: 18, ml: 0.5 }} />
          </ListItemButton>
          {/* <ListItemButton component="a" href="/profile">
            <ListItemText primary="Profile" />
            <FaceOutlinedIcon sx={{ fontSize: 18, ml: 0.5 }} />
          </ListItemButton> */}
        </List>
      </Toolbar>
    </HeadBar>
  );
});

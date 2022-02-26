import { memo } from "react";
// Material UI
import {
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
// hooks
import { useSelectBlogs } from "hooks/useSelectBlogs";
// recoil
import { useAllTagsState } from "atoms/allTogsAtom";

export const SideBar = memo(() => {
  const { allTags } = useAllTagsState();
  const { selectTag } = useSelectBlogs();

  return (
    <Grid container item xs={12} sm={2.5} sx={{ mb: 5 }}>
      <List
        sx={{ width: "100%", bgcolor: "#fff", height: 500 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <Typography
            component="div"
            sx={{
              py: 0.5,
              px: 4,
              my: 1,
              fontSize: 18,
              color: "#444",
              borderBottom: "solid 0.7px #888",
            }}
          >
            # Tags
          </Typography>
        }
      >
        <ListItemButton
          onClick={() => selectTag("all")}
          sx={{ py: 0.5, px: 4, minHeight: 32 }}
        >
          <ListItemText
            primary="All"
            primaryTypographyProps={{
              fontSize: 15,
            }}
          />
        </ListItemButton>
        {allTags.map((tag) => (
          <ListItemButton
            key={tag}
            onClick={() => selectTag(tag)}
            sx={{ py: 0.5, px: 4, minHeight: 32 }}
          >
            <ListItemText
              primary={tag}
              primaryTypographyProps={{
                fontSize: 15,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Grid>
  );
});

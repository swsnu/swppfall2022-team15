import GridLayout from "../GridView/ProjectGridView";
import List from "../ListView/ProjectListView";
import ProjectCreateModal from "../../../components/Project/ProjectCreateModal";

import { Grid } from "@mui/material";
import { Stack, FormControl, Typography, Switch, Button } from "@mui/material";
import CreateNewFolder from "@mui/icons-material/CreateNewFolder";
import Widget from "../Widget";
import { green, grey, red, cyan } from "@mui/material/colors";
import { useState } from "react";

export default function Summary() {
  const [isGridStyle, setIsGridStyle] = useState(true);
  const [createModalopen, setCreateModalOpen] = useState(false);

  const handleNewProjectClick = (event: React.MouseEvent) => {
    setCreateModalOpen(true);
  };

  return (
    <>
      <ProjectCreateModal
        open={createModalopen}
        handleClose={() => setCreateModalOpen(false)}
      ></ProjectCreateModal>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Widget
            icon="wpf:sent"
            title="Total"
            subtitle="Total requests"
            value={161346134}
            color_main={grey[500]}
            color_dark={grey[600]}
            color_light={grey[400]}
            color_darker={grey[900]}
            color_lighter={grey[200]}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Widget
            icon="mdi:success"
            title="Success"
            subtitle="Successfully sent notifications"
            value={121341574}
            color_main={green[500]}
            color_dark={green[600]}
            color_light={green[400]}
            color_darker={green[900]}
            color_lighter={green[200]}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Widget
            icon="bi:exclamation-triangle"
            title="Failed"
            subtitle="Failed notifications"
            value={32453457}
            color_main={red[500]}
            color_dark={red[600]}
            color_light={red[400]}
            color_darker={red[900]}
            color_lighter={red[200]}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Widget
            icon="mdi:alarm-clock"
            title="Reserved"
            subtitle="Reserved notifications"
            value={7551103}
            color_main={cyan[500]}
            color_dark={cyan[600]}
            color_light={cyan[400]}
            color_darker={cyan[900]}
            color_lighter={cyan[200]}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <div className="projects">
          <div className="sublevel">
            <div className="title">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={3}
              >
                <h2>Projects</h2>
                <FormControl>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Grid</Typography>
                    <Switch
                      defaultChecked
                      onChange={() => setIsGridStyle(!isGridStyle)}
                      data-testid="switch"
                    />
                    <Typography>List</Typography>
                  </Stack>
                </FormControl>
                <Button
                  endIcon={<CreateNewFolder />}
                  data-testid="new-project-button"
                  onClick={handleNewProjectClick}
                >
                  New Project
                </Button>
              </Stack>
            </div>
            <div className="project">
              {isGridStyle ? (
                <GridLayout data-testid="grid" />
              ) : (
                <List data-testid="list" />
              )}
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
}

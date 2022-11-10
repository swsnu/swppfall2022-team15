import { ProjectType } from "../../../types";
import organizationFolder from "./assets/org-folder.svg";
import individualFolder from "./assets/ind-folder.svg";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";

function GridLayout(props: { projects: ProjectType[] }) {
    function icon(project: ProjectType) {
        switch (project.project_type) {
            case "ORGANIZATION":
                return organizationFolder;
            case "INDIVIDUAL":
                return individualFolder;
        }
    }


    if(props.projects.length === 0) {
        return (
            <div className="Grid">
                <Grid container spacing={6} width = "600px">
                    <Grid item xs={12}>
                      <Paper elevation={3} className="GridItem">
                          <div className="GridItemContent">
                              <h4>No projects! Start by creating your first project!</h4>
                          </div>
                      </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
    else {
        return (
          <div className="Grid">
            <Grid container spacing={6} width="600px">
              {props.projects.map((project) => (
                <Grid item xs={12} sm={4} width="100px" height="200px">
                  <Paper>
                    <img
                      src={icon(project)}
                      alt="folder"
                      width="140px"
                      height="100px"
                    />
                  </Paper>
                  <p>{project.name}</p>
                </Grid>
              ))}
            </Grid>
          </div>
        );
    }

    

}

export default GridLayout;
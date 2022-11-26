import { ProjectType } from "../../../types";
import organizationFolder from "../../../assets/org-folder.svg";
import individualFolder from "../../../assets/ind-folder.svg";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { projectListSelector } from "../../../store/slices/project";

function GridLayout() {
  const projects = useSelector(projectListSelector);

  function icon(project: ProjectType) {
    console.log(project)
    switch (project.project_type) {
      case "ORGANIZATION":
        return organizationFolder;
      case "INDIVIDUAL":
        return individualFolder;
    }
  }

  if(projects.length === 0) {
    return <div>No projects! Start by creating your first project!</div>;
  }
  else {
    return (
      <div>
        <Grid container spacing={6} width="600px">
          {projects.map((project) => (
            <Grid key={project.id} item xs={12} sm={4} width="100px" height="200px">
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
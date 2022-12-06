import {List, ListItem, ListItemButton, ListItemText, ListSubheader,} from "@mui/material";
import {useEffect, useState} from "react";
import {MultiSelect} from "react-multi-select-component";
import Iconify from "../Iconify/Iconify";
import {TargetType, TargetUserIdNameDto} from "../../types";

interface IProps {
  notification_type: string;
  selected: TargetUserIdNameDto[];
  setSelected: (selected: TargetUserIdNameDto[]) => void;
  targetUsers: TargetType[];
}

export default function TargetUserMultiSelect(props: IProps) {
  const {targetUsers, selected, setSelected, notification_type} = props;
  const [options, setOptions]: any = useState([]);

  useEffect(() => {
    setOptions(
        targetUsers.map((target) => {
          return { label: target.name, value: target.id };
        }
      )
    );
  }, [targetUsers]);

  return (
    <>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          minHeight: 300,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        <ListSubheader>Selected users</ListSubheader>
        {selected.map((e: any) => {
          const labelId = `checkbox-list-secondary-label-${e.value}`;
          return (
            <ListItem
              key={e.value}
              secondaryAction={
                <ListItemButton
                  onClick={() => {
                    setSelected(
                      selected.filter((s: any) => s.value !== e.value)
                    );
                  }}
                >
                  <Iconify
                    icon={"system-uicons:cross"}
                    sx={{ mr: 2, color: "error.main" }}
                  />
                </ListItemButton>
              }
            >
              <ListItemButton
                onClick={() => {
                  setSelected(selected.filter((s: any) => s.value !== e.value));
                }}
              >
                <ListItemText id={labelId} primary={e.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <br />
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      ></MultiSelect>
    </>
  );
}

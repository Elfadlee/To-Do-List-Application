import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import XIcon from "@mui/icons-material/X";
import TaskContext from "./TaskContext";
import { useContext } from "react";
import { SnackbarContext } from "./SnakBarContext";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

// Handle any side effects or additional logic here

export default function Task({ taskObject , onDelete , onEdit }) {
  const { listState, setListState } = useContext(TaskContext);
  const { ShowSnackbar: showSnackbar } = useContext(SnackbarContext);
 
  
 

  const handleClickOpenDelete = () => {
    onDelete(taskObject.id);
  }

  const handleClickOpenEdit = () => {
    onEdit(taskObject.id);
  }

  function HandleCheckedCompleted() {
    const updatedList = listState.map((task) => {
      if (task.id === taskObject.id) {
        return { ...task, status: task.status === "true" ? "false" : "true" };
      }
      return task;
     
    });

    setListState(updatedList);
    localStorage.setItem('tasks', JSON.stringify(updatedList));
     showSnackbar("Task status updated");
  }



 // UI part 

  return (


    <>

     {/* // task box UI -------- */}

              <Grid container spacing={1} className="TaskBox" alignItems="center">
                <Grid item xs={8}>
                  <Item
                    elevation={0}
                    sx={{
                      bgcolor: "transparent",
                      boxShadow: "none",
                      textAlign: "left",
                    }}
                  >
                    <h2 style={{ margin: 0, paddingBottom: 3 , textDecoration: taskObject.status === "true" ? "line-through" : "none"}}>{taskObject.title}</h2>
                    <p style={{ margin: 0 }}>{taskObject.description}</p>
                  </Item>
                </Grid>

                <Grid
                  item
                  xs={4}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Fab
                      color="success"
                      aria-label="done"
                      sx={{ mx: 1 }}
                      style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor:
                      taskObject.status === "true" ? "#4caf50" : "#e0e0e0",
                      color: taskObject.status === "true" ? "#fff" : "#000",
                    }}
                  >
                    <CheckIcon onClick={HandleCheckedCompleted} />
                  </Fab>
                  <Fab
                    color="secondary"
                    aria-label="edit"
                    sx={{ mx: 1 }}
                    style={{ width: "40px", height: "40px" }}
                  >
                    <EditIcon onClick={handleClickOpenEdit} />
                  </Fab>
                  <Fab
                    color="error"
                    aria-label="delete"
                    sx={{ mx: 1 }}
                    style={{ width: "40px", height: "40px" }}
                  >
                    <XIcon onClick={handleClickOpenDelete}/>
                  </Fab>
                </Grid>
              </Grid>


              {/* // task box UI  End -------- */}

            </>
 
            
  );
}

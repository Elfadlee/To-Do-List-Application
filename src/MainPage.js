import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './App.css';
import Task from './task';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import TaskContext from './TaskContext';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useMemo } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SnackbarContext } from './SnakBarContext';
// import { createTheme, ThemeProvider } from '@mui/material/styles';




// theam customization ---- use it when I want to change the default theam

// const myTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2', 
//     },
//     secondary: {
//       main: '#d32f2f', 
//     },
//   },
//   typography: {
//     fontFamily: 'Arial',
//     fontSize: 14,
//   },
// });

// theam customization ---- 
  


//----------------------------------------------------------------------

  export default function MainPage() {
    const { listState, setListState } = useContext(TaskContext);
    const [taskTitle, setTaskTitle] = React.useState('');
    const [taskDescription, setTaskDescription] = React.useState('');
    const [alignment, setAlignment] = React.useState('ALL');
    const { ShowSnackbar } = useContext(SnackbarContext);

    // Filtering tasks using useMemo for optimization
    const notCompletedTasks = useMemo(() => listState.filter(task => task.status === 'false'), [listState]);
    const completedTasks = useMemo(() => listState.filter(task => task.status === 'true'), [listState]);

    // handle delete dialog box
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
    const [taskToDelete, setTaskToDelete] = React.useState(null);

    // handle edit dialog box
    const [editOpen, setEditOpen] = React.useState(false);
    const [taskToEdit, setTaskToEditData] = React.useState({
      title: '',
      description: ''
    });


    let newTasks = [];

        if (alignment === 'ALL') {
          newTasks = listState;
        } else if (alignment === 'completed') {
          newTasks = completedTasks;
        } else if (alignment === 'not_completed') {
          newTasks = notCompletedTasks;
        }

    let ListMap = newTasks.map((task) => {
      return <Task key={task.id} taskObject={task} onDelete={handleClickOpenDelete} onEdit={handleClickOpenEdit} />;
    });


    React.useEffect(() => {
      const storedTasks = localStorage.getItem('tasks') ?? [];
      if (storedTasks) {
        setListState(JSON.parse(storedTasks));
      }
    }, [setListState]);   



    const handleAlignment = (
      event,
      newAlignment,
      ) => {
          setAlignment(newAlignment);
      };


 function handleAddBtnClick() {
  const newTask = {
    id: uuidv4(),
    title: taskTitle,
    description: taskDescription,
    status: 'false'
  };
      
      setListState([...listState, newTask]);
      setTaskTitle('');
      setTaskDescription('');
      localStorage.setItem('tasks', JSON.stringify([...listState, newTask]));
      ShowSnackbar("Task added successfully");
}

   const handleCloseDelete = () => {
    setShowDeleteDialog(false);
  }

    const handleDelete = () => {
    const updatedList = listState.filter((task) => task.id !== taskToDelete.id);
    setListState(updatedList);
    localStorage.setItem('tasks', JSON.stringify(updatedList));
    setShowDeleteDialog(false);
    ShowSnackbar("Task deleted successfully");
  }

  function handleClickOpenDelete(taskId) {
  const t = listState.find(x => x.id === taskId);
  setTaskToDelete(t);
  setShowDeleteDialog(true);
}



    const handleCloseEdit = () => {
      setEditOpen(false);
    };

    const handleEdit = () => {
    const updatedList = listState.map((task) => {
      if (task.id === taskToEdit.id) {
        return { ...task, title: taskToEdit.title, description: taskToEdit.description };
      }
      return task;
    });
    setListState(updatedList);
    setEditOpen(false);
    localStorage.setItem('tasks', JSON.stringify(updatedList));
    ShowSnackbar("Task edited successfully");
};

    // Open edit dialog and set task to edit
    function handleClickOpenEdit(taskId) {
      const t = listState.find(x => x.id === taskId);
      setTaskToEditData(t);
      setEditOpen(true);
    }




//----------------------------------------------------------------------


  return (

    <>

          {/* // <ThemeProvider theme={myTheme}> */}
        

          <div className="MainPage" style={{display: 'block', minHeight: '100vh', paddingBottom: '50px', backgroundColor: '#f0f4f8' }}>
                  <Container maxWidth="md" sx={{  pt: 4, pb: 4}} > 

                      <Box className="MainBox" 
                      >
                      <h1 >To do List</h1>
                      <hr style={{ border: '1px solid #170249', width: '95%' }} />

                    {/* Toggle button group for filtering tasks */}

                      <ToggleButtonGroup
                                      value={alignment}
                                      exclusive
                                      onChange={handleAlignment}
                                      aria-label="text alignment"
                                      sx={{ mt: 1, mb: 1, }}

                                  >
                                      <ToggleButton value="ALL" aria-label="left aligne" >
                                          All Tasks
                                      </ToggleButton>

                                      <ToggleButton value="completed" aria-label="centered" >
                                              completed tasks
                                      </ToggleButton>

                                      <ToggleButton value="not_completed" aria-label="right aligned" >
                                          Not completed tasks
                                      </ToggleButton>
                      
                                 
                      
                      </ToggleButtonGroup>

                      {/* ---- End Toggle button group for filtering tasks */}



                      {/* Task list display section -------- */}

                      {ListMap}


                      {/* Task list display section End  -------- */}



                            <Grid container spacing={1} className="TaskBox">
                                  <Stack direction="row" spacing={2} >
                                
                                        <Button 
                                        variant="contained" 
                                        onClick={() => {handleAddBtnClick()}}
                                        disabled={taskTitle.trim() === '' || taskDescription.trim() === ''}

                                        endIcon={<SendIcon />}>

                                            Add Task
                                        </Button>
                                </Stack>

                                <Box
                                        component="form"
                                        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                                        noValidate
                                        autoComplete="off"
                                        >
                                        <TextField 
                                        onChange={(e) => setTaskTitle(e.target.value)}
                                        value={taskTitle}
                                        id="standard-basic" 
                                        label="Task title" 
                                        variant="standard" 
                                        />
                                        <TextField
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                        value={taskDescription} 
                                        id="standard-basic"
                                        label="Task description"
                                        variant="standard"
                                        />
                                      
                                </Box>
                              
                            </Grid>

                      </Box>
                      
                  
                      

                  </Container>

            </div>
         


           {/* </ThemeProvider> */}


      {/* // Delete confirmation dialog box UI  -------- */}
          
        <Dialog
          open={showDeleteDialog}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="DeleteDialog"
        >
                <DialogTitle id="alert-dialog-title"
                style={{  backgroundColor: '#f44336', color: '#fff', textAlign: 'left' , paddingLeft: '10px',
                    paddingTop: '10px', paddingBottom: '10px' ,fontSize: '20px', fontWeight: '500'}}
                >
                            {"Confirmation Message"}
                </DialogTitle>

                <DialogContent>
                        <DialogContentText id="alert-dialog-description"
                          style={{ textAlign: 'left' , marginTop: '30px',color: '#010922' ,fontSize: '16px', fontWeight: '300'
                        }}
                        >
                            Are you sure you want to delete{taskToDelete && taskToDelete.title ? ` “${taskToDelete.title}”` : " this task"}?
                        </DialogContentText>
                </DialogContent>

                <DialogActions>
                        <Button onClick={handleCloseDelete}
                          style={{ color: '#213470ff' }}
                        >Cancel</Button>
                        <Button onClick={handleDelete} autoFocus
                        style={{ color: '#213470ff' }}>
                          Confirm 
                      </Button>
                </DialogActions>

        </Dialog>
          
          
         {/* // Delete confirmation dialog box UI End -------- */}




          {/* // Update confirmation dialog box UI Start -------- */}




      <Dialog open={editOpen} onClose={handleCloseEdit}>

            <DialogTitle
            style={{  backgroundColor: '#0c7846ff', color: '#fff', textAlign: 'left' , paddingLeft: '10px',
                       paddingTop: '10px', paddingBottom: '10px' ,fontSize: '20px', fontWeight: '500'}}
            
            >Edit Task</DialogTitle>
            <DialogContent>
                 

                  <form id="edit-form">
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      label="Task Title"
                      fullWidth
                      variant="standard"
                      value={taskToEdit.title}
                      onChange={(e) => setTaskToEditData((p) => ({ ...p, title: e.target.value }))}
                      
                    />
                    <TextField
                      required
                      margin="dense"
                      label="Task Description"
                      fullWidth
                      variant="standard"
                      value={taskToEdit.description}
                      onChange={(e) => setTaskToEditData((p) => ({ ...p, description: e.target.value }))}
                    />
                  </form>
                  </DialogContent>
                  <DialogActions>

                    <Button onClick={handleCloseEdit}
                            style={{ color: '#213470ff' }}
                          >Cancel</Button>
                          <Button onClick={handleEdit} autoFocus
                          style={{ color: '#213470ff' }}>
                            Save 
                          </Button>
                  
                  </DialogActions>
      </Dialog>

        {/* // Update confirmation dialog box UI End -------- */}



        {/* // snackbar -------- */}


    </>
  );

}
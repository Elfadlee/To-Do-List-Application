import MainPage from './MainPage';
import './App.css';
import  TaskContext  from './TaskContext';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SnackbarName } from './Snackbar';
import { SnackbarContext } from './SnakBarContext';




let MainTasks = [

  { id: uuidv4(), 
    title: "Going to gym",
    description: "I have to go to gym at 5 pm",
    status: "false" },

  { id: uuidv4(),
    title: "Going to work",
    description: "going  work at 9 am",
    status: "false" },

  { id: uuidv4(),
    title: "Meeting with friends",
    description: "I have to meet my friends",
    status: "false" },

];




function App() {

   const [listState, setListState] = useState(MainTasks);
  const [open, setOpen] = React.useState();
  const [textMsg, setTextMsg] = React.useState("");

  function ShowSnackbar(textMsg) {
    setOpen(true);
    setTextMsg(textMsg);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }


  return (
    <div className="App"  >

      <SnackbarContext.Provider value={{ShowSnackbar}}>

        <SnackbarName open={open} textMsg={textMsg} />
       <TaskContext.Provider value={{ listState, setListState }}>
         <MainPage  />
       </TaskContext.Provider>
      <SnackbarName/>
      </SnackbarContext.Provider>

    </div>
  );
}

export default App;

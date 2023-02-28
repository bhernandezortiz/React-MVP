import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import Timer from './components/Timer';
import Settings from './components/Settings'
import SettingsContext from './components/SettingsContext';

function App() {
  // const [tasks, setTasks] = useState([]);
  const [taskList, setTaskList] = useState([])
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState (45)
  const [breakMinutes, setBreakMinutes] = useState (15)

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('http://localhost:3000/home');
      const data = await response.json();
      setTaskList(data);
    }

    fetchTasks();
  }, []);


  return (
    <>
      <SettingsContext.Provider value={{
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
        showSettings,
        setShowSettings,
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
      <TaskList taskList={taskList} setTaskList={setTaskList}/>
    </>
  );
}

export default App;
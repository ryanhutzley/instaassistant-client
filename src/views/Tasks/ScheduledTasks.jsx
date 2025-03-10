import React, { useEffect, useState, useContext } from 'react';
import { TaskModalContext } from 'contexts/modalContext';
import { Button } from '@nextui-org/react';
import { useWindowHeight } from 'hooks/windowSize';
import { useParams } from 'react-router-dom';
import TaskModal from 'components/Modals/TaskModal';
import TasksTable from 'components/Tables/TasksTable';
import Loader from 'components/Loader';
import { GetTasks } from 'api';

function ScheduledTasks() {
  const { taskHandler } = useContext(TaskModalContext);
  const [height] = useWindowHeight();
  const { account_id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    GetTasks(account_id)
      .then((data) => setTasks(data))
      .then(() => setTasksLoaded(true));
  }, [account_id]);

  return (
    <>
      <div className="accounts-container">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ margin: '0 1rem' }}>Scheduled Tasks</h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '1rem',
            }}
          >
            <Button onPress={taskHandler} rounded color="secondary">
              New Task
            </Button>
          </div>
        </div>
        {tasksLoaded ? (
          <TasksTable tasks={tasks} height={height} />
        ) : (
          <Loader />
        )}
      </div>
      <TaskModal account_id={account_id} />
    </>
  );
}

export default ScheduledTasks;

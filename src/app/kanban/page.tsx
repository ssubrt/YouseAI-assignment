'use client';
import Appbar from '@/components/Appbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch('/api/tasks');
      const data: Task[] = await res.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  const handleDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1);

    if (!movedTask) return;

    movedTask.status = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);

    try {
      await axios.put(`/api/tasks/${draggableId}`, {
        status: movedTask.status,
      });
      console.log('Task updated successfully.');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Appbar name="Tasks" />

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {['To Do', 'In Progress', 'Completed'].map((status, i) => (
          <Droppable key={i} droppableId={status}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  border: '1px solid gray',
                  padding: '1rem',
                  width: '100%',
                  maxWidth: '300px',
                  flex: '1 1 auto',
                  margin: '0.5rem',
                }}
              >
                <h2>{status}</h2>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: '1rem',
                            margin: '1rem 0',
                            border: '1px solid gray',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

// src/app/kanban/page.tsx
'use client';
import Appbar from '@/components/Appbar';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  // Handle drag end event
  const handleDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) return; // If there's no destination, do nothing

    const updatedTasks = [...tasks]; // Create a copy of the tasks
    const [movedTask] = updatedTasks.splice(source.index, 1); // Remove the task from the original position
    movedTask.status = destination.droppableId; // Update the task status based on the new column
    updatedTasks.splice(destination.index, 0, movedTask); // Insert the task into the new position

    setTasks(updatedTasks); // Update the local state

    // Send the updated task status to the backend
    try {
      await axios.put(`/api/tasks/${draggableId}`, {
        status: movedTask.status, // Send the new status to the backend
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
                  width: '100%', // Full width on mobile
                  maxWidth: '300px', // Maximum width for larger screens
                  flex: '1 1 auto', // Allow columns to grow and shrink
                  margin: '0.5rem', // Add some spacing between columns
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

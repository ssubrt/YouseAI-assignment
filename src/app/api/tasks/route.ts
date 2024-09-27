// src/app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Task from '@/models/taskModel';



connect();





// Create a new task
export async function POST(req: Request) {
    try {
     
     
      const taskData = await req.json();
    // const taskData = { title: 'Test Task', description: 'This is a test', status: 'To Do' };
      console.log('Received task data:', taskData); 
  
      // Ensure the taskData has the necessary fields
      if (!taskData.title || !taskData.description) {
        return NextResponse.json({ error: 'Title and Description are required' }, { status: 400 });
      }
  
      const task = await Task.create(taskData);
      return NextResponse.json(task, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  

// Fetch all tasks
export async function GET() {
  try {
   
    const tasks = await Task.find();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a task by ID
export async function PUT(req: Request) {
  try {
   
    const { id, data } = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(id, data, { new: true });

    if (!updatedTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete a task by ID
export async function DELETE(req: Request) {
  try {
   
    const { id } = await req.json();
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

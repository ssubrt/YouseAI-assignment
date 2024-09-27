import { NextResponse } from 'next/server'; // Importing NextResponse for responses in Next.js 13+
import Task from '@/models/taskModel';
import { connect } from '@/dbConfig/dbConfig';

// PUT request handler for updating a task
export async function PUT(req: Request, { params }: { params: { taskId: string } }) {
    await connect(); // Ensure MongoDB connection

    try {
        const { title, description, status } = await req.json(); // Parse the request body

        // Find task by ID and update fields
        const updatedTask = await Task.findByIdAndUpdate(
            params.taskId, 
            { title, description, status }, // Update title, description, and status
            { new: true }
        );

        if (!updatedTask) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json(updatedTask); // Return the updated task
    } catch (error) {
        console.error('Error updating task:', error); // Log the error for debugging
        return NextResponse.json({ error: 'Error updating task' }, { status: 400 });
    }
}

// DELETE request handler for deleting a task
export async function DELETE(req: Request, { params }: { params: { taskId: string } }) {
    await connect(); // Ensure MongoDB connection

    try {
        const deletedTask = await Task.findByIdAndDelete(params.taskId);

        if (!deletedTask) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error); // Log the error for debugging
        return NextResponse.json({ error: 'Error deleting task' }, { status: 400 });
    }
}

import { NextApiRequest, NextApiResponse } from 'next';
import Task from '@/models/taskModel';
import { connect } from '@/dbConfig/dbConfig';

export default async function helper(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { taskId } = req.query;

    await connect(); // Ensure MongoDB connection

    if (method === 'PUT') {
        // Update a task's status or other fields
        try {
            const { title, description, status } = req.body; // Get fields from the request body

            // Find task by ID and update fields
            const updatedTask = await Task.findByIdAndUpdate(
                taskId, 
                { title, description, status }, // Update title, description, and status
                { new: true }
            );

            if (!updatedTask) {
                return res.status(404).json({ error: 'Task not found' });
            }

            res.status(200).json(updatedTask); // Return the updated task
        } catch (error) {
            console.error('Error updating task:', error); // Log the error for debugging
            res.status(400).json({ error: 'Error updating task' });
        }
    } else if (method === 'DELETE') {
        // Handle task deletion if necessary
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

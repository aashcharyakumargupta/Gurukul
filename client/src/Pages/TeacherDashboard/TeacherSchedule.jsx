import React, { useState } from 'react';

const TeacherSchedule = () => {
    const [schedule, setSchedule] = useState([
        { id: 1, course: 'Math 101', day: 'Monday', time: '10:00 - 11:00 AM' },
        { id: 2, course: 'History 202', day: 'Tuesday', time: '11:00 - 12:00 PM' },
        { id: 3, course: 'Science 303', day: 'Wednesday', time: '1:00 - 2:00 PM' },
    ]);
    const [formData, setFormData] = useState({ course: '', day: '', time: '' });
    const [editing, setEditing] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddOrUpdate = () => {
        if (editing) {
            setSchedule(schedule.map(item => (item.id === editing ? { ...item, ...formData } : item)));
        } else {
            setSchedule([...schedule, { id: Date.now(), ...formData }]);
        }
        resetForm();
    };

    const handleEdit = (item) => {
        setFormData({ course: item.course, day: item.day, time: item.time });
        setEditing(item.id);
    };

    const handleDelete = (id) => {
        setSchedule(schedule.filter(item => item.id !== id));
    };

    const resetForm = () => {
        setFormData({ course: '', day: '', time: '' });
        setEditing(null);
    };

    return (
        <div className=" w-full p-5 bg-gray-900 text-white">
            <h2 className=" text-3xl font-bold mb-6">Teacher Timetable</h2>

            <div className="mb-6">
                <input
                    type="text"
                    name="course"
                    placeholder="Course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="p-2 mr-2 rounded bg-gray-800 text-white"
                />
                <input
                    type="text"
                    name="day"
                    placeholder="Day"
                    value={formData.day}
                    onChange={handleInputChange}
                    className="p-2 mr-2 rounded bg-gray-800 text-white"
                />
                <input
                    type="text"
                    name="time"
                    placeholder="Time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="p-2 mr-2 rounded bg-gray-800 text-white"
                />
                <button
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleAddOrUpdate}
                >
                    {editing ? 'Update' : 'Add'}
                </button>
            </div>

            <table className="min-w-full bg-gray-800 border border-gray-700">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Course</th>
                        <th className="border px-4 py-2">Day</th>
                        <th className="border px-4 py-2">Time</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map(item => (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">{item.course}</td>
                            <td className="border px-4 py-2">{item.day}</td>
                            <td className="border px-4 py-2">{item.time}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 ml-2"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherSchedule;

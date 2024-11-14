import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const sceneRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const engine = Matter.Engine.create();
        const render = Matter.Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
            },
        });
        const boxes = [
            Matter.Bodies.circle(50, 100, 10, {  
                render: { fillStyle: 'cyan' },
                restitution: 1.8 
            }),
            Matter.Bodies.circle(80, 100, 10, {  
                render: { fillStyle: 'green' },
                restitution: 0.8
            }),
            Matter.Bodies.circle(110, 100, 10, {  
                render: { fillStyle: 'yellow' },
                restitution: 0.8
            }),
        ];

        const ground = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 10, window.innerWidth, 20, { isStatic: true });

        Matter.World.add(engine.world, [...boxes, ground]);

        Matter.Engine.run(engine);
        Matter.Render.run(render);

        return () => {
            Matter.Render.stop(render);
            Matter.Engine.clear(engine);
        };
    }, []);
    return (
        <div className='bg-zinc-800 h-screen flex justify-center items-center relative overflow-hidden'>
            <div ref={sceneRef} className='absolute inset-0' />
            <div className='flex flex-col justify-center items-center z-10 px-4'>
                <h1 className='text-4xl md:text-5xl lg:text-6xl text-white mb-5 text-center'>Welcome to the Dashboard</h1>
                <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                    <div onClick={() => navigate('/adminLogin')} className='p-10 bg-blue-600 rounded-lg shadow-lg text-white flex flex-col items-center cursor-pointer'>
                        <h2 className='text-2xl'>Admin</h2>
                        <p className='text-center'>Manage all administrative tasks.</p>
                    </div>
                    <div onClick={() => navigate('/studentLogin')} className='p-10 bg-green-600 rounded-lg shadow-lg text-white flex flex-col items-center cursor-pointer'>
                        <h2 className='text-2xl'>Student</h2>
                        <p className='text-center'>Access course materials and assignments.</p>
                    </div>
                    <div onClick={() => navigate('/teacherLogin')} className='p-10 bg-red-600 rounded-lg shadow-lg text-white flex flex-col items-center cursor-pointer'>
                        <h2 className='text-2xl'>Teacher</h2>
                        <p className='text-center'>Create courses and track progress.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

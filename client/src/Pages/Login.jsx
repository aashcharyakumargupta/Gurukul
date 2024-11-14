import React, { useEffect } from 'react';
import logo from "../assets/logo.jpg";
import { useNavigate } from 'react-router-dom';
import Matter from 'matter-js';


const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = window.Matter;

    const engine = Engine.create();
    const render = Render.create({
      element: document.getElementById('animation-container'),
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: '#1a1a1a'
      }
    });

    // Create dynamic shapes with a high restitution (bounciness) and low air friction
    const shapes = [
      Bodies.rectangle(200, 200, 60, 60, { restitution: 0.9, frictionAir: 0.02, render: { fillStyle: '#0dcaf0' } }),
      Bodies.circle(400, 100, 40, { restitution: 0.9, frictionAir: 0.02, render: { fillStyle: '#6610f2' } }),
      Bodies.rectangle(600, 200, 80, 80, { restitution: 0.9, frictionAir: 0.02, render: { fillStyle: '#d63384' } }),
      Bodies.circle(800, 150, 50, { restitution: 0.9, frictionAir: 0.02, render: { fillStyle: '#ffc107' } }),
    ];

    // Create ground and walls to keep shapes within the viewport
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 30, window.innerWidth, 60, {
      isStatic: true,
      render: { fillStyle: '#343a40' }
    });
    const leftWall = Bodies.rectangle(-30, window.innerHeight / 2, 60, window.innerHeight, { isStatic: true });
    const rightWall = Bodies.rectangle(window.innerWidth + 30, window.innerHeight / 2, 60, window.innerHeight, { isStatic: true });

    Composite.add(engine.world, [...shapes, ground, leftWall, rightWall]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, { mouse: mouse });
    Composite.add(engine.world, mouseConstraint);

    render.mouse = mouse;

    // Apply random force every 1.5 seconds to keep shapes moving
    const applyRandomForce = () => {
      shapes.forEach(shape => {
        const forceMagnitude = 0.005 * shape.mass;
        const randomX = Math.random() * forceMagnitude - forceMagnitude / 2;
        const randomY = Math.random() * forceMagnitude - forceMagnitude / 2;
        Matter.Body.applyForce(shape, shape.position, { x: randomX, y: randomY });
      });
    };

    const forceInterval = setInterval(applyRandomForce, 1500);

    Engine.run(engine);
    Render.run(render);

    // Resize listener to adjust animation canvas on window resize
    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      Composite.remove(engine.world, ground);
      const updatedGround = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 30, window.innerWidth, 60, {
        isStatic: true,
        render: { fillStyle: '#343a40' }
      });
      Composite.add(engine.world, updatedGround);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      Render.stop(render);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      clearInterval(forceInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleProceed = () => {
    navigate("/dashboard");
  };

  return (
    <>
      {/* Full-screen animation background */}
      <div id="animation-container" className="fixed top-0 left-0 w-full h-full -z-10" />

      {/* Main content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-6">
        <div className="logo mb-8">
          <img src={logo} alt="Welcome Logo" className="rounded-full w-40 h-40 object-cover shadow-lg" />
        </div>
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Our Platform</h1>
        <p className="text-gray-400 text-lg mb-10 max-w-md">
          Dive into a sleek, seamless experience that’s all about you!
        </p>
        <button onClick={handleProceed} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out">
          Get Started
        </button>
      </div>
    </>
  );
};

export default Welcome;

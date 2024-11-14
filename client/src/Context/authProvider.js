import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // get Admin from local storage
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("Admin");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // get Teacher from local storage
  const [authTeacher, setAuthTeacher] = useState(() => {
    const storedTeacher = localStorage.getItem("Teacher");
    return storedTeacher ? JSON.parse(storedTeacher) : null;
  });

  // get student from local storage
  const [authStudent, setAuthStudent] = useState(() => {
    const storedStudent = localStorage.getItem("Student")
    return storedStudent ? JSON.parse(storedStudent) : null;
  });

  // Admin logout
  const logOut = () => {
    localStorage.removeItem("Admin");
    setAuthUser(null);
    toast.success("Logged out successfully!");
  };

  // Teacher logout
  const logOutTeacher = () => {
    localStorage.removeItem("Teacher");
    setAuthTeacher(null);
    toast.success("Logged out successfully!");
  };

  // Student Logout
  const logoutStudent = () => {
    localStorage.removeItem("Student");
    setAuthStudent(null);
  }

  // Debugging output
  useEffect(() => {
    console.log('Auth User:', authUser);
    console.log('Auth Teacher:', authTeacher);
  }, [authUser, authTeacher]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logOut, logOutTeacher, authTeacher, setAuthTeacher, authStudent, setAuthStudent, logoutStudent }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

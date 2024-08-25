import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gallery from './pages/Gallery';
import TodoList from './pages/TodoList';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/todoList" element={<TodoList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} /> {/* Default route */}
        </Routes>
    </Router>
  );
};

export default App;
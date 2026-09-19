import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import BookDetail from './pages/BookDetail';
import MyList from './pages/MyList';
import AdminDashboard from './pages/AdminDashboard';
import CategoriesManager from './pages/CategoriesManager';
import UsersManager from './pages/UsersManager';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-vh-100 d-flex flex-column bg-light">
          <NavigationBar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/categories" element={<CategoriesManager />} />
              <Route path="/admin/users" element={<UsersManager />} />
              
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
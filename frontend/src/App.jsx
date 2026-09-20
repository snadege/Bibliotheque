import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavigationBar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
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
              {/* Routes publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />}/>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books/:id" element={<BookDetail />} />
              
              {/* Routes protégées pour utilisateurs connectés */}
              <Route element={<PrivateRoute />}>
                <Route path="/my-list" element={<MyList />} />
              </Route>

              <Route element={<PrivateRoute adminOnly={true}/>}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/categories" element={<CategoriesManager />} />
                <Route path="/admin/users" element={<UsersManager />} />
              </Route>
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
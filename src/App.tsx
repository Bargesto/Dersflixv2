import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
import { SiteProvider } from './context/SiteContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddVideo from './components/AddVideo';
import VideoPlayer from './components/VideoPlayer';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <SiteProvider>
        <Router>
          <div className="min-h-screen bg-black text-white">
            <Navbar />
            <main className="container mx-auto px-4 pt-20">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/add"
                  element={
                    <ProtectedRoute>
                      <AddVideo />
                    </ProtectedRoute>
                  }
                />
                <Route path="/watch/:videoId" element={<VideoPlayer />} />
              </Routes>
            </main>
          </div>
        </Router>
      </SiteProvider>
    </AuthProvider>
  );
}

export default App;
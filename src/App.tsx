import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Practice from './pages/Practice';
import MyScript from './pages/MyScript';
import ScriptDetail from './pages/ScriptDetail';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/my-script" element={<MyScript />} />
      <Route path="/my-script/:id" element={<ScriptDetail />} />
    </Routes>
  );
}

export default App;

import Intro from "./pages/Intro";
import Upload from "./pages/Upload";
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/file/:id" element={<ProtectedRoute />} />
      </Routes>
    </>
  );
}

export default App;

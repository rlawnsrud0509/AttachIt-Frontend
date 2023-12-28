import PostLayout from "./components/postLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Redirect from "./pages/redirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostLayout />} />
        <Route path="/auth" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

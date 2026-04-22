import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resources from "../pages/Resources";
import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Resources />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

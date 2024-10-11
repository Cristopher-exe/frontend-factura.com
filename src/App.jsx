import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import VistaUno from "./pages/VistaUno";
import VistaDos from "./pages/VistaDos";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex">
          <Sidebar className="h-screen fixed" />

          <div className="flex-1 h-screen overflow-y-auto">
            <Routes>
              <Route path="/" element={<VistaUno />} />
              <Route path="/vista-dos" element={<VistaDos />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

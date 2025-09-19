import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { RunTracker } from "./pages/RunTracker";
// import { Statistics } from "./pages/Statistics";
// import { Friends } from "./pages/Friends";
import { useWebSocket } from "./hooks/useWebSocket";
import { useAuth } from "./hooks/useAuth";
import { CRTEffect } from "./components/common/CRTEffect";

function App() {
  const { isAuthenticated } = useAuth();
  useWebSocket(); // Initialize WebSocket connection

  return (
    <>
      <CRTEffect />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/run" element={<RunTracker />} />
          {/* <Route path="/stats" element={<Statistics />} /> */}
          {/* <Route path="/friends" element={<Friends />} /> */}
        </Routes>
      </Layout>
    </>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Management from "./components/Management/Management";
import HomeMain from "./Home/HomeMain";
import CommonLogin from "./components/Management/CommonLogin";
import CommonProfileCreate from "./components/Management/CommonProfiles/CommonProfileCreate";

import { AuthProvider } from "./context/AuthContext.jsx"; // ✅ step 1
import { MessageProvider } from "./components/Management/Message/MessageContext.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Management />} />
        <Route path="/home" element={  // ✅ step 2
          <AuthProvider>
            <MessageProvider>
              <HomeMain />
            </MessageProvider>
          </AuthProvider>
        } />
        <Route path="/management/common-login" element={<CommonLogin />} />
        <Route path="/management/common-profile-create" element={<CommonProfileCreate />} />
      </Routes>
    </Router>
  );
}

export default App;

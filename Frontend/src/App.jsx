import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import BabyInfo from "./pages/BabyInfo/BabyInfo.jsx";
import BabyFace from "./pages/BabyFace/BabyFace.jsx";
import QRCode from "./pages/QRCode/QRCode.jsx";
import EBMDelivery from "./pages/EBMDelivery/EBMDelivery.jsx";
import EBMUse from "./pages/EBMUse/EBMUse.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import BabyFootPrint from "./pages/BabyPrint/BabyPrint.jsx";
import MomInfo from "./pages/MomInfo/MomInfo.jsx";
import EBMTable from "./pages/EBM-Table/EBMTable.jsx";
import EBMCalculation from "./pages/EBMCalculation/EBMCalculation.jsx";
import MessageCenter from "./pages/Messaging/Message.jsx";
import AdminHome from "./pages/Admin/Admin-Home.jsx";
import NurseProfiles from "./pages/NurseProfiles/NurseProfiles.jsx";
import ParentProfiles from "./pages/ParentProfiles/ParentProfiles.jsx";
import SuccessVerification from "./pages/SuccessVerification/SuccessVerification.jsx";
import FailedVerification from "./pages/FailedVerification/FailedVerification.jsx";
import AdminProfile from "./pages/AdminProfile/AdminProfile..jsx";
import Baby from "./pages/Baby/Baby.jsx";
import BabyTable from "./pages/BabyTable/BabyTable.jsx";
import MessagingParent from "./pages/MessagingParent/MessagingParent.jsx";
import BabyProfile from "./pages/babyProfile/babyProfile.jsx";
import MotherID from "./pages/MotherID/MotherID.jsx";
import EBMVerification from "./pages/EBMVerification/EBMVerification.jsx";
import LoginLayout from "./pages/LoginLayout/LoginLayout.jsx";
import AdminLayout from "./pages/AdminLayout/AdminLayout.jsx";
import ParentLayout from "./pages/ParentLayout/ParentLayout.jsx";

let routers = createBrowserRouter([
  // Standalone pages outside Layout
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      { index: "Register", element: <Register /> },
      { path: "Login", element: <Login /> },
    ],
  },
  // Nurse routes within Layout
  {
    path: "/nurse",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "baby-information", element: <BabyInfo /> },
      { path: "baby-face", element: <BabyFace /> },
      { path: "baby-foot", element: <BabyFootPrint /> },
      { path: "QR-code", element: <QRCode /> },
      { path: "EBMDelivery", element: <EBMDelivery /> },
      { path: "EBMUse", element: <EBMUse /> },
      { path: "Profile", element: <Profile /> },
      { path: "mom-information", element: <MomInfo /> },
      { path: "mom-id", element: <MotherID /> },
      { path: "EBMTable", element: <EBMTable /> },
      { path: "EBMCalculation", element: <EBMCalculation /> },
      { path: "EBMVerification", element: <EBMVerification /> },
      { path: "Messaging", element: <MessageCenter /> },
    ],
  },
  //admin routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHome /> },
      { path: "admin-dashboard", element: <AdminHome /> },
      { path: "nurse-profiles", element: <NurseProfiles /> },
      { path: "parent-profiles", element: <ParentProfiles /> },
      { path: "success-verification", element: <SuccessVerification /> },
      { path: "failed-verification", element: <FailedVerification /> },
      { path: "admin-profile", element: <AdminProfile /> },
    ],
  },
  //parent routes
  {
    path: "/parent",
    element: <ParentLayout />,
    children: [
      { index: true, element: <Baby /> },
      { path: "baby-info", element: <Baby /> },
      { path: "ebm-table", element: <BabyTable /> },
      { path: "baby-profile", element: <BabyProfile /> },
      { path: "baby-messaging", element: <MessagingParent /> },
    ],
  },
]);

const App = () => {
  return (
    <I18nextProvider>
      <RouterProvider router={routers} />
    </I18nextProvider>
  );
};

export default App;

import React, { useState } from "react";
import TitleMain from "../TitleMain";
import LeftBar from "./LeftBar";
import WorkPlace from "./WorkPlace";
import BottomBar from "./BottomBar";
import BabyInfo from "../components/BabyInfo/BabyInfo";
import BabyFacePhoto from "../components/BabyFacePhoto/BabyFacePhoto";
import BabyFootPrint from "../components/BabyFootPrint/BabyFootPrint";
import BabyRetinaPrint from "../components/BabyRetinaPrint/BabyRetinaPrint";
import MotherInfo from "../components/MotherInfo";
import MotherInfoID from "../components/MotherInfoID/MotherInfoID";
import MotherFingerPrint from "../components/MotherFingerPrint/MotherFingerPrint";
import EBMDeliveryInfo from "../components/EBMDelivery/EBMDeliveryInfo";
import QRCodeGenerate from "../components/EBMDelivery/QRCodeGenerate";
import EBMUseCalc from "../components/EBMUse/EBMUseCalc";
import EBMDeliveryTable from "../components/EBMDelivery/EBMDeliveryTable";
import EBMUseInfo from "../components/EBMUse/EBMUseInfo";
import EBMVerify from "../components/EBMVerify/EBMVerify";
import MessageCenter from "../components/Management/Message/MessageCenter";
import AdminProfileView from "../components/Management/Admin/AdminProfileView";
import NurseProfileView from "../components/Management/Nurses/NurseProfileView";
import ParentProfileView from "../components/Management/Parents/ParentProfileView";
import "./HomeMain.css";

const HomeMain = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentSelect = (componentName) => {
    switch (componentName) {
      case "Baby Information":
        setSelectedComponent(() => BabyInfo);
        break;
      case "Baby Face Photo":
        setSelectedComponent(() => BabyFacePhoto);
        break;
      case "Baby Foot Print":
        setSelectedComponent(() => BabyFootPrint);
        break;
      case "Baby Retina Print":
        setSelectedComponent(() => BabyRetinaPrint);
        break;
      case "Mother Information":
        setSelectedComponent(() => MotherInfo);
        break;
      case "Mother ID":
        setSelectedComponent(() => MotherInfoID);
        break;
      case "Mother Finger Print":
        setSelectedComponent(() => MotherFingerPrint);
        break;
      case "EBM Information":
        setSelectedComponent(() => EBMDeliveryInfo);
        break;
      case "QR Code":
        setSelectedComponent(() => QRCodeGenerate);
        break;
      case "EBM Calculation":
        setSelectedComponent(() => EBMUseCalc);
        break;
      case "EBM Tables":
        setSelectedComponent(() => EBMDeliveryTable);
        break;
      case "EBM Use":
        setSelectedComponent(() => EBMUseInfo);
        break;
      case "EBM Verification":
        setSelectedComponent(() => EBMVerify);
        break;
      case "AdminProfile":
        setSelectedComponent(() => AdminProfileView);
        break;
      case "NurseProfile":
        setSelectedComponent(() => NurseProfileView);
        break;
      case "ParentProfile":
        setSelectedComponent(() => ParentProfileView);
        break;
      case "Messaging":
        setSelectedComponent(() => MessageCenter);
        break;
      default:
        setSelectedComponent(null);
    }
  };

  const getSectionName = () => {
    switch (selectedComponent) {
      case BabyInfo:
        return "Baby Information";
      case BabyFacePhoto:
        return "Baby Face Photo";
      case BabyFootPrint:
        return "Baby Foot Print";
      case BabyRetinaPrint:
        return "Baby Retina Print";
      case MotherInfo:
        return "Mother Information";
      case MotherInfoID:
        return "Mother ID";
      case MotherFingerPrint:
        return "Mother Finger Print";
      case EBMDeliveryInfo:
        return "EBM Delivery";
      case QRCodeGenerate:
        return "QR Code";
      case EBMUseCalc:
        return "EBM Calculation";
      case EBMDeliveryTable:
        return "EBM Tables";
      case EBMUseInfo:
        return "EBM Use";
      case EBMVerify:
        return "EBM Verification";
      case AdminProfileView:
        return "AdminProfile";
      case NurseProfileView:
        return "NurseProfile";
      case ParentProfileView:
        return "ParentProfile";
      case MessageCenter:
        return "Messaging";
      default:
        return "";
    }
  };

  return (
    <div className="home-container">
      <TitleMain />
      <div className="main-layout">
        <div className="left-column">
          <LeftBar onSelectComponent={handleComponentSelect} />
        </div>
        <div className="center-column">
          <WorkPlace activeComponent={selectedComponent} />
        </div>
      </div>
      <BottomBar sectionName={getSectionName()} />
    </div>
  );
};

export default HomeMain;

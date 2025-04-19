import React, { useState } from "react";
import TitleSub from "../TitleSub"; // Make sure the path is correct
import BabyFacePhotoCapture from "./BabyFacePhotoCapture";
import BabyFacePhotoUpload from "./BabyFacePhotoUpload";
import BabyFacePhotoSave from "./BabyFacePhotoSave";
import BabyFacePhotoHelp from "./BabyFacePhotoHelp";

const BabyFacePhoto = ({ babyName, babyMRN, loggedInUser }) => {
  const [capturedVideo, setCapturedVideo] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  return (
<div style={{ textAlign: "center", padding: "20px" }}>
      <TitleSub sectionTitle="Baby Face Photo" babyName={babyName} babyMRN={babyMRN} loggedInUser={loggedInUser} />

      <BabyFacePhotoCapture setCapturedVideo={setCapturedVideo} />
      <BabyFacePhotoUpload setUploadedVideo={setUploadedVideo} />
      <BabyFacePhotoSave capturedVideo={capturedVideo} uploadedVideo={uploadedVideo} />
      <BabyFacePhotoHelp />
    </div>
  );
};

export default BabyFacePhoto;

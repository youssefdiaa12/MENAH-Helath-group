import React, { useEffect, useContext } from "react";
import { BabyContext } from "../../context/BabyContext";

const BabyInfoIdentify = () => {
  const { babyData, updateBabyData } = useContext(BabyContext);

  // Auto-generate Visit Number based on MRN
  useEffect(() => {
    if (babyData.babyMRN && !babyData.visitNumber) {
      const now = new Date();
      const timestamp = now.toISOString().replace(/[-:.TZ]/g, "").slice(0, 12);
      const generatedVisit = `${babyData.babyMRN}-${timestamp}`;
      updateBabyData({ visitNumber: generatedVisit });
    }
  }, [babyData.babyMRN, babyData.visitNumber, updateBabyData]);

  return (
    <div>
      <label>MRN:</label>
      <input
        type="text"
        value={babyData.babyMRN || ""}
        onChange={(e) =>
          updateBabyData({
            babyMRN: e.target.value,
            visitNumber: "", // Reset visit number when MRN changes
          })
        }
      />

      <label>Visit Number:</label>
      <input type="text" value={babyData.visitNumber || ""} readOnly />

      <label>Passport / Personal ID:</label>
      <input
        type="text"
        value={babyData.passportId || ""}
        onChange={(e) =>
          updateBabyData({ passportId: e.target.value })
        }
      />

      <label>Birth Certificate ID:</label>
      <input
        type="text"
        value={babyData.birthCertificateId || ""}
        onChange={(e) =>
          updateBabyData({ birthCertificateId: e.target.value })
        }
      />
    </div>
  );
};

export default BabyInfoIdentify;
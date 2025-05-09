"use client"

const Baby = () => {
  // In a real application, this data would come from props or an API
  const babyData = {
    name: "Salma Mohamed",
    gender: "Female",
    mrn: "12345",
    dateOfBirth: "24/04/2025",
    daysOfLife: "5 days",
    birthWeight: "3200 g",
    gestationalAgeAtBirth: "39 weeks, 2 days",
    correctedGestationalAge: "39 weeks, 7 days",
    birthCertificateNumber: "2025-45782",
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-xl font-semibold text-center mb-4">Baby Information</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-20">
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Baby Name: </span>
            <span>{babyData.name}</span>
          </div>

          <div>
            <span className="font-semibold">Gender: </span>
            <span>{babyData.gender}</span>
          </div>

          <div>
            <span className="font-semibold">MRN (medical record number): </span>
            <span>{babyData.mrn}</span>
          </div>

          <div>
            <span className="font-semibold">Date of Birth: </span>
            <span>{babyData.dateOfBirth}</span>
          </div>

          <div>
            <span className="font-semibold">Days of Life: </span>
            <span>{babyData.daysOfLife}</span>
          </div>

          <div>
            <span className="font-semibold">Birth Weight: </span>
            <span>{babyData.birthWeight}</span>
          </div>

          <div>
            <span className="font-semibold">Gestational Age at Birth: </span>
            <span>{babyData.gestationalAgeAtBirth}</span>
          </div>

          <div>
            <span className="font-semibold">Corrected Gestational Age: </span>
            <span>{babyData.correctedGestationalAge}</span>
          </div>

          <div>
            <span className="font-semibold">Birth Certificate Number: </span>
            <span>{babyData.birthCertificateNumber}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Baby

import { useFormik } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object({
  babyNameEnglish: Yup.string().required("Baby name is required"),
  mrn: Yup.string().required("MRN is required"),
  gender: Yup.string().required("Gender is required"),
  personalId: Yup.string().required("Personal ID is required"),
  birthDate: Yup.string().required("Birth date is required"),
  daysOfLife: Yup.number().typeError("Must be a number").required("Days of life is required"),
  gestationalAgeWeeks: Yup.string().required("Weeks is required"),
  gestationalAgeDays: Yup.string().required("Days is required"),
  correctedGestationalAge: Yup.string().required("Corrected gestational age is required"),
  visitNumber: Yup.string().required("Visit number is required"),
  passportId: Yup.string(),
  birthCertificate: Yup.string(),
  currentDate: Yup.string().required("Current date is required"),
  birthWeight: Yup.string().required("Birth weight is required"),
})

const BabyInfo = () => {
  const formik = useFormik({
    initialValues: {
      babyNameEnglish: "",
      babyNameArabic: "",
      mrn: "",
      gender: "",
      personalId: "",
      birthDate: "",
      daysOfLife: "",
      gestationalAgeWeeks: "",
      gestationalAgeDays: "",
      correctedGestationalAge: "",
      visitNumber: "",
      passportId: "",
      birthCertificate: "",
      currentDate: "",
      birthWeight: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values)
      // Add your form submission logic here
      alert("Form submitted successfully!")
    },
  })

  return (
    <div className=" p-6 pt-2 rounded-md mx-auto ">
      <h1 className="text-2xl font-semibold text-center mb-6">Baby Information</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <label className="block text-sm font-medium text-gray-700 mb-1">Baby Name (English)</label>
                <span className="text-sm text-gray-500 mb-1">اسم الطفل (بالعربية)</span>
              </div>
              <input
                type="text"
                id="babyNameEnglish"
                name="babyNameEnglish"
                placeholder="Enter Name"
                className={`w-full p-2 border ${
                  formik.touched.babyNameEnglish && formik.errors.babyNameEnglish ? "border-red-500" : "border-gray-300"
                } rounded`}
                {...formik.getFieldProps("babyNameEnglish")}
              />
              {formik.touched.babyNameEnglish && formik.errors.babyNameEnglish && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.babyNameEnglish}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MRN (medical record number)</label>
              <input
                type="text"
                id="mrn"
                name="mrn"
                placeholder="Enter MRN"
                className={`w-full p-2 border ${
                  formik.touched.mrn && formik.errors.mrn ? "border-red-500" : "border-gray-300"
                } rounded`}
                {...formik.getFieldProps("mrn")}
              />
              {formik.touched.mrn && formik.errors.mrn && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.mrn}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  className={`w-full p-2 border ${
                    formik.touched.gender && formik.errors.gender ? "border-red-500" : "border-gray-300"
                  } rounded appearance-none bg-white`}
                  {...formik.getFieldProps("gender")}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {formik.touched.gender && formik.errors.gender && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.gender}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Personal (National ID)</label>
              <input
                type="text"
                id="personalId"
                name="personalId"
                placeholder="Enter Personal ID"
                className={`w-full p-2 border ${
                  formik.touched.personalId && formik.errors.personalId ? "border-red-500" : "border-gray-300"
                } rounded`}
                {...formik.getFieldProps("personalId")}
              />
              {formik.touched.personalId && formik.errors.personalId && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.personalId}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Baby date of birth</label>
              <div className="relative">
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  placeholder="Select Date"
                  className={`w-full p-2 border ${
                    formik.touched.birthDate && formik.errors.birthDate ? "border-red-500" : "border-gray-300"
                  } rounded`}
                  {...formik.getFieldProps("birthDate")}
                />

              </div>
              {formik.touched.birthDate && formik.errors.birthDate && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.birthDate}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Days of life (DOL)</label>
              <input
                type="text"
                id="daysOfLife"
                name="daysOfLife"
                className={`w-full p-2 border ${
                  formik.touched.daysOfLife && formik.errors.daysOfLife ? "border-red-500" : "border-gray-300"
                } rounded`}
                {...formik.getFieldProps("daysOfLife")}
              />
              {formik.touched.daysOfLife && formik.errors.daysOfLife && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.daysOfLife}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gestational Age at Birth (GA)</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <select
                    id="gestationalAgeWeeks"
                    name="gestationalAgeWeeks"
                    className={`w-full p-2 border ${
                      formik.touched.gestationalAgeWeeks && formik.errors.gestationalAgeWeeks
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded appearance-none bg-white`}
                    {...formik.getFieldProps("gestationalAgeWeeks")}
                  >
                    <option value="">Select Weeks</option>
                    {Array.from({ length: 42 }, (_, i) => i + 22).map((week) => (
                      <option key={week} value={week}>
                        {week}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              {formik.touched.gestationalAgeWeeks && formik.errors.gestationalAgeWeeks && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.gestationalAgeWeeks}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Corrected gestational age (CGA)</label>
              <input
                type="text"
                id="correctedGestationalAge"
                name="correctedGestationalAge"
                className={`w-full p-2 border ${
                  formik.touched.correctedGestationalAge && formik.errors.correctedGestationalAge
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
                {...formik.getFieldProps("correctedGestationalAge")}
              />
              {formik.touched.correctedGestationalAge && formik.errors.correctedGestationalAge && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.correctedGestationalAge}</div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visit Number</label>
              <input
                type="text"
                id="visitNumber"
                name="visitNumber"
                placeholder="Enter Visit Number"
                className={`w-full p-2 border ${
                  formik.touched.visitNumber && formik.errors.visitNumber ? "border-red-500" : "border-gray-300"
                } rounded`}
                {...formik.getFieldProps("visitNumber")}
              />
              {formik.touched.visitNumber && formik.errors.visitNumber && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.visitNumber}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Passport ID</label>
              <input
                type="text"
                id="passportId"
                name="passportId"
                placeholder="Enter Passport ID"
                className={`w-full p-2 border ${
                  formik.touched.passportId && formik.errors.passportId ? "border-red-500" : "border-gray-300"
                } rounded`}
                {...formik.getFieldProps("passportId")}
              />
              {formik.touched.passportId && formik.errors.passportId && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.passportId}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Birth certificate</label>
              <input
                type="text"
                id="birthCertificate"
                name="birthCertificate"
                placeholder="Enter Birth certificate"
                className={`w-full p-2 border ${
                  formik.touched.birthCertificate && formik.errors.birthCertificate
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
                {...formik.getFieldProps("birthCertificate")}
              />
              {formik.touched.birthCertificate && formik.errors.birthCertificate && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.birthCertificate}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current date</label>
              <div className="relative">
                <input
                  type="date"
                  id="currentDate"
                  name="currentDate"
                  placeholder="Select Date"
                  className={`w-full p-2 border ${
                    formik.touched.currentDate && formik.errors.currentDate ? "border-red-500" : "border-gray-300"
                  } rounded`}
                  {...formik.getFieldProps("currentDate")}
                />

              </div>
              {formik.touched.currentDate && formik.errors.currentDate && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.currentDate}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Birth weight</label>
              <div className="relative">
                <select
                  id="birthWeight"
                  name="birthWeight"
                  className={`w-full p-2 border ${
                    formik.touched.birthWeight && formik.errors.birthWeight ? "border-red-500" : "border-gray-300"
                  } rounded appearance-none bg-white`}
                  {...formik.getFieldProps("birthWeight")}
                >
                  <option value="">Select Birth weight</option>
                  {Array.from({ length: 50 }, (_, i) => (i + 5) / 10).map((weight) => (
                    <option key={weight} value={weight}>
                      {weight} kg
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {formik.touched.birthWeight && formik.errors.birthWeight && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.birthWeight}</div>
              )}
            </div>

            <div>
              <div className="relative">
                <select
                  id="gestationalAgeDays"
                  name="gestationalAgeDays"
                  className={`w-full p-2 border ${
                    formik.touched.gestationalAgeDays && formik.errors.gestationalAgeDays
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded appearance-none bg-white`}
                  {...formik.getFieldProps("gestationalAgeDays")}
                >
                  <option value="">Select Days</option>
                  {Array.from({ length: 7 }, (_, i) => i).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {formik.touched.gestationalAgeDays && formik.errors.gestationalAgeDays && (
                <div className="text-red-500 text-xs mt-1">{formik.errors.gestationalAgeDays}</div>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full max-w-xs"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Saving..." : "Save record"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BabyInfo

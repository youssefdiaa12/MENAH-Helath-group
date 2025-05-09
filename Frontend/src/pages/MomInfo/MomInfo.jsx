"use client"

import { useFormik } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object({
  motherNameEnglish: Yup.string().required("Mother name is required"),
  motherAge: Yup.string().required("Mother age is required"),
  motherMRN: Yup.string().required("Mother MRN is required"),
  gravida: Yup.string().required("Gravida is required"),
  para: Yup.string().required("Para is required"),
  abortion: Yup.string().required("Abortion is required"),
  dateOfDelivery: Yup.string().required("Date of delivery is required"),
  typeOfDelivery: Yup.string().required("Type of delivery is required"),
})

const MomInfo = () => {
  const formik = useFormik({
    initialValues: {
      motherNameEnglish: "",
      motherAge: "",
      motherMRN: "",
      gravida: "",
      para: "",
      abortion: "",
      dateOfDelivery: "",
      typeOfDelivery: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values)
      // Add your form submission logic here
      alert("Form submitted successfully!")
    },
  })

  return (
    <div className="p-6 pt-2 rounded-md ">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm">Baby Name</div>
        <h1 className="text-xl font-semibold text-center">Mother Information</h1>
        <div className="text-sm">Baby MRN</div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-4 ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mother Name (English)</label>
            <input
              type="text"
              id="motherNameEnglish"
              name="motherNameEnglish"
              placeholder="Enter Name"
              className={`w-full p-2 border ${
                formik.touched.motherNameEnglish && formik.errors.motherNameEnglish
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded`}
              {...formik.getFieldProps("motherNameEnglish")}
            />
            {formik.touched.motherNameEnglish && formik.errors.motherNameEnglish && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.motherNameEnglish}</div>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mother Age</label>
            <input
              type="text"
              id="motherAge"
              name="motherAge"
              placeholder="Enter Age"
              className={`w-full p-2 border ${
                formik.touched.motherAge && formik.errors.motherAge ? "border-red-500" : "border-gray-300"
              } rounded`}
              {...formik.getFieldProps("motherAge")}
            />
            {formik.touched.motherAge && formik.errors.motherAge && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.motherAge}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mother MRN</label>
            <input
              type="text"
              id="motherMRN"
              name="motherMRN"
              placeholder="Enter MRN"
              className={`w-full p-2 border ${
                formik.touched.motherMRN && formik.errors.motherMRN ? "border-red-500" : "border-gray-300"
              } rounded`}
              {...formik.getFieldProps("motherMRN")}
            />
            {formik.touched.motherMRN && formik.errors.motherMRN && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.motherMRN}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gravida (G)</label>
            <div className="relative">
              <select
                id="gravida"
                name="gravida"
                className={`w-full p-2 border ${
                  formik.touched.gravida && formik.errors.gravida ? "border-red-500" : "border-gray-300"
                } rounded appearance-none bg-white`}
                {...formik.getFieldProps("gravida")}
              >
                <option value="">Select Gravida</option>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {formik.touched.gravida && formik.errors.gravida && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.gravida}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Para (P)</label>
            <div className="relative">
              <select
                id="para"
                name="para"
                className={`w-full p-2 border ${
                  formik.touched.para && formik.errors.para ? "border-red-500" : "border-gray-300"
                } rounded appearance-none bg-white`}
                {...formik.getFieldProps("para")}
              >
                <option value="">Select Para</option>
                {Array.from({ length: 20 }, (_, i) => i).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {formik.touched.para && formik.errors.para && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.para}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Abortion (A)</label>
            <div className="relative">
              <select
                id="abortion"
                name="abortion"
                className={`w-full p-2 border ${
                  formik.touched.abortion && formik.errors.abortion ? "border-red-500" : "border-gray-300"
                } rounded appearance-none bg-white`}
                {...formik.getFieldProps("abortion")}
              >
                <option value="">Select Abortion</option>
                {Array.from({ length: 10 }, (_, i) => i).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {formik.touched.abortion && formik.errors.abortion && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.abortion}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Delivery</label>
            <div className="relative">
              <input
                type="date"
                id="dateOfDelivery"
                name="dateOfDelivery"
                className={`w-full p-2 border ${
                  formik.touched.dateOfDelivery && formik.errors.dateOfDelivery ? "border-red-500" : "border-gray-300"
                } rounded`}
                {...formik.getFieldProps("dateOfDelivery")}
              />
            </div>
            {formik.touched.dateOfDelivery && formik.errors.dateOfDelivery && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.dateOfDelivery}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type of Delivery</label>
            <div className="relative">
              <select
                id="typeOfDelivery"
                name="typeOfDelivery"
                className={`w-full p-2 border ${
                  formik.touched.typeOfDelivery && formik.errors.typeOfDelivery ? "border-red-500" : "border-gray-300"
                } rounded appearance-none bg-white`}
                {...formik.getFieldProps("typeOfDelivery")}
              >
                <option value="">Select Type of delivery</option>
                <option value="normal">Normal Delivery</option>
                <option value="cesarean">Cesarean Section</option>
                <option value="assisted">Assisted Delivery</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {formik.touched.typeOfDelivery && formik.errors.typeOfDelivery && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.typeOfDelivery}</div>
            )}
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

export default MomInfo

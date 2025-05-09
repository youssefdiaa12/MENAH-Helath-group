import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const EBMDeliverySchema = Yup.object().shape({
  bottleId: Yup.string().required("Bottle ID is required"),
  numberOfBottles: Yup.number()
    .required("Number of bottles is required")
    .positive("Number must be positive")
    .integer("Number must be an integer"),
  volumeOfMilk: Yup.number().required("Volume is required").positive("Volume must be positive"),
  dateOfExpression: Yup.date()
    .required("Date of expression is required")
    .max(new Date(), "Date cannot be in the future"),
  dateOfDelivery: Yup.date()
    .required("Date of delivery is required")
    .min(Yup.ref("dateOfExpression"), "Delivery date cannot be before expression date"),
})

const EBMDelivery = () => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // In a real application, you would send this data to your backend
    console.log("Form values:", values)

    // Simulate API call
    setTimeout(() => {
      alert("Form submitted successfully!")
      setSubmitting(false)
      resetForm()
    }, 500)
  }

  return (
    <div className="container p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold">Baby Name</div>
        <div className="text-xl font-bold">EBM Delivery Information</div>
        <div className="text-lg font-semibold">Baby MRN</div>
      </div>

      <Formik
        initialValues={{
          bottleId: "",
          numberOfBottles: "",
          volumeOfMilk: "",
          dateOfExpression: "",
          dateOfDelivery: "",
        }}
        validationSchema={EBMDeliverySchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="bottleId" className="block text-sm font-medium text-gray-700 mb-1">
                Bottle ID
              </label>
              <Field
                type="text"
                name="bottleId"
                id="bottleId"
                className={`w-full px-3 py-2 border ${
                  errors.bottleId && touched.bottleId ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              <ErrorMessage name="bottleId" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="numberOfBottles" className="block text-sm font-medium text-gray-700 mb-1">
                Number of The Bottle
              </label>
              <Field
                type="number"
                name="numberOfBottles"
                id="numberOfBottles"
                placeholder="Enter the number"
                className={`w-full px-3 py-2 border ${
                  errors.numberOfBottles && touched.numberOfBottles ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              <ErrorMessage name="numberOfBottles" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="volumeOfMilk" className="block text-sm font-medium text-gray-700 mb-1">
                Volume of Milk in Each Bottle (ml)
              </label>
              <Field
                type="number"
                name="volumeOfMilk"
                id="volumeOfMilk"
                placeholder="Enter volume"
                className={`w-full px-3 py-2 border ${
                  errors.volumeOfMilk && touched.volumeOfMilk ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
              />
              <ErrorMessage name="volumeOfMilk" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="dateOfExpression" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Expression
              </label>
              <div className="relative">
                <Field
                  type="date"
                  name="dateOfExpression"
                  id="dateOfExpression"
                  className={`w-full px-3 py-2 border ${
                    errors.dateOfExpression && touched.dateOfExpression ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              <ErrorMessage name="dateOfExpression" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="dateOfDelivery" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Delivery to The Hospital
              </label>
              <div className="relative">
                <Field
                  type="date"
                  name="dateOfDelivery"
                  id="dateOfDelivery"
                  className={`w-full px-3 py-2 border ${
                    errors.dateOfDelivery && touched.dateOfDelivery ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              <ErrorMessage name="dateOfDelivery" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-12 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EBMDelivery

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EBMDeliverySchema = Yup.object().shape({
  totalUsedBottles: Yup.number()
    .required("Total number of used bottles is required")
    .min(0, "Number cannot be negative")
    .integer("Number must be an integer"),
  totalVolumeUsed: Yup.number()
    .required("Total volume used is required")
    .min(0, "Volume cannot be negative"),
  totalVolumeDiscarded: Yup.number()
    .required("Total volume discarded is required")
    .min(0, "Volume cannot be negative"),
  totalViableBottles: Yup.number()
    .required("Total number of viable bottles is required")
    .min(0, "Number cannot be negative")
    .integer("Number must be an integer"),
});

const EBMCalculation = () => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // In a real application, you would send this data to your backend
    console.log("Form values:", values);

    // Simulate API call
    setTimeout(() => {
      alert("Form submitted successfully!");
      setSubmitting(false);
      resetForm();
    }, 500);
  };

  return (
    <div className=" p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">Baby Name</div>
        <div className="text-xl font-bold">Used EBM Bottles</div>
        <div className="text-sm text-gray-600">Baby MRN</div>
      </div>

      <Formik
        initialValues={{
          totalUsedBottles: 0,
          totalVolumeUsed: 0,
          totalVolumeDiscarded: 0,
          totalViableBottles: 0,
        }}
        validationSchema={EBMDeliverySchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="totalUsedBottles"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Total Number of Used Bottles
              </label>
              <Field
                type="number"
                name="totalUsedBottles"
                id="totalUsedBottles"
                placeholder="0"
                className={`w-full px-3 py-2 border ${
                  errors.totalUsedBottles && touched.totalUsedBottles
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none`}
              />
              <ErrorMessage
                name="totalUsedBottles"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="totalVolumeUsed"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Total Volume of Milk Used (ml)
              </label>
              <Field
                type="number"
                name="totalVolumeUsed"
                id="totalVolumeUsed"
                placeholder="0"
                className={`w-full px-3 py-2 border ${
                  errors.totalVolumeUsed && touched.totalVolumeUsed
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none`}
              />
              <ErrorMessage
                name="totalVolumeUsed"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="totalVolumeDiscarded"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Total Volume of Milk Discarded (ml)
              </label>
              <Field
                type="number"
                name="totalVolumeDiscarded"
                id="totalVolumeDiscarded"
                placeholder="0"
                className={`w-full px-3 py-2 border ${
                  errors.totalVolumeDiscarded && touched.totalVolumeDiscarded
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none`}
              />
              <ErrorMessage
                name="totalVolumeDiscarded"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="totalViableBottles"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Total Number of Viable EBM Bottles
              </label>
              <Field
                type="number"
                name="totalViableBottles"
                id="totalViableBottles"
                placeholder="0"
                className={`w-full px-3 py-2 border ${
                  errors.totalViableBottles && touched.totalViableBottles
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none`}
              />
              <ErrorMessage
                name="totalViableBottles"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
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
  );
};

export default EBMCalculation;

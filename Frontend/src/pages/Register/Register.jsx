"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [photoName, setPhotoName] = useState("");
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    profileType: Yup.string().required("Profile type is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    userName: Yup.string().required("Username is required"),
    mobile: Yup.string().required("Mobile number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      profileType: "",
      firstName: "",
      lastName: "",
      userName: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      photo: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("username", values.userName);
        formData.append("firstname", values.firstName);
        formData.append("lastname", values.lastName);
        formData.append("mobile", values.mobile);
        formData.append("profileImage", values.photo);
        formData.append("password", values.password);
        formData.append("profileType", values.profileType);

        const response = await axios.post(
          "http://localhost:8080/user/signup",
          formData
        );
        console.log(response.data);

        if (response.data.Status) {
          toast.success("You have signed up successfully!");
          navigate("/login"); // Navigate to login page
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Signup failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handlePhotoChange = (event) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const file = event.currentTarget.files[0];
      formik.setFieldValue("photo", file);
      setPhotoName(file.name);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column - Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8226a771bd38aa2ace85502d7d90f41faa12468b%20%281%29.jpg-298LFdJXdJe2Ab3EtcYUKiyHQPv06N.jpeg"
          alt="Medical care"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-xl px-4">
          <h1 className="text-3xl font-semibold  mb-8 text-gray-800">
            Create an Account
          </h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-6">
              {/* Profile Type */}
              <div>
                <div className="relative">
                  <select
                    id="profileType"
                    name="profileType"
                    value={formik.values.profileType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full py-2 px-0 bg-transparent  border-0 border-b focus:outline-none focus:ring-0 ${
                      formik.touched.profileType && formik.errors.profileType
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  >
                    <option value="" disabled>
                      Select Profile Type
                    </option>
                    <option value="nurse">nurse</option>
                    <option value="admin">admin</option>
                    <option value="parent">parent</option>
                  </select>
                </div>
                {formik.touched.profileType && formik.errors.profileType && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.profileType}
                  </div>
                )}
              </div>

              {/* First Name */}
              <div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full py-2 px-0 bg-transparent placeholder:text-gray-400 border-0 border-b focus:outline-none focus:ring-0 ${
                    formik.touched.firstName && formik.errors.firstName
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.firstName}
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full py-2 px-0 bg-transparent placeholder:text-gray-400 border-0 border-b focus:outline-none focus:ring-0 ${
                    formik.touched.lastName && formik.errors.lastName
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.lastName}
                  </div>
                )}
              </div>

              {/* User Name */}
              <div>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="User Name"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full py-2 px-0 bg-transparent placeholder:text-gray-400 border-0 border-b focus:outline-none focus:ring-0 ${
                    formik.touched.userName && formik.errors.userName
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                />
                {formik.touched.userName && formik.errors.userName && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.userName}
                  </div>
                )}
              </div>

              {/* Mobile */}
              <div>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="Mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full py-2 px-0 bg-transparent placeholder:text-gray-400 border-0 border-b focus:outline-none focus:ring-0 ${
                    formik.touched.mobile && formik.errors.mobile
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.mobile}
                  </div>
                )}
              </div>

              {/* Personal Photo */}
              <div>
                <div
                  className={`flex items-center justify-between py-2 border-0 border-b ${
                    formik.touched.photo && formik.errors.photo
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                >
                  <span className="text-gray-400">
                    {photoName ? photoName : "Personal Photo"}
                  </span>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                      />
                    </svg>
                  </label>
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full py-2 px-0 bg-transparent placeholder:text-gray-400 border-0 border-b focus:outline-none focus:ring-0 ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          showPassword
                            ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        }
                      />
                    </svg>
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full py-2 px-0 placeholder:text-gray-400 bg-transparent border-0 border-b focus:outline-none focus:ring-0 ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          showConfirmPassword
                            ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        }
                      />
                    </svg>
                  </button>
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300 mt-6"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className=" mt-6 text-sm font-normal text-gray-400">
            Already have an account?{" "}
            <Link to={"/Login"} className="text-green-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

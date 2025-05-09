import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // U
  const validationSchema = Yup.object({
    profileType: Yup.string().required("Profile type is required"),
    username: Yup.string().required("username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      profileType: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post("http://localhost:8080/user/signin", {
          username: values.username, // Assuming username is the username
          password: values.password,
        });
        if (response.data.Data === null) {
          toast.error(response.data.Message);
          return;
        }

        console.log(response.data);

        if (response.data.Status) {
          const token = response.data.Data.token;
          login(token); // Store token in context and localStorage

          // Decode the token to get the role
          const decodedToken = jwtDecode(token);
          const role = decodedToken.role;

          // Redirect based on role
          switch (role) {
            case "admin":
              navigate("/admin");
              break;
            case "nurse":
              navigate("/nurse");
              break;
            case "parent":
              navigate("/parent");
              break;
            default:
              toast.error("You are not allowed to enter the system");
              break;
          }

          toast.success(response.data.Message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Login failed. Please check your credentials.");
      } finally {
        setSubmitting(false);
      }
    },
  });

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
          <h1 className="text-3xl font-semibold  mb-8 text-gray-800">Login</h1>

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
                      Select Role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="nurse">Nurse</option>
                    <option value="parent">Parent</option>
                  </select>
                </div>
                {formik.touched.profileType && formik.errors.profileType && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.profileType}
                  </div>
                )}
              </div>

              {/* User Name */}
              <div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Your username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full py-2 px-0 bg-transparent placeholder:text-gray-400 border-0 border-b focus:outline-none focus:ring-0 ${
                    formik.touched.username && formik.errors.username
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.username}
                  </div>
                )}
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300 mt-6"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Trying to Login..." : "Log In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

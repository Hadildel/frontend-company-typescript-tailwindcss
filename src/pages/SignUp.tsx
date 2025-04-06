import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Joi from "joi";

// Joi validation schema
const validateRegister = (obj: any) => {
  const passwordErrorMessage =
    "Password must be 8-20 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";

  const schema = Joi.object({
    fullname: Joi.string().min(6).max(50).required().messages({
      "string.min": "Fullname must be at least 6 characters",
      "string.max": "Fullname cannot exceed 50 characters",
      "any.required": "Fullname is required",
    }),
    steg_email: Joi.string()
      .required()
      .email()
      // .pattern(/@steg\.com\.tn$/) // Uncomment this line to require steg.com.tn email

      .messages({
        "string.email": "Invalid email format",
        // "string.pattern.base": "You must enter your STEG email (e.g., xxx@steg.com.tn)",
        "any.required": "steg_email must not be empty",
      }),
    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(/[a-z]/)
      .pattern(/[A-Z]/)
      .pattern(/[0-9]/)
      .pattern(/[^a-zA-Z0-9]/)
      .required()
      .messages({
        "string.min": passwordErrorMessage,
        "string.max": passwordErrorMessage,
        "string.pattern.base": passwordErrorMessage,
        "any.required": "Password must not be empty",
      }),
    unit: Joi.string().valid("central", "groupement").required().messages({
      "any.required": "You must specify a unit (central or groupement)",
      "any.only": "The unit must be either central or groupement",
    }),
    unitid: Joi.number().required().messages({
      "any.required": "The unit selection is required",
      "number.base": "Please select a valid option",
    }),
  });

  return schema.validate(obj);
};

interface FormData {
  fullname: string;
  steg_email: string;
  password: string;
  unit: string;
  unitid: number | null;
}

// Dummy data for selections
const UNIT_OPTIONS = [
  { id: 1, name: "central", label: "Centrale" },
  { id: 2, name: "groupement", label: "Groupement" },
];

const CENTRALE_OPTIONS = [
  { id: 101, name: "Centrale A" },
  { id: 102, name: "Centrale B" },
  { id: 103, name: "Centrale C" },
];

const GROUPEMENT_OPTIONS = [
  { id: 201, name: "Groupement de production Rades" },
  { id: 202, name: "Groupement de production Nord" },
  { id: 203, name: "Groupement de production Sud" },
  { id: 204, name: "Groupement de production Sousse" },
  { id: 205, name: "Énergie renouvelable" },
];

const SignUp: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "info">("info");
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    steg_email: "",
    password: "",
    unit: "",
    unitid: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    // Special handling for unit selection
    if (name === "unit") {
      setFormData((prev) => ({
        ...prev,
        unit: value,
        unitid: null, // Reset unitid when unit changes
      }));
      return;
    }

    // Special handling for unitid which needs to be a number
    if (name === "unitid") {
      setFormData((prev) => ({
        ...prev,
        unitid: value ? parseInt(value) : null,
      }));
      return;
    }

    // Handle other fields normally
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    try {
      const { error: validationError } = validateRegister(formData);

      if (validationError) {
        const errorObj: { [key: string]: string } = {};
        validationError.details.forEach((detail) => {
          errorObj[detail.path[0]] = detail.message;
        });
        setError(errorObj);
        return false;
      }

      setError({});
      return true;
    } catch (err) {
      console.error("Validation error:", err);
      setMessage("Form validation failed");
      setMessageType("error");
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Configure axios with proper timeout and headers
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 seconds timeout
        }
      );

      localStorage.setItem("token", res.data.token);
      setFormSubmitted(true);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);

      // Better error handling
      if (err.response) {
        // The server responded with a status code outside of 2xx range
        console.error("Server error response:", err.response.data);
        setMessage(
          err.response.data.message || "Server error. Please try again."
        );
      } else if (err.request) {
        // The request was made but no response was received
        console.error("No response received:", err.request);
        setMessage("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request
        console.error("Request setup error:", err.message);
        setMessage("Error sending request. Please try again.");
      }

      setMessageType("error");
    }
  };

  // Get options for current unit
  const getUnitOptions = () => {
    if (formData.unit === "central") {
      return CENTRALE_OPTIONS;
    } else if (formData.unit === "groupement") {
      return GROUPEMENT_OPTIONS;
    }
    return [];
  };

  // Success confirmation component
  const SuccessConfirmation = () => (
    <div className="text-center py-12">
      <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8">
        <svg
          className="h-16 w-16 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Registration Complete!
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        We've sent you an email with verification instructions.
      </p>
      <p className="text-gray-500">
        Please check your inbox at{" "}
        <span className="font-medium">{formData.steg_email}</span>
      </p>
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/dhaw.jpg')" }}
    >
      <div className="w-full max-w-xl bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          {formSubmitted ? (
            <SuccessConfirmation />
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600">
                  Créer un compte pour vous connecter
                </p>
              </div>

              {message && (
                <div
                  className={`mb-4 p-3 rounded-md ${
                    messageType === "error"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      error.fullname ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>

                <div className="flex flex-col">
                  <input
                    type="email"
                    name="steg_email"
                    value={formData.steg_email}
                    onChange={handleChange}
                    placeholder="STEG Email"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      error.steg_email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>

                <div className="flex flex-col">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                      error.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Unit Type
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      error.unit ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select unit type</option>
                    {UNIT_OPTIONS.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.unit && (
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      {formData.unit === "central" ? "Centrale" : "Groupement"}
                    </label>
                    <select
                      name="unitid"
                      value={formData.unitid?.toString() || ""}
                      onChange={handleChange}
                      className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        error.unitid ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">
                        Select{" "}
                        {formData.unit === "central"
                          ? "centrale"
                          : "groupement"}
                      </option>
                      {getUnitOptions().map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`block w-full mt-4 px-4 py-3 text-center text-base font-medium rounded-md text-white ${
                    isLoading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } transition-colors duration-300 hover:shadow-sm`}
                >
                  {isLoading ? "Processing..." : "S'inscrire"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;

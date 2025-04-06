import React, { FormEvent, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css"; // Import the CSS

interface FormData {
  matricule: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("SingIn");
  const [formData, setFormData] = useState<FormData>({
    matricule: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };
  const handleClick = (page: string) => {
    setActive(page);
    setIsOpen(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: "url('/public/images/dhaw.jpg')",
        // Replace with the actual path to your image
      }}
    >
      <div className="w-max max-w-xl bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <h4 className="text-gray-600">
              Connectez-vous via votre Matricule et votre mot de passe
            </h4>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="matricule"
                value={formData.matricule}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Matricule"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Mot de passe"
              />
            </div>

            {/* Mot de passe oublié aligned to the right */}
            <div className="text-right">
              <Link to="#" className="text-[#5c5c5c] hover:underline">
                Mot de passe oublié?
              </Link>
            </div>

            {/* Log in button */}
            <Link
              to="/defectivee-equipement"
              onClick={() => handleClick("LogIn")}
              className="block w-full mt-2 px-4 py-3 text-center text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 hover:shadow-sm"
            >
              Sign Up
            </Link>

            {/* Créer un compte aligned to the right below the button */}
            <div className="text-right">
              <Link to="#" className="text-[#5c5c5c] hover:underline">
                Créer un compte
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

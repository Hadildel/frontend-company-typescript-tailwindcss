import React from "react";
import { Link } from "react-router-dom";

const StegLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="bg-blue-800 text-white py-20 text-center h-100 place-items-center">
        <h1 className="text-4xl font-bold">Bienvenue à la STEG</h1>
        <p className="mt-2 text-lg">L'énergie au service du développement</p>
        <Link to="/signup">
          <button className="mt-4 bg-yellow-500 px-6 py-3 rounded-md text-lg font-semibold hover:bg-yellow-400 transition">
            S'inscrire
          </button>
        </Link>
      </header>

      {/* About Section */}
      <section className="max-w-5xl mx-auto p-8 text-center">
        <h2 className="text-3xl font-semibold text-blue-800">
          À propos de STEG
        </h2>
        <p className="mt-4 text-gray-700">
          La Société Tunisienne de l'Électricité et du Gaz (STEG) est un acteur
          clé dans la production, le transport et la distribution d'électricité
          et de gaz en Tunisie.
        </p>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-blue-800">Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Électricité</h3>
              <p className="mt-2 text-gray-600">
                Fourniture et gestion de l’électricité en Tunisie.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Gaz Naturel</h3>
              <p className="mt-2 text-gray-600">
                Distribution et entretien des infrastructures de gaz.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Énergies Renouvelables</h3>
              <p className="mt-2 text-gray-600">
                Soutien aux projets d'énergie solaire et éolienne.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-900 text-white py-12 text-center">
        <h2 className="text-2xl font-semibold">Nous Contacter</h2>
        <p className="mt-2">
          Téléphone: +216 22 222 222 | Email: contact@steg.com.tn
        </p>
      </section>
    </div>
  );
};

export default StegLanding;

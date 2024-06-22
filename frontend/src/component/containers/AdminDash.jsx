import React, { useState, useEffect } from 'react';

const LawyerList = () => {
  const [lawyers, setLawyers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const getLawyers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/Lawyers/");

        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération des avocats: ${response.statusText}`);
        }

        const data = await response.json();
        setLawyers(data);
        setErrorMessage(""); // Réinitialiser le message d'erreur en cas de succès
      } catch (error) {
        console.error("Erreur lors de la récupération des avocats :", error.message);
        setErrorMessage("Erreur lors de la récupération des avocats");
      }
    };

    getLawyers();
  }, []); 

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/delete-lawyer/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la suppression de l'avocat: ${response.statusText}`);
      }

      const updatedLawyers = lawyers.filter((lawyer) => lawyer.id !== id);
      setLawyers(updatedLawyers);
      setSuccessMessage("Avocat supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'avocat :", error.message);
      setErrorMessage("Erreur lors de la suppression de l'avocat");
    }
  };

  return (
    <div className='Admin'>
      <h1>Admin Dashboard</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {lawyers.map((lawyer) => (
        <div key={lawyer.id} className="lawyer-card">
          <div>
            <strong>Name:</strong> {lawyer.firstName}
          </div>
          <div>
            <strong>Prenom:</strong> {lawyer.secondName}
          </div>
          <div>
            <strong>Email:</strong> {lawyer.email}
          </div>
          <button onClick={() => handleDelete(lawyer.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default LawyerList;

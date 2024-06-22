import "./filter.css";
import React from "react";

const FilterComponent = ({ onSearch, onFilterChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(); // Appel de la fonction de recherche lorsque le formulaire est soumis
  };

  const handleInputChange = (e, filterType) => {
    const value = e.target.value;
    onFilterChange(filterType, value); // Mettre à jour le filtre approprié dans le composant Avocat
  };

  return (
    <form onSubmit={handleSubmit} className="filter">
      <input
        type="text"
        placeholder="Spécialité"
        onChange={(e) => handleInputChange(e, "specialite")}
      />
      <input
        type="text"
        placeholder="Adresse"
        onChange={(e) => handleInputChange(e, "adresse")}
      />
      <input
        type="text"
        placeholder="Langue"
        onChange={(e) => handleInputChange(e, "langues")}
      />

      <button type="submit">Rechercher</button>
    </form>
  );
};

export default FilterComponent;

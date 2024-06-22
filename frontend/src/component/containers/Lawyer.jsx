// Lawyer.js
import Navbar from "../NavBar";
import Footer from "../Footer";
import React, { useState, useEffect } from 'react';
import FilterComponent from '../FilterComponent';
import LawyerListComponent from '../LawyerListComponent';
import PaginationComponent from '../PaginationComponent';

const Lawyer = () => {

    const [lawyers, setLawyers] = useState([]);
    const [filters, setFilters] = useState({});

    const [errorMessage, setErrorMessage] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedLawyerId, setSelectedLawyerId] = useState(null);

    useEffect(() => {
        // Ici, vous pouvez appeler une API pour récupérer la liste des avocats en fonction des filtres et de la pagination
    }, [filters, currentPage]);

     const handleFilterChange = (filterType, value) => {
        // Mettre à jour les filtres en fonction du type (specialite, adresse, langues)
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    const handleSearch = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/search-lawyers/?specialite=${filters.specialite || ''}&adresse=${filters.adresse || ''}&langues=${filters.langues || ''}`
          );
          const data = await response.json();
    
          if (response.status === 404) {
            setErrorMessage("Aucun avocat trouvé avec ces critères de recherche.");
            setLawyers([]); // Réinitialiser la liste des avocats
          } else {
            setLawyers(data);
            setErrorMessage("");
          }
        } catch (error) {
          console.error('Error fetching lawyers:', error);
          setErrorMessage("Une erreur s'est produite lors de la recherche des avocats."); // Définir un message d'erreur en cas de problème de requête
        }
      };
      
    

    return (
        <div>
            <Navbar />
            <h1>Recherche d'Avocats</h1>

             {!selectedLawyerId && <FilterComponent onSearch={handleSearch} onFilterChange={handleFilterChange} />}

             {errorMessage && <p>{errorMessage}</p>}

             {!selectedLawyerId && (
             <LawyerListComponent lawyersData={lawyers} />
             )}
             
            {!selectedLawyerId && <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
            <Footer/>
        </div>
    );
}

export default Lawyer;

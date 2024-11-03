import React from 'react';
import styles from './SearchAndFilter.module.css';

interface SearchAndFilterProps {
    selectedSearch: string;
    setSelectedSearch: React.Dispatch<React.SetStateAction<string>>;
    selectedLetter: string; // Add this line
    setSelectedLetter: React.Dispatch<React.SetStateAction<string>>;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
    selectedSearch,
    setSelectedSearch,
    selectedLetter, // Include this line
    setSelectedLetter,
}) => {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSearch(event.target.value);
    };

    const handleLetterClick = (letter: string) => {
        setSelectedLetter(letter);
        setSelectedSearch(""); // Clear search when a letter is selected
    };

    const handleClearLetter = () => {
        setSelectedLetter(""); // Clear selected letter
    };

    return (
        <div>
            {/* Search Bar Container */}
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={selectedSearch}
                    onChange={handleSearchChange}
                    placeholder="Search medications..."
                    className={styles.searchBar}
                />
            </div>

            {/* Clear Letter Button */}
            {selectedLetter && (
                <button onClick={handleClearLetter} className={styles.clearButton}>
                    Clear Letter
                </button>
            )}

            {/* A-Z Filter */}
            <div className={styles.letterFilter}>
                {Array.from(Array(26)).map((_, index) => {
                    const letter = String.fromCharCode(65 + index); // Generate A-Z
                    return (
                        <button 
                            key={letter}
                            onClick={() => handleLetterClick(letter)}
                            className={styles.letterButton}
                        >
                            {letter}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchAndFilter;

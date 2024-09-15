// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Category from './components/Category';
import SearchBar from './components/SearchBar';
import RandomButton from './components/RandomButton';
import HomeButton from './components/HomeButton';
import Footer from './components/Footer'; // Import Footer component
import websiteData from './data/websiteData';
import funLinks from './data/funLinks';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [randomSites, setRandomSites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [isRandomMode, setIsRandomMode] = useState(false); // Track if showing random links

  const categoriesPerPage = 2; // Number of categories to display per page
  const randomLinksPerPage = 4; // Number of random links to display per page

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset to page 1 when searching
    setIsRandomMode(false); // Switch back to categories mode on search
  };

  const generateRandomLinks = () => {
    const shuffled = [...funLinks].sort(() => 0.5 - Math.random());
    const selectedLinks = shuffled.slice(0, randomLinksPerPage * 2); // Prepare more than 4 links for pagination
    setRandomSites(selectedLinks);
    setIsRandomMode(true); // Switch to random links mode
    setCurrentPage(1); // Reset page to 1 for random links
  };

  const returnToCategories = () => {
    setIsRandomMode(false); // Switch back to categories mode
    setCurrentPage(1); // Reset to page 1 when returning to categories
  };

  // Filter categories based on the search term
  const filteredData = websiteData.reduce((acc, data) => {
    const categoryMatch = data.category.toLowerCase().includes(searchTerm);
    const descriptionMatch = data.sites.some(site => site.description.toLowerCase().includes(searchTerm));
    
    if (categoryMatch) {
      // Add category to the list if it matches the search term
      acc.push(data);
    } else if (descriptionMatch) {
      // Add category if any site description matches the search term
      acc.push(data);
    }
    return acc;
  }, []);
  
  // Prioritize categories by name match first, then by description match
  filteredData.sort((a, b) => {
    const aCategoryMatch = a.category.toLowerCase().includes(searchTerm);
    const bCategoryMatch = b.category.toLowerCase().includes(searchTerm);
    return bCategoryMatch - aCategoryMatch;
  });

  // Pagination logic: slice the data to only show the current page's categories
  const startIndex = (currentPage - 1) * categoriesPerPage;
  const displayedCategories = filteredData.slice(startIndex, startIndex + categoriesPerPage);

  // Random links pagination logic
  const randomStartIndex = (currentPage - 1) * randomLinksPerPage;
  const displayedRandomLinks = randomSites.slice(randomStartIndex, randomStartIndex + randomLinksPerPage);

  // Calculate total number of pages for categories and random links
  const totalCategoryPages = Math.ceil(filteredData.length / categoriesPerPage);
  const totalRandomPages = Math.ceil(randomSites.length / randomLinksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <div className='navBar'>
      <Header />
        <div className='search'>
        <SearchBar onSearchChange={handleSearchChange} />
        </div>
        <div className='randAndHome'>
        <RandomButton onGenerateRandomLinks={generateRandomLinks} />
        <HomeButton onReturnHome={returnToCategories} /> {/* Pass function to return home */}
        </div>
      </div>


      {/* Display Random Sites */}
      {isRandomMode && (
        <div className="random-sites">
          <h2>Random Fun Links</h2>
          {displayedRandomLinks.map((site) => (
           <Category key={site.name} sites={[site]} />
          ))}

          {/* Random Links Pagination */}
          {totalRandomPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalRandomPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Display Filtered Categories with Pagination (Only if not in Random Mode) */}
      {!isRandomMode && displayedCategories.length > 0 ? (
        <>
          {displayedCategories.map((data) => (
            <Category key={data.category} category={data.category} sites={data.sites} />
          ))}

          {/* Page Selection Buttons for Categories */}
          <div className="pagination">
            {Array.from({ length: totalCategoryPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        !isRandomMode && <p>No categories found.</p>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

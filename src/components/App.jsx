import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import axios from 'axios';
import Modal from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const apiKey = '34699239-301f57fe1e87e868102635a18&';

  const fetchMoreImages = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = data => {
    const searchValue = data.searchValue;
    setImages([]);
    setIsLoading(true);
    setSearchInput(searchValue);
    setPage(1);
  };

  const handleLoadMore = event => {
    event.preventDefault();
    fetchMoreImages();
  };

  const handleOpenModal = id => {
    setIsModalOpen(true);
    setSelectedImageId(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImageId(null);
  };

  useEffect(() => {
    const fetchImages = async (data, pageNumber) => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${apiKey}q=${data}&image_type=photo&orientation=horizontal&per_page=12&page=${pageNumber}`
        );
        const newImages = response.data.hits;
        const hits = response.data.totalHits;
        setImages(prevImages => [...prevImages, ...newImages]);
        setIsLoading(false);
        setTotalHits(hits);
      } catch (error) {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      fetchImages(searchInput, page);
    }
  }, [isLoading, page, searchInput, apiKey]);

  return (
    <div>
      <SearchBar searchValue={handleSearch} />
      {isLoading && <Loader />}

      <ImageGallery
        totalHits={totalHits}
        images={images}
        handleLoadMore={handleLoadMore}
        onOpen={handleOpenModal}
      />

      {isModalOpen && (
        <Modal onClose={handleCloseModal} selectedImageId={selectedImageId} />
      )}
    </div>
  );
};

export default App;

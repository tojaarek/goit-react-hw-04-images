import React, { useEffect, useState } from 'react';
import axios from 'axios';
import modal from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ selectedImageId, onClose }) => {
  const [largeImageURL, setLargeImageUrl] = useState('');
  const [alt, setAlt] = useState('');
  const selectedImageIdRef = React.useRef(selectedImageId);

  useEffect(() => {
    fetchLargeImage();
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      setLargeImageUrl('');
      setAlt('');
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedImageId]);

  useEffect(() => {
    const prevSelectedImageId = selectedImageIdRef.current;
    if (prevSelectedImageId !== selectedImageId) {
      fetchLargeImage();
    }
    selectedImageIdRef.current = selectedImageId;
  });

  const fetchLargeImage = async () => {
    try {
      const apiKey = '34699239-301f57fe1e87e868102635a18&';
      const response = await axios.get(
        `https://pixabay.com/api/?key=${apiKey}id=${selectedImageId}`
      );
      const largeImageURL = response.data.hits[0].largeImageURL;
      const alt = response.data.hits[0].tags;
      const hits = response.data.totalHits;
      if (hits === 0) {
        alert(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        setLargeImageUrl(largeImageURL);
        setAlt(alt);
      }
    } catch (error) {
      alert('Opss, something went wrong. Please try again.');
    }
  };

  const handleKeyPress = event => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className={modal.overlay} onClick={onClose}>
      <div>
        <img className={modal.modal} src={largeImageURL} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  selectedImageId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

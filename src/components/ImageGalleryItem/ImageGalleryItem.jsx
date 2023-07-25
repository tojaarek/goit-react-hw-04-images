import image from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ imageUrl, alt, onOpen, id }) => (
  <li>
    <img
      className={image.item}
      src={imageUrl}
      alt={alt}
      onClick={() => onOpen(id)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onOpen: PropTypes.func.isRequired,
  id: PropTypes.number,
};

export default ImageGalleryItem;

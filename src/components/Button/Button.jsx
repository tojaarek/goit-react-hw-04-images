import PropTypes from 'prop-types';
import button from './Button.module.css';

const Button = ({ loadMore }) => (
  <button className={button.more} type="button" onClick={loadMore}>
    Load more
  </button>
);

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;

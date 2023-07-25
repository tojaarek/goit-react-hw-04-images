import { TailSpin } from 'react-loader-spinner';
import loader from './Loader.module.css';

const Loader = () => (
  <div>
    <TailSpin
      height="100"
      width="100"
      color="#d572fb"
      wrapperClass={loader.loader}
    />
  </div>
);

export default Loader;

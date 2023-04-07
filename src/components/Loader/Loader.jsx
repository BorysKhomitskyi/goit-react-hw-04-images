import { MdOutlineCached } from 'react-icons/md';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.wrapper}>
      <MdOutlineCached className={css.loader} />
    </div>
  );
}

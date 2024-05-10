import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
function SkeletonElement({ className }) {
  return (
    <div className={className}>
      <Skeleton
        className='h-full w-full rounded-md hover:scale-105 duration-500 ease-out'
        duration={2}
      />
    </div>
  );
}

export default SkeletonElement;

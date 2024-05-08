import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
function SkeletonElement({ className }) {
  return (
    <div className={className}>
      <div className='h-full w-full m-auto flex flex-col cursor-pointer'>
        <SkeletonTheme baseColor='#333' highlightColor='#444'>
          <div className='h-[100%] w-full overflow-hidden rounded-md'>
            <Skeleton
              className='h-full w-full rounded-md hover:scale-105 duration-500 ease-out'
              duration={2}
            />
          </div>
        </SkeletonTheme>
      </div>
    </div>
  );
}

export default SkeletonElement;

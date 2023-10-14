import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function SkeletonDetail() {
  return (
    <>
      <div className='h-[389px] w-full m-auto flex flex-col cursor-pointer'>
        <SkeletonTheme baseColor='#333' highlightColor='#444'>
          <div className='h-[100%] w-full overflow-hidden rounded-md'>
            <Skeleton
              className='h-full w-full rounded-md hover:scale-105 duration-500 ease-out'
              duration={2}
            />
          </div>
        </SkeletonTheme>
      </div>
    </>
  );
}

export default SkeletonDetail;

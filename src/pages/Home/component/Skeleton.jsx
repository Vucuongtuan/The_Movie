import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function SkeletonLoading() {
    return ( 
        <>
       { Array.from({ length: 10 }).map((_, index) => (
    <div className="h-[389px] w-full m-auto flex flex-col cursor-pointer" key={index}>
      <SkeletonTheme baseColor="#333" highlightColor="#444">
        <div className="h-[80%] w-full overflow-hidden rounded-md">
  <Skeleton className="h-full w-full rounded-md hover:scale-105 duration-500 ease-out" duration={2} /> 
  </div>
      <Skeleton className='text-xl h-[20%] flex items-center mt-4'count={1} duration={2}  />
      </SkeletonTheme>
    </div>
    ))}
        </>
     );
}

export default SkeletonLoading;
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LoadingUsers() {
  return Array.from({ length: 6 }, (_, index) => (
    <div key={index} className="col-4 text-center p-5">
      <Skeleton className="mb-4" circle height={100} width={100} />
      <Skeleton className="mb-2" height={30} count={2} />
    </div>
  ));
}

export default LoadingUsers;
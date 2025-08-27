/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const JobCard = () => {
  // all job posts load with Tanstack Query
  const { data: posts = [] } = useQuery({
    queryKey: ["job-post"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts`
      );
      return data;
    },
  });

  console.log(posts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.length > 0 ? (
        posts.map(
          ({
            _id,
            title,
            deadline,
            category,
            description,
            minPrice,
            maxPrice,
            buyer: { name: buyerName } = {},
            totalBids = 0,
          }) => (
            <Link
              to={`/job/${_id}`}
              key={_id}
              className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.1] transition-all"
            >
              {/* Header: Deadline + Category */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-light text-gray-800">
                  Deadline:{" "}
                  {deadline
                    ? new Date(deadline).toLocaleDateString()
                    : "No deadline"}
                </span>
                <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full">
                  {category}
                </span>
              </div>

              {/* Job Info */}
              <div>
                <h1 className="mt-2 text-lg font-semibold text-gray-800">
                  {title}
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                  {description || "No description available."}
                </p>

                <p className="mt-2 text-sm font-bold text-gray-600">
                  Range: ${minPrice} - ${maxPrice}
                </p>

                <p className="mt-2 text-sm font-bold text-gray-600">
                  Total Bids: {totalBids}
                </p>

                <p className="mt-2 text-sm text-gray-500">Buyer: {buyerName}</p>
              </div>
            </Link>
          )
        )
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};

export default JobCard;

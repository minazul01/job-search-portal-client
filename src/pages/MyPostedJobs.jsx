import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { MdDelete, MdEdit } from "react-icons/md";
import moment from "moment";
import Swal from "sweetalert2";

const MyPostedJobs = () => {
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchAllJob();
  }, []);

  const fetchAllJob = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/posts/${user?.email}`
    );
    setPosts(data);
  };
  console.log(posts);

  // job post delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/posts/${id}`
        );
        if (data.deletedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your job post has been deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchAllJob();
        } else {
          Swal.fire({
            icon: "error",
            title: "Nothing was deleted!",
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Failed to delete job",
        });
        console.log(err);
      }
    }
  };

  return (
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">My Posted Jobs</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {posts?.length} Job
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Title</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Deadline</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Price Range</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Description
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {posts?.map((post) => (
                    <tr key={post?._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {post?.title}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {moment(post?.deadline).format("L")}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        ${post?.minPrice}-${post?.maxPrice}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <p
                            className={`px-3 py-1 ${post?.category === 'Web Development' && 'text-blue-500 bg-blue-100/60'}
                            ${post?.category === 'Digital Marketing' && 'text-green-500 bg-green-100/60'}
                            ${post?.category === 'Graphics Designer' && 'text-yellow-500 bg-yellow-100/60'}
                            text-xs  rounded-full`}
                          >
                            {post?.category}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {post?.description.slice(0, 50)}...
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            onClick={() => handleDelete(post?._id)}
                            className="text-gray-500 text-2xl transition-colors duration-200   hover:text-red-500 focus:outline-none"
                          >
                            <MdDelete />
                          </button>

                          <Link
                            to={`/update/${post?._id}`}
                            className="text-gray-500 text-2xl transition-colors duration-200   hover:text-yellow-500 focus:outline-none"
                          >
                            <MdEdit />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPostedJobs;

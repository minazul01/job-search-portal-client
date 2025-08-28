import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UpdateJob = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());

  const { user } = useContext(AuthContext);

  const { id } = useParams();
  console.log(id);
  const [post, setPost] = useState({});

  // const [title, category, minPrice, maxPrice, deadline, description] = Array.isArray(post) ? post : [];

  useEffect(() => {
    fetchAllJob();
  }, [id]);

  const fetchAllJob = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/post/${id}`
    );
    setPost(data);
    setStartDate(new Date(data.deadline));
  };
  console.log(post);

  // update func
  const handleAddJob = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.job_title.value;
   
    const deadline = startDate;
    const category = form.category.value;
    const minPrice = form.min_price.value;
    const maxPrice = form.max_price.value;
    const description = form.description.value;
    const addJobData = {
      title,
  
      deadline,
      category,
      minPrice,
      maxPrice,
      description,
      bit_count: post?.bit_count,
    };

    try {
      // update the job post
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/post/${id}`,
        addJobData
      );
      console.log(data);
      if (data.matchedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your post job has been post",
          showConfirmButton: false,
          timer: 1500,
        });
        e.target.reset();
        form.reset();
        navigate("/my-posted-jobs");
      }
    } catch (err) {
      console.log(err);
      toast.error(`${err.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Update a Job
        </h2>

        <form onSubmit={handleAddJob}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="job_title">
                Job Title
              </label>
              <input
                id="job_title"
                name="job_title"
                defaultValue={post?.title}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                defaultValue={user?.email}
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            {post?.category && (
              <div className="flex flex-col gap-2 ">
                <label className="text-gray-700 " htmlFor="category">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  defaultValue={post?.category}
                  className="border p-2 rounded-md"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Graphics Design">Graphics Design</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                </select>
              </div>
            )}
            <div>
              <label className="text-gray-700 " htmlFor="min_price">
                Minimum Price
              </label>
              <input
                id="min_price"
                name="min_price"
                defaultValue={post?.minPrice}
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="max_price">
                Maximum Price
              </label>
              <input
                id="max_price"
                name="max_price"
                defaultValue={post?.maxPrice}
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Description
            </label>
            <textarea
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              name="description"
              id="description"
              defaultValue={post?.description}
              cols="30"
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateJob;

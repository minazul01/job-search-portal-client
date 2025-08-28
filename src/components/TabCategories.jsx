/* eslint-disable react/prop-types */
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const TabCategories = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchAllJob();
  }, []);

  const fetchAllJob = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);
    setPosts(data);
  };
  console.log(posts);
  return (
    <Tabs>
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
          Browse Jobs By Categories
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500">
          Three categories available for the time being. They are Web
          Development, Graphics Design and Digital Marketing. Browse them by
          clicking on the tabs below.
        </p>

        {/* Tabs */}
        <div className="flex items-center justify-center">
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>

        {/* Web Development */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {posts
              .filter((job) => job?.category === "Web Development")
              .map((job) => (
                <JobCard key={job?._id} data={job} />
              ))}
          </div>
        </TabPanel>

        {/* Graphics Design */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {posts
              .filter((job) => job?.category === "Graphics Design")
              .map((job) => (
                <JobCard key={job?._id} data={job} />
              ))}
          </div>
        </TabPanel>

        {/* Digital Marketing */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {posts
              .filter((job) => job?.category === "Digital Marketing")
              .map((job) => (
                <JobCard key={job?._id} data={job} />
              ))}
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;

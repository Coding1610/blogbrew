import React from "react";
import BlogCard from "@/components/BlogCard";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFtech";
import Loading from "@/components/Loading";

export default function Index() {
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/show-all`, {
    method: "get",
    credentials: "include",
  });

  if (loading) return <Loading />;

  return (
    <>
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full pl-5 pr-5 sm:pl-20 sm:pr-20 font-roboto flex flex-col  justify-center items-center gap-5 mt-5 sm:mt-10">
        <h1 className="text-2xl font-bold text-center"> Welcome to <span className="text-darkRed">BlogBrew</span>, Fresh Stories Served Daily! </h1>
        <p className="bg-indigo-200 border-2 border-midRed p-2 text-center rounded-md font-normal"> “Words have power. Stories have magic.” </p>
        <p className="text-gray-600 text-center font-normal text-[17px]">Discover a blend of thoughts, experiences, and perspectives from creators around the world. Whether you're here to read, reflect, or share your own voice, <span className="border-b-2 border-darkRed pb-1 font-bold">BlogBrew is your cozy digital café for all things written.</span> Browse through the latest blogs or start your own journey today!</p>
      </div>
      <div className="w-full pl-5 pr-5 pb-5 sm:pl-20 sm:pr-20 font-roboto flex flex-wrap justify-center items-center gap-7 mt-5 sm:mt-12 mb-6">
        {blogData && blogData.blog.length > 0 ? (
          blogData.blog.map((blog) => <BlogCard key={blog._id} props={blog}/>)
        ) : (
          <>
            <p>No Blogs Are Found</p>
          </>
        )}
      </div>
      </div>
    </>
  );
}

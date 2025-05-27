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
      <div className="w-full pl-5 pr-5 pb-5 sm:pl-20 sm:pr-20 font-roboto flex flex-wrap justify-center items-center gap-5 mt-5 sm:mt-12 mb-6">
        {blogData && blogData.blog.length > 0 ? (
          blogData.blog.map((blog) => <BlogCard props={blog}/>)
        ) : (
          <>
            <p>No Blogs Are Found</p>
          </>
        )}
      </div>
    </>
  );
}

import BlogDetails from "@/components/Blog/BlogDetails";
import { useEffect } from "react";

const BlogDetailsPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return <BlogDetails />;
};

export default BlogDetailsPage;

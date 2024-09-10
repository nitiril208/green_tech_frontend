import BlogList from "@/components/Blog/BlogList";
import { useEffect } from "react";

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return <BlogList />;
};

export default BlogPage;

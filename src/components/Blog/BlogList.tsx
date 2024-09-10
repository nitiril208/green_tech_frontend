import HomeFooter from "../homePage/HomeFooter";
import blog_1 from "@/assets/images/blog_1.jpg";
import blog_2 from "@/assets/images/blog_2.jpg";
import blog_3 from "@/assets/images/blog_3.jpg";
import BlogListItems from "./BlogListItems";
import HomeHeader from "../homePage/HomeHeader";

const BlogList = () => {
  const blogList = [
    {
      image: blog_1,
      date: "January 15 , 2024",
      title: "Ruby on Rose Accessories",
      subTitle: "Chintamanigems",
      description:
        "A ruby is a pink to blood-red colored a gemstone, a variety of the mineral. Other varieties of gem-quality corundum are called sapphires. Ruby is one of the traditional cardinal gems, together with amethyst, sapphire, emerald, and diamond. The word ruby comes from ruber, Latin for red. The color of a ruby is due to the element chromium.Some gemstones that are popularly or historically called rubies, such as the Black Prince's Ruby in the British Imperial State Crown, are actually spinels. These were once known as.",
    },
    {
      image: blog_2,
      date: "January 15 , 2024",
      title: "Ruby on Rose Accessories",
      subTitle: "Chintamanigems",
      description:
        "A ruby is a pink to blood-red colored a gemstone, a variety of the mineral. Other varieties of gem-quality corundum are called sapphires. Ruby is one of the traditional cardinal gems, together with amethyst, sapphire, emerald, and diamond. The word ruby comes from ruber, Latin for red. The color of a ruby is due to the element chromium.Some gemstones that are popularly or historically called rubies, such as the Black Prince's Ruby in the British Imperial State Crown, are actually spinels. These were once known as.",
    },
    {
      image: blog_3,
      date: "January 15 , 2024",
      title: "Ruby on Rose Accessories",
      subTitle: "Chintamanigems",
      description:
        "A ruby is a pink to blood-red colored a gemstone, a variety of the mineral. Other varieties of gem-quality corundum are called sapphires. Ruby is one of the traditional cardinal gems, together with amethyst, sapphire, emerald, and diamond. The word ruby comes from ruber, Latin for red. The color of a ruby is due to the element chromium.Some gemstones that are popularly or historically called rubies, such as the Black Prince's Ruby in the British Imperial State Crown, are actually spinels. These were once known as.",
    },
  ];
  return (
    <>
      <HomeHeader />
      <div className="xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-4 lg:py-20 sm:py-14 py-10">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {blogList.map((data, index) => {
            return <BlogListItems key={index} data={data} />;
          })}
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default BlogList;

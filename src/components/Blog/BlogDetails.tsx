import { ArrowBigRightDash } from "lucide-react";
import HomeFooter from "../homePage/HomeFooter";
import HomeHeader from "../homePage/HomeHeader";
import blog_details from "@/assets/images/blog_details.jpg";

const BlogDetails = () => {
  return (
    <>
      <HomeHeader />
      <div className="xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-4 md:py-14 sm:py-10 py-8">
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col gap-5">
          <div className="">
            <h3 className="font-calibri text-2xl font-black mb-4">
              Ruby on Rose Accessories
            </h3>
            <img src={blog_details} alt="blog img" />
          </div>
          <div className="">
            <p className="text-[#4E5566] text-base mb-4">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate
            </p>
            <p className="text-[#4E5566] text-base mb-4">
              Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
              Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
              eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae,
              eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
              feugiat a, tellus. Phasellus viverra nulla ut metus varius
              laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi
              vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.
              Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus,
              sem quam semper libero, sit amet adipiscing sem neque sed ipsum.
              Nam quam nunc, blandit vel, luctus pulvinar.
            </p>
            <p className="text-[#4E5566] text-base mb-4">
              Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing
              daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft
              jumping zebras vex. Two driven jocks help fax my big quiz. Quick,
              Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave
              ghost pled.
            </p>
            <ul className="flex flex-col gap-3 mb-4">
              <li className="text-lg text-black font-calibri flex gap-1.5">
                <span>
                  <ArrowBigRightDash className="text-[#4E5566] mt-1" />
                </span>
                Separated they live in Bookmarksgrove right at the coast of the
                Semantics, a large language ocean.
              </li>
              <li className="text-lg text-black font-calibri flex gap-1.5">
                <span>
                  <ArrowBigRightDash className="text-[#4E5566] mt-1" />
                </span>
                Even the all-powerful Pointing has no control about the blind
                texts it is an almost unorthographic life One day however a
                small line of blind text by the name of Lorem Ipsum decided to
                leave for the far World of Grammar.
              </li>
              <li className="text-lg text-black font-calibri flex gap-1.5">
                <span>
                  <ArrowBigRightDash className="text-[#4E5566] mt-1" />
                </span>
                The Big Oxmox advised her not to do so, because there were
                thousands of bad Commas, wild Question Marks and devious
                Semikoli, but the Little Blind Text didn’t listen.
              </li>
              <li className="text-lg text-black font-calibri flex gap-1.5">
                <span>
                  <ArrowBigRightDash className="text-[#4E5566] mt-1" />
                </span>
                She packed her seven versalia, put her initial into the belt and
                made herself
              </li>
            </ul>
            <p className="text-[#4E5566] text-base mb-4">
              A wonderful serenity has taken possession of my entire soul, like
              these sweet mornings of spring which I enjoy with my whole heart.
              I am alone, and feel the charm of existence in this spot, which
              was created for the bliss of souls like mine. I am so happy, my
              dear friend, so absorbed in the exquisite sense of mere tranquil
              existence, that I neglect my talents. I should be incapable of
              drawing a single stroke at the present moment; and yet I feel that
              I never was a greater artist than now. When, while the lovely
              valley teems with vapour around me, and the meridian sun strikes
              the upper surface of the impenetrable foliage of my trees, and but
              a few stray gleams steal into the inner sanctuary, I throw myself
              down among the tall grass by the trickling stream; and, as I lie
              close to the earth.
            </p>
            <p className="text-[#4E5566] text-base">
              The quick, brown fox jumps over a lazy dog. DJs flock by when MTV
              ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick
              quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox
              nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox.
              Bright vixens jump; dozy fowl quack.
            </p>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default BlogDetails;

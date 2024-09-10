import { ArrowBigLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import HomeFooter from "./homePage/HomeFooter";
import HomeHeader from "./homePage/HomeHeader";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <HomeHeader />
      <div className="bg-primary sm:py-12 py-10">
        <div className="xl:max-w-[1160px] max-w-full mx-auto xl:px-0 px-5">
          <Button
            variant="ghost"
            type="button"
            onClick={() => navigate(-1)}
            className="p-0 hover:bg-transparent text-white h-auto hover:text-white"
          >
            <ArrowBigLeft /> Back
          </Button>
          <h1 className="text-4xl font-bold text-white font-calibri">
            Privacy & Policy
          </h1>
        </div>
      </div>
      <main className="sm:py-12 py-10 xl:max-w-[1160px] max-w-full mx-auto xl:px-0 px-5">
        <nav className="mb-8">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <li>
              <Link
                to="/"
                className="block rounded-md bg-muted px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground font-inter"
              >
                Data Collection
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block rounded-md bg-muted px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground font-inter"
              >
                Data Usage
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block rounded-md bg-muted px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground font-inter"
              >
                Data Security
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block rounded-md bg-muted px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground font-inter"
              >
                User Rights
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block rounded-md bg-muted px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground font-inter"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
        <section id="data-collection" className="xl:mb-10 mb-8">
          <h2 className="xl:mb-4 mb-3 text-2xl font-bold font-calibri">
            Data Collection
          </h2>
          <p className="text-muted-foreground font-inter xl:text-base text-sm xl:leading-8 leading-6">
            We collect personal information that you provide to us, such as your
            name, email address, and any other information you choose to share.
            We may also collect information about your usage of our website and
            services, including your IP address, browser type, and device
            information.
          </p>
        </section>
        <section id="data-usage" className="xl:mb-10 mb-8">
          <h2 className="xl:mb-4 mb-3 text-2xl font-bold font-calibri">
            Data Usage
          </h2>
          <p className="text-muted-foreground font-inter xl:text-base text-sm xl:leading-8 leading-6">
            We use the information we collect to provide and improve our
            services, communicate with you, and comply with legal obligations.
            We may also use your data for marketing purposes, but we will always
            obtain your consent before doing so.
          </p>
        </section>
        <section id="data-security" className="xl:mb-10 mb-8">
          <h2 className="xl:mb-4 mb-3 text-2xl font-bold font-calibri">
            Data Security
          </h2>
          <p className="text-muted-foreground font-inter xl:text-base text-sm xl:leading-8 leading-6">
            We take the security of your personal information seriously and have
            implemented various measures to protect it, including encryption,
            access controls, and regular security audits. We will notify you in
            the event of a data breach that may compromise your information.
          </p>
        </section>
        <section id="user-rights" className="xl:mb-10 mb-8">
          <h2 className="xl:mb-4 mb-3 text-2xl font-bold font-calibri">
            User Rights
          </h2>
          <p className="text-muted-foreground font-inter xl:text-base text-sm xl:leading-8 leading-6">
            You have the right to access, correct, or delete your personal
            information, as well as the right to opt-out of certain data
            processing activities. You can exercise these rights by contacting
            us using the information provided in the "Contact\n Us" section.
          </p>
        </section>
        <section id="contact-us">
          <h2 className="xl:mb-4 mb-3 text-2xl font-bold font-calibri">
            Contact Us
          </h2>
          <p className="text-muted-foreground font-inter mb-5 xl:text-base text-sm xl:leading-8 leading-6">
            If you have any questions or concerns about our privacy policy or
            the way we handle your personal information, please don't hesitate
            to contact us at privacy@example.com or by mail at:
          </p>
          <address className="mb-4 text-sm text-muted-foreground font-inter">
            Example Company
            <br />
            123 Main Street
            <br />
            Anytown, USA 12345
          </address>
          <p className="text-muted-foreground font-inter">
            We will respond to your inquiry as soon as possible.
          </p>
        </section>
      </main>
      {/* <footer className="bg-muted xl:py-6 py-4  text-center text-muted-foreground font-inter text-sm">
        <p>&copy; 2024 Example Company. All rights reserved.</p>
      </footer> */}
      <section>
        <HomeFooter />
      </section>
    </div>
  );
};

export default PrivacyPolicy;

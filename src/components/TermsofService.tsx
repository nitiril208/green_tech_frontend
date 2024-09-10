import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import HomeFooter from "./homePage/HomeFooter";
import HomeHeader from "./homePage/HomeHeader";

const TermsofService = () => {
  const navigate = useNavigate();
  return (
    <div>
      <HomeHeader />
      <div className="bg-primary text-primary-foreground sm:py-12 py-10 px-4 md:px-6">
        <div className="xl:max-w-[1160px] max-w-full mx-auto">
          <Button
            variant="ghost"
            type="button"
            onClick={() => navigate(-1)}
            className="p-0 hover:bg-transparent h-auto hover:text-white"
          >
            <ArrowBigLeft /> Back
          </Button>
          <h1 className="text-4xl font-bold font-calibri">Terms of Service</h1>
        </div>
      </div>
      <main className="flex-1 sm:py-12 py-10 2xl:py-24 xl:py-20 ">
        <div className="xl:max-w-[1160px] max-w-full mx-auto xl:px-0 px-5">
          <section className="mb-12">
            <h2 className="text-[26px] font-bold mb-4 font-calibri">
              Introduction
            </h2>
            <p className="text-muted-foreground font-inter">
              Welcome to our website and services. By accessing or using our
              website, mobile application, or any of our services, you agree to
              be bound by these terms of service and our privacy policy. Please
              read these terms carefully before using our services.
            </p>
          </section>
          <section>
            <h2 className="text-[26px] font-bold mb-4 font-calibri">
              Terms of Service
            </h2>
            <ul className="space-y-4">
              <li>
                <h3 className="text-base font-medium font-inter mb-2">
                  Intellectual Property
                </h3>
                <p className="text-muted-foreground font-inter text-sm">
                  All content and intellectual property on our website,
                  including but not limited to text, graphics, logos, images,
                  and software, are owned by us or our licensors and are
                  protected by copyright, trademark, and other intellectual
                  property laws.
                </p>
              </li>
              <li>
                <h3 className="text-base font-medium font-inter mb-2">
                  User Conduct
                </h3>
                <p className="text-muted-foreground font-inter text-sm">
                  You agree to use our services in a lawful and ethical manner,
                  and not to engage in any activity that may harm or interfere
                  with the operation of our website or services.
                </p>
              </li>
              <li>
                <h3 className="text-base font-medium font-inter mb-2">
                  Limitation of Liability
                </h3>
                <p className="text-muted-foreground font-inter text-sm">
                  We will not be liable for any indirect, special, incidental,
                  or consequential damages arising out of or in connection with
                  your use of our services.
                </p>
              </li>
              <li>
                <h3 className="text-base font-medium font-inter mb-2">
                  Termination
                </h3>
                <p className="text-muted-foreground font-inter text-sm">
                  We reserve the right to terminate or suspend your access to
                  our services at any time, for any reason, without notice.
                </p>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <section>
        <HomeFooter />
      </section>
    </div>
  );
};

export default TermsofService;

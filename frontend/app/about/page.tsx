import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-tr from-[#012326] to-[#013e4a] font-sans dark:bg-black">
      <Header />
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 text-center">
            About Us
          </h1>
          <p className="text-sm sm:text-base text-white text-center mb-6 sm:mb-12 px-2">
            Doneyt is a platform that allows you to donate to causes you care
            about.
          </p>
          <h4 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 text-center font-sans italic px-2">
            &quot;Connecting hearts, transforming lives.&quot;
          </h4>
        </div>
        <section className="mb-16 sm:mb-24 md:mb-32 px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 md:gap-16 lg:gap-24 max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 h-full flex flex-col">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4 text-center">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed flex-1 text-center">
                DONEYT is a platform dedicated to connecting generous donors
                with meaningful causes. We believe in the power of community and
                the impact of collective action in creating positive change.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 h-full flex flex-col">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4 text-center">
                Our Vision
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed flex-1 text-center">
                To become the leading platform for charitable giving in the
                Philippines, making it easy and transparent for everyone to
                support causes they care about.
              </p>
            </div>
          </div>
        </section>
        {/* Values */}
        <section className="mb-16 sm:mb-24 md:mb-32 lg:mb-48 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-56">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-8 sm:mb-12 md:mb-16 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-7xl mx-auto">
            {/* Community */}
            <div className="flex flex-col items-center justify-center">
              <div className="bg-[#1C7D91] rounded-full shadow-md flex flex-col items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 shrink-0">
                <Image
                  src="/images/community.png"
                  alt="Community"
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mb-2 text-center px-2">
                Community
              </h3>
              <p className="text-gray-50 text-center text-xs sm:text-sm md:text-base px-20 sm:px-6 md:px-8">
                We ensure all donation drives are verified and progress is
                tracked openly.
              </p>
            </div>
            {/* Transparency */}
            <div className="flex flex-col items-center justify-center">
              <div className="bg-[#1C7D91] rounded-full shadow-md flex flex-col items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 shrink-0">
                <Image
                  src="/images/transparency.png"
                  alt="Transparency"
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mb-2 text-center px-2">
                Transparency
              </h3>
              <p className="text-gray-50 text-center text-xs sm:text-sm md:text-base px-20 sm:px-6 md:px-8">
                We ensure all donation drives are verified and progress is
                tracked openly.
              </p>
            </div>
            {/* Impact */}
            <div className="flex flex-col items-center justify-center">
              <div className="bg-[#1C7D91] rounded-full shadow-md flex flex-col items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 shrink-0">
                <Image
                  src="/images/impact.png"
                  alt="Impact"
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mb-2 text-center px-2">
                Impact
              </h3>
              <p className="text-gray-50 text-center text-xs sm:text-sm md:text-base px-20 sm:px-6 md:px-8">
                Every contribution, no matter the size, creates meaningful
                change. Every peso counts.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-tr from-[#012326] to-[#013e4a] font-sans dark:bg-black">
      <Header />
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12 w-full">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">
            About Us
          </h1>
          <p className="text-white text-center mb-12">
            Doneyt is a platform that allows you to donate to causes you care
            about.
          </p>
          <h4 className="text-4xl font-bold text-white mb-8 text-center font-sans italic">
            &quot;Connecting hearts, transforming lives.&quot;
          </h4>
        </div>
        <section className="mb-32 px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="bg-white rounded-lg shadow-md p-8 h-full flex flex-col">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-center">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed flex-1 text-center">
                DONEYT is a platform dedicated to connecting generous donors
                with meaningful causes. We believe in the power of community and
                the impact of collective action in creating positive change.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 h-full flex flex-col">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-center">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed flex-1 text-center">
                To become the leading platform for charitable giving in the
                Philippines, making it easy and transparent for everyone to
                support causes they care about.
              </p>
            </div>
          </div>
        </section>
        {/* Values */}
        <section className="mb-48 px-56">
          <h2 className="text-3xl font-semibold text-white mb-16 text-center ">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Transparency */}
            <div className="flex flex-col items-center justify-center">
              <div
                className="bg-white rounded-full shadow-md flex flex-col items-center justify-center mx-auto mb-8"
                style={{
                  width: "180px",
                  height: "180px",
                  minWidth: "180px",
                  minHeight: "180px",
                }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  Community
                </h3>
              </div>
              <p className="text-gray-50 text-center text-base px-8">
                We ensure all donation drives are verified and progress is
                tracked openly.
              </p>
            </div>
            {/* Community */}
            <div className="flex flex-col items-center justify-center">
              <div
                className="bg-white rounded-full shadow-md flex flex-col items-center justify-center mx-auto mb-8"
                style={{
                  width: "180px",
                  height: "180px",
                  minWidth: "180px",
                  minHeight: "180px",
                }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  Transparency
                </h3>
              </div>
              <p className="text-gray-50 text-center text-base px-8">
                We ensure all donation drives are verified and progress is
                tracked openly.
              </p>
            </div>
            {/* Impact */}
            <div className="flex flex-col items-center justify-center">
              <div
                className="bg-white rounded-full shadow-md flex flex-col items-center justify-center mx-auto mb-8"
                style={{
                  width: "180px",
                  height: "180px",
                  minWidth: "180px",
                  minHeight: "180px",
                }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  Impact
                </h3>
              </div>
              <p className="text-gray-50 text-center text-base px-8">
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

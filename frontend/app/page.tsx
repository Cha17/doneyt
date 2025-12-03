import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedDrives from "./components/FeaturedDrives";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-tr from-[#012326] to-[#013e4a] font-sans dark:bg-black">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedDrives />
      </main>
      <Footer />
    </div>
  );
}

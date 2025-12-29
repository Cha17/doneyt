import Footer from "./Footer";
import Header from "./Header";
import DriveDetailSkeleton from "./DriveDetailSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-tr from-[#012326] to-[#013e4a] font-sans dark:bg-black">
      <Header />
      <DriveDetailSkeleton />
      <Footer />
    </div>
  );
}

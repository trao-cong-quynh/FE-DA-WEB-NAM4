import Banner from "../../component/Slides/Banner";

import MoviePoster from "../../component/MoviePoster";
import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar/Navbar";
import { useGetPhimUS } from "../../api/homepage";
// Đường dẫn tương đối

function Home() {
  const { data: Phims } = useGetPhimUS();

  if (!Phims) return <p>Loading...</p>;
  return (
    <div className="max-w-full">
      <div className="container mx-auto bg-[#FDF7E5]">
        <Navbar />
        <Banner />
        <h1 className="text-black text-2xl text-center font-bold my-2 bg-[#FDF7E5]">
          PHIM ĐANG CHIẾU
        </h1>
        <MoviePoster Phims={Phims} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;

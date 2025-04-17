import Banner from "../../component/Slides/Banner";
import MoviePoster from "../../component/MoviePoster";
import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar/navbar";
import { useGetPhimUS } from "../../api/homepage";
// Đường dẫn tương đối

function Home() {
  const { data: Phims } = useGetPhimUS();

  if (!Phims) return <p>Loading...</p>;
  return (
    <div className="w-full bg-[#FDF7E5]">
      <Navbar />
      <Banner />
      <div className="container mx-auto px-4">
        <h1 className="text-black text-2xl text-center font-bold py-8">
          PHIM ĐANG CHIẾU
        </h1>
        <MoviePoster Phims={Phims} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;

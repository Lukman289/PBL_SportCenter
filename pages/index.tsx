import CarouselBranch from "@/shared/components/carouselBranch";

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-center items-center">
        <div className="flex flex-col bg-[url(../public/images/image.png)] gap-[50px] bg-cover items-center w-full justify-center min-h-screen bg-fixed text-center">
          <h1 className="text-[64px] text-white font-bold">Selamat Datang!</h1>
          <p className="text-[24px] text-white">
            Siap untuk aktivitas olahraga hari ini? Mari tetap bugar dan
            berprestasi!
          </p>
          <button className="bg-skye rounded-lg px-4 py-2 w-[350px] h-[75px] text-white text-[36px] font-bold hover:bg-skye-hover transition duration-300">
            <a href="#">Reservasi</a>
          </button>
        </div>
        <div className="flex flex-col w-[80%] h-auto row-start-3 justify-center items-center text-center gap-[50px] bg-background">
          <h2 className="text-[32px] text-black font-bold"></h2>
          <CarouselBranch />
        </div>
      </main>
      <footer className="row-start-4 flex gap-[10px] flex-wrap items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-[24px] bg-background w-full h-auto p-[20px] text-center">
          <h2 className="text-[32px] text-black font-bold">Hubungi Kami</h2>
        </div>
      </footer>
    </>
  );
}

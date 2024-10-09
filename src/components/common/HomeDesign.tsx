
import Image from "next/image";

const HomeDesign = () => {
    return (
      <div className="flex flex-col gap-5 h-[50vh] md:h-[75vh] mt-14 mx-4 md:mx-[10vh] lg:mx-[20vh] xl:mx-[40vh] justify-center items-center text-center bg-white relative overflow-hidden">
        {/* Floating Icons */}
        <div className="absolute top-10 left-4 md:left-10 w-10 h-10 md:w-12 md:h-12">
          <Image
            src="https://res.cloudinary.com/dxgkczwho/image/upload/v1727795601/jkijkl_1_yh29ca.png"
            alt="TypeScript Logo"
            width={500}
            height={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-contain animate-float-1"
          />
        </div>
        <div className="absolute bottom-10 left-10 w-10 h-10 md:w-16 md:h-16">
          <Image
            src="https://res.cloudinary.com/dxgkczwho/image/upload/v1727796116/jkijkl_3_sxc87f.png"
            alt="VS Code Logo"
            width={500}
            height={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-contain animate-float-1"
          />
        </div>
        <div className="absolute top-20 right-4 md:right-10 w-10 h-10 md:w-12 md:h-12">
          <Image
            src="https://res.cloudinary.com/dxgkczwho/image/upload/v1727794789/DALL_E-2024-10-01-20.22_xjyrx9.png"
            alt="university logo"
            width={500}
            height={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-contain animate-float-1"
          />
        </div>
        <div className="absolute bottom-10 right-5 w-12 h-12 md:w-16 md:h-16">
          <Image
            src="https://res.cloudinary.com/dxgkczwho/image/upload/v1727796541/jkijkl__5_-removebg-preview_nmk6hh.png"
            alt="Rust Logo"
            width={500}
            height={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-contain animate-float-1"
          />
        </div>
  
        {/* Welcome Message */}
        <div className="flex flex-col items-center shadow-sky-200 shadow-xl w-full text-center p-4 md:p-8">
          <span className="tracking-tighter text-xl md:text-2xl lg:text-3xl font-medium text-primary/80">
            Welcome to
          </span>
          <h1 className="tracking-tighter text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold my-2">
            <span className="font-bold bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent">
              TESTPE.
            </span>
            in
          </h1>
  
          <p className="max-w-lg text-center tracking-tight text-sm md:text-base lg:text-lg font-light">
            A platform where you will find the previous year questions paper to practice before your exam date.
          </p>
        </div>
  
        {/* Tailwind Keyframes as Inline Styles */}
        <style>{`
          @keyframes float1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes float2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(15px); }
          }
          @keyframes float3 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes float4 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(25px); }
          }
          .animate-float-1 {
            animation: float1 6s ease-in-out infinite;
          }
          .animate-float-2 {
            animation: float2 5s ease-in-out infinite;
          }
          .animate-float-3 {
            animation: float3 7s ease-in-out infinite;
          }
          .animate-float-4 {
            animation: float4 8s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  };
  
  export default HomeDesign;
  
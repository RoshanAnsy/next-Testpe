import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
    return (
        <div className="bg-black text-white flex flex-col sm:flex-row gap-y-2 sm:gap-x-6 justify-center items-center p-4 ">
             <p className="text-xs md:text-sm lg:text-base text-center">All privacy reserved under MIT license @2024.</p>
            <div className=" flex gap-4 justify-center items-center ">
                <p>Follow us</p>
              <a href="https://x.com/Roshanansy123" target="blank"><RiTwitterXFill size={30} className=" p-2 sm:p-0 hover:scale-110 "  /></a>  
            </div>
           
        </div>
    );
};

export default Footer;

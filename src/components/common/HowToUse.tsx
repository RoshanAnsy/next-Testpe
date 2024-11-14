

import Image from 'next/image'
import Htu from "../../../public/assects/Htu.png"
const HowToUse = () => {
  return (
    <div className='flex justify-center items-center sm:mx-auto m-6 mx-4 sm:m-12 '>
      <Image src={Htu}
      className='shadow-lg rounded-xl'
      alt='how to use'
      width={1000}
      height={500}
      />
    </div>
  )
}

export default HowToUse;

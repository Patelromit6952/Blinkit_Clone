import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
   <footer className='border-t '>
        <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
            <p>© All RIghts Reserved 2025</p>
            <div className='flex items-center gap-4 justify-center'>
                <a href="" className='hover:text-primary-100'><FaFacebook size={25}/></a>
                <a href="" className='hover:text-primary-100'><FaInstagram size={25}/></a>
                <a href="" className='hover:text-primary-100'><FaLinkedin size={25}/></a>
            </div>
        </div>
   </footer>
  )
}

export default Footer
import { FaLinkedin, FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';
export const Footer = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-lg py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-12">
          <a href="#" className="text-white hover:text-blue-300 transition">
            <FaLinkedin size={24} />
          </a>
          <a href="#" className="text-white hover:text-blue-300 transition">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-white hover:text-blue-300 transition">
            <FaGithub size={24} />
          </a>
          <a href="#" className="text-white hover:text-blue-300 transition">
            <FaInstagram size={24} />
          </a>
        </div>
        <div className="text-center text-white mt-4">
          © 2023 AITERMI. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
};
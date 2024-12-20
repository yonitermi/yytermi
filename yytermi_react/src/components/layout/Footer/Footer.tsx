import { SocialLinks } from './SocialLinks';
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto px-4 py-8 footer-content">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <h3 className="text-white font-semibold mb-4">ניווט מהיר</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-white/80 hover:text-white transition-colors">בית</a></li>
              <li><a href="#about" className="text-white/80 hover:text-white transition-colors">קצת עליי</a></li>
              <li><a href="#services" className="text-white/80 hover:text-white transition-colors">שירותים</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white transition-colors">צור קשר</a></li>
            </ul>
          </div>
          
          <div className="text-center">
            <h3 className="text-white font-semibold mb-4">שירותים</h3>
            <ul className="space-y-2">
              <li className="text-white/80">בניית אתרים חכמים</li>
              <li className="text-white/80">אוטומציה של תהליכים</li>
              <li className="text-white/80">אפליקציות AI</li>
              <li className="text-white/80">סוכני מייל מאובטחים</li>
            </ul>
          </div>
          
          <div className="text-center">
            <h3 className="text-white font-semibold mb-4">צור קשר</h3>
            <ul className="space-y-2">
              <li className="text-white/80">טלפון: 03-1234567</li>
              <li className="text-white/80">דוא"ל: info@yytermi.co.il</li>
              <li className="text-white/80">כתובת: רחוב הברזל 3, תל אביב</li>
            </ul>
          </div>
        </div>

        <SocialLinks />
        
        <div className="mt-8 text-center border-t border-white/10 pt-8">
          <p className="text-white/80">
            © {currentYear} YYTERMI. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};
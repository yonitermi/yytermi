import { motion } from 'framer-motion';
import { FaQuoteRight } from 'react-icons/fa';

interface Testimonial {
  content: string;
  author: string;
  role: string;
}

export const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      content: "YYTERMI שינתה את הדרך שבה אנחנו מנהלים את העסק. הפתרונות שלהם חכמים ובטוחים.",
      author: "דני כהן",
      role: "מנכ״ל, טכנולוגיות עתיד"
    },
    {
      content: "השירות המקצועי והליווי הצמוד עזרו לנו להטמיע פתרונות AI בצורה חלקה ויעילה.",
      author: "מיכל לוי",
      role: "סמנכ״לית טכנולוגיות, חדשנות בע״מ"
    },
    {
      content: "האבטחה והפרטיות שמספקת YYTERMI נתנו לנו שקט נפשי מלא בשימוש במערכות AI.",
      author: "יוסי אברהם",
      role: "מנהל תפעול, דיגיטל פרו"
    }
  ];

  return (
    <div className="py-20 bg-white/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            מה הלקוחות שלנו אומרים
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 relative"
            >
              <FaQuoteRight className="text-white/20 text-4xl absolute top-4 right-4" />
              <div className="text-right">
                <p className="text-white/90 mb-6 leading-relaxed">
                  {testimonial.content}
                </p>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-white/60">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
import { motion } from 'framer-motion';
import { services } from '../data/services';
import { ServiceCard } from '../components/services/ServiceCard';
import { SecurityFeatureList } from '../components/security/SecurityFeatureList';

export const ServicesAndSecurityPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 services-section" dir="rtl">
      {/* AI Services Section */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">שירותי AI</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* AI Security Section */}
      <section>
        <div className="bg-gradient-to-r from-blue-900/95 p-8 rounded-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              אבטחת AI
            </h2>
            <p className="text-white/80 leading-relaxed">
              בעולם של נתונים, כל פעולה חשובה. אנו שמים את האבטחה בראש סדר העדיפויות.
              בינה מלאכותית (AI) היא כלי עוצמתי, אך כאשר היא לא מיושמת ונבדקת כראוי, היא עלולה להוביל לחשיפה של נתונים רגישים, החלטות שגויות או ניצול לרעה. לכן, אנו מוודאים שכל פתרון AI שאנו מציעים נבדק בקפדנות ועומד בסטנדרטים הגבוהים ביותר של אבטחת מידע ופרטיות.
            </p>
          </motion.div>

          <SecurityFeatureList />
        </div>
      </section>
    </div>
  );
};
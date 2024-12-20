import { motion } from 'framer-motion';
import { SecurityFeatureList } from '../components/security/SecurityFeatureList';

export const AISecurityPage = () => {
  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
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
    </div>
  );
};
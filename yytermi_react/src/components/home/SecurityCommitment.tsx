import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserShield } from 'react-icons/fa';

export const SecurityCommitment = () => {
  const securityFeatures = [
    {
      icon: FaShieldAlt,
      title: 'אבטחה מתקדמת',
      description: 'שימוש בטכנולוגיות הצפנה מתקדמות להגנה על המידע שלכם'
    },
    {
      icon: FaLock,
      title: 'פרטיות מובטחת',
      description: 'הקפדה על סטנדרטים גבוהים של אבטחת מידע ופרטיות'
    },
    {
      icon: FaUserShield,
      title: 'הגנת נתונים',
      description: 'מערכות AI מאובטחות עם דגש על שמירת המידע העסקי שלכם'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-900/95 to-purple-900/95 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            המחויבות שלנו לאבטחה
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            בעולם של נתונים, כל פעולה חשובה. אנו שמים את האבטחה בראש סדר העדיפויות
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-xl p-6 text-center"
            >
              <feature.icon className="text-4xl text-white/90 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
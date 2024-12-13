import { motion } from 'framer-motion';

export const ValueProposition = () => {
  const benefits = [
    { title: 'יעילות', description: 'אוטומציה שחוסכת זמן ומפנה משאבים.' },
    { title: 'אבטחה', description: 'פתרונות AI עם דגש על הגנת נתונים.' },
    { title: 'התאמה אישית', description: 'שירותים המותאמים במיוחד לצרכים של העסק שלכם.' },
  ];

  return (
    <div className="bg-white/10 rounded-xl p-8">
      <h2 className="text-3xl font-bold text-white mb-6 text-right">
        שדרגו את העסק שלכם עם פתרונות בינה מלאכותית חכמה
      </h2>
      
      <p className="text-white/90 mb-8 text-right leading-relaxed">
        ב-YYTERMI אנחנו מתמחים בפיתוח מערכות חכמות ואוטומציה של תהליכים עסקיים. 
        בין אם מדובר בבניית אתרים חכמים ומאובטחים, יצירת אפליקציות מותאמות אישית או 
        שימוש בסוכני מייל חכמים, אנו דואגים שהפתרונות שלנו יהיו יעילים, חדשניים ומאובטחים.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white/5 p-6 rounded-lg text-right"
          >
            <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
            <p className="text-white/80">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
import { motion } from 'framer-motion';

export const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-white mb-6 text-center">קצת עליי</h1>
        <div className="rounded-xl p-8 text-white space-y-4">
          <p className="text-right leading-relaxed">
          אני בוגר תואר בהנדסת חשמל ואלקטרוניקה עם ניסיון עשיר בתשתיות, אבטחת מידע וניתוח נתונים. עבדתי באינטל, Retailsoft ו-Quality Bytes, שם ניהלתי מערכות מתקדמות, בסיסי נתונים ושרתי Linux, עבדתי עם פיירוולים כמו FortiGate ו-pfSense, וצברתי ניסיון במודל ה-OSI ובשיתוף פעולה עם מערך הסייבר הלאומי.
          </p>
          <p className="text-right leading-relaxed">
          כיום, כמנהל תשתיות ענן ב-AWS בחברת Ipracticom, אני עוסק בטכנולוגיות מתקדמות ומודע לסיכונים המורכבים של טכנולוגיות AI. מתוך תובנה זו הקמתי את YYTERMI, המשלבת פתרונות AI חכמים עם אבטחת מידע חזקה והגנה על פרטיות, כדי לספק לעסקים חדשנות בטוחה ומתקדמת.</p>
        </div>
      </motion.div>
    </div>
  );
};
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
            אני בוגר תואר בהנדסת חשמל ואלקטרוניקה עם ניסיון עשיר בתחומי התשתיות, אבטחת המידע וניתוח נתונים. את דרכי התחלתי באינטל כמהנדס שירות, שם עסקתי בניהול מערכות מתקדמות ובפתרון בעיות טכניות מורכבות בסביבה תעשייתית מתקדמת. בהמשך, עבדתי ב-Retailsoft, שם ניהלתי בסיסי נתונים של SSMS ו-ORACLE על שרתי Windows, תוך התמקדות באבטחת מידע וביציבות תפעולית.
          </p>
          <p className="text-right leading-relaxed">
            לאחר מכן עברתי ל-Quality Bytes, חברה המתמחה באבטחת מידע ללקוחות עסקיים. בתפקידי, עבדתי עם פיירוולים מתקדמים כמו FortiGate ו-pfSense, וניהלתי שרתי Linux בסביבות מאובטחות. כמו כן, צברתי ניסיון רב בפתרון תקלות טכניות בכל שכבות מודל ה-OSI, תוך שיתוף פעולה שוטף עם מערך הסייבר הלאומי לשיפור ההגנה על מערכות הלקוחות.
          </p>
          <p className="text-right leading-relaxed">
            כיום אני מנהל תשתיות ענן ב-AWS בחברת Ipracticom, שם אני מתמקד בניהול מערכות ענן מתקדמות וביישום פתרונות תקשורת חכמים. מתוך הבנה של הסיכונים והאתגרים הטמונים בטכנולוגיות AI, הקמתי את YYTERMI, חברה המספקת פתרונות AI חכמים ומאובטחים, המשלבים חדשנות עם הגנה חזקה על פרטיות הלקוחות ומידע עסקי.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
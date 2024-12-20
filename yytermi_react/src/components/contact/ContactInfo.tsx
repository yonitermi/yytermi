import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import React from 'react';

export const ContactInfo = () => {
  const contactDetails = [
    {
      icon: FaMapMarkerAlt,
      title: "כתובת",
      content: "רחוב הברזל 3, תל אביב"
    },
    {
      icon: FaPhone,
      title: "טלפון",
      content: "03-1234567"
    },
    {
      icon: FaEnvelope,
      title: "אימייל",
      content: "info@yytermi.co.il"
    },
    {
      icon: FaClock,
      title: "שעות פעילות",
      content: "א'-ה' | 09:00-18:00"
    }
  ];

  return (
    <div className="rounded-xl p-8 shadow-lg h-full contact-info" dir="rtl">
      <div className="flex flex-col h-full">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">פרטי התקשרות</h2>
          
          <div className="space-y-6">
            {contactDetails.map((detail, index) => (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <detail.icon className="text-2xl text-white/60 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">{detail.title}</h3>
                  <p className="text-white/80">{detail.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Robot Image */}
        <motion.div 
          className="mt-8 relative h-48 rounded-lg overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-primary-purple/20" />
          <img 
            src="https://www.securities.io/wp-content/uploads/2024/03/DALL%C2%B7E-2024-03-21-09.08.33-A-highly-detailed-and-realistic-image-showing-an-advanced-robot-seated-at-a-modern-sleek-desk-surrounded-by-multiple-screens-displaying-complex-algor.webp"
            alt="AI Assistant"
            className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity"
            style={{ 
              objectPosition: 'center 30%'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
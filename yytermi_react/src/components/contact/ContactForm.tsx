import { FormEvent } from 'react';
import { InputField, TextAreaField } from './ContactFormField';
import { SubmitButton } from './SubmitButton';
export const ContactForm = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form" dir="rtl">
      <InputField
        type="text"
        name="name"
        label="שם מלא"
        placeholder="הכנס/י את שמך"
        required
      />
      
      <InputField
        type="email"
        name="email"
        label="דואר אלקטרוני"
        placeholder="הכנס/י את כתובת המייל שלך"
        required
      />
      
      <InputField
        type="tel"
        name="phone"
        label="טלפון"
        placeholder="הכנס/י את מספר הטלפון שלך"
      />
      
      <TextAreaField
        name="message"
        label="הודעה"
        placeholder="כתוב/י את ההודעה שלך כאן..."
        rows={4}
        required
      />
      
      <SubmitButton text="שליחת הודעה" />
    </form>
  );
};
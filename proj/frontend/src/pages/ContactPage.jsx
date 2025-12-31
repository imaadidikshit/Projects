import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@luxe.com' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: MapPin, label: 'Address', value: '123 Fifth Avenue, New York, NY 10010' },
    { icon: Clock, label: 'Hours', value: 'Mon - Fri: 9AM - 6PM EST' },
  ];

  return (
    <main className="min-h-screen bg-black pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm uppercase tracking-widest mb-4 block">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Contact Us</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Our team is always here to help with any questions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-14"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-14"
                    required
                  />
                </div>
              </div>

              <Input
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Subject"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-14"
                required
              />

              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your Message"
                rows={6}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none"
                required
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 font-medium rounded-full flex items-center justify-center gap-2 transition-colors ${
                  submitted
                    ? 'bg-green-500 text-white'
                    : 'bg-amber-400 text-black hover:bg-amber-300'
                }`}
              >
                {submitted ? (
                  'Message Sent!'
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="p-3 bg-amber-400/10 rounded-xl">
                  <item.icon className="text-amber-400" size={24} />
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">{item.label}</p>
                  <p className="text-white text-lg">{item.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Map Placeholder */}
            <div className="aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="Map"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Mail, Phone, MessageCircle, Send, HelpCircle, ChevronDown } from 'lucide-react';

const FloatingObject = ({ delay, style }) => {
  const props = useSpring({
    loop: true,
    to: [
      { transform: 'translate3d(0,20px,0)' },
      { transform: 'translate3d(0,-20px,0)' },
    ],
    from: { transform: 'translate3d(0,0px,0)' },
    config: {
      duration: 2000 + delay,
    },
  });

  return (
    <animated.div
      style={{
        ...props,
        ...style,
        position: 'absolute',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
      }}
    />
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20" />
      <FloatingObject delay={0} style={{ top: '10%', left: '10%' }} />
      <FloatingObject delay={500} style={{ top: '20%', right: '20%' }} />
      <FloatingObject delay={1000} style={{ bottom: '15%', left: '30%' }} />
      <FloatingObject delay={1500} style={{ bottom: '25%', right: '15%' }} />
    </div>
  );
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const AccordionAnimation = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' }
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <motion.div 
        className="max-w-5xl mx-auto relative z-10"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-indigo-800"
            variants={fadeIn}
          >
            Get in Touch
          </motion.h1>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div variants={fadeIn} className="space-y-8">
              <div className="bg-indigo-50 rounded-xl p-6 space-y-6">
                <h2 className="text-2xl font-bold text-indigo-700">Contact Information</h2>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Mail className="w-6 h-6 text-indigo-600" />
                    <span>yuanlin7019082@gmail.com</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <MessageCircle className="w-6 h-6 text-indigo-600" />
                    <span>WeChat ID: masterwitcher</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Phone className="w-6 h-6 text-indigo-600" />
                    <span>+86 13027087353</span>
                  </motion.div>
                </div>
              </div>

              <motion.div 
                className="bg-indigo-50 rounded-xl p-6"
                variants={fadeIn}
              >
                <h2 className="text-2xl font-bold mb-6 text-indigo-700">Send Us a Message</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-indigo-700">Name</Label>
                      <Input id="name" placeholder="Enter your name" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-indigo-700">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-indigo-700">Message</Label>
                    <Textarea id="message" rows={4} placeholder="Enter your message" className="mt-1" />
                  </div>
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-8">
              <div className="bg-indigo-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-indigo-700">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {[
                    { question: "How does the grading system work?", answer: "Our AI grading system uses advanced natural language processing (NLP) algorithms to evaluate your responses. It analyzes your grammar, vocabulary, coherence, and pronunciation (for speaking) to provide an accurate and detailed score similar to human examiners." },
                    { question: "Can the AI predict my IELTS score?", answer: "Yes, our AI can predict your IELTS score based on your performance in practice tests. It uses patterns and data from thousands of previous test-takers to provide a reliable estimate of your potential IELTS score." },
                    { question: "How can I improve my writing skills?", answer: "We provide instant feedback on your writing tasks, highlighting areas of improvement such as grammar errors, vocabulary usage, coherence, and task response. It also offers suggestions for better sentence structure and word choice to help you improve your writing skills." },
                    { question: "Can the AI help with my speaking practice?", answer: "Yes, our AI offers speaking practice sessions where it evaluates your pronunciation, fluency, and coherence. It provides immediate feedback and suggestions to help you improve your speaking skills. You can also practice common speaking topics and questions to prepare for the IELTS Speaking test." },
                    { question: "Is the AI feedback accurate?", answer: "Our AI feedback is highly accurate, as it is trained on a vast dataset of IELTS responses and scores. However, it is always recommended to combine AI feedback with human feedback for the best results, especially for subjective areas like writing and speaking." }
                  ].map((item, index) => (
                    <AccordionItem value={`item-${index + 1}`} key={index}>
                      <AccordionTrigger className="text-left">
                        <motion.div 
                          className="flex items-center justify-between w-full"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {item.question}
                          <ChevronDown className="w-4 h-4 text-indigo-600 transition-transform duration-200" />
                        </motion.div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <motion.div
                          variants={AccordionAnimation}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          {item.answer}
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="mt-12 bg-indigo-50 rounded-xl p-6"
            variants={fadeIn}
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">How Can We Help You?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: HelpCircle, title: "General Inquiries", description: "Have a question about our services? We're here to help!" },
                { icon: MessageCircle, title: "Technical Support", description: "Experiencing issues? Our tech team is ready to assist you." },
                { icon: Mail, title: "Feedback", description: "We value your opinion. Share your thoughts with us!" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <item.icon className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
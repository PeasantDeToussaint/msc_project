import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export default function ContactPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-20">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-4">FAQs</h2>
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
  <AccordionTrigger>How does the grading system work?</AccordionTrigger>
  <AccordionContent>
    Our AI grading system uses advanced natural language processing (NLP) algorithms to evaluate your responses. It analyzes your grammar, vocabulary, coherence, and pronunciation (for speaking) to provide an accurate and detailed score similar to human examiners.
  </AccordionContent>
</AccordionItem>
<AccordionItem value="item-2">
  <AccordionTrigger>Can the AI predict my IELTS score?</AccordionTrigger>
  <AccordionContent>
    Yes, our AI can predict your IELTS score based on your performance in practice tests. It uses patterns and data from thousands of previous test-takers to provide a reliable estimate of your potential IELTS score.
  </AccordionContent>
</AccordionItem>
<AccordionItem value="item-3">
  <AccordionTrigger>How can I improve my writing skills?</AccordionTrigger>
  <AccordionContent>
    We provides instant feedback on your writing tasks, highlighting areas of improvement such as grammar errors, vocabulary usage, coherence, and task response. It also offers suggestions for better sentence structure and word choice to help you improve your writing skills.
  </AccordionContent>
</AccordionItem>
<AccordionItem value="item-4">
  <AccordionTrigger>Can the AI help with my speaking practice?</AccordionTrigger>
  <AccordionContent>
    Yes, our AI offers speaking practice sessions where it evaluates your pronunciation, fluency, and coherence. It provides immediate feedback and suggestions to help you improve your speaking skills. You can also practice common speaking topics and questions to prepare for the IELTS Speaking test.
  </AccordionContent>
</AccordionItem>
<AccordionItem value="item-5">
  <AccordionTrigger>How does the AI adapt to my learning pace?</AccordionTrigger>
  <AccordionContent>
    The AI continuously monitors your progress and adapts the difficulty level of practice tasks to match your learning pace. It provides personalized recommendations and practice materials to target your specific weaknesses and help you improve more efficiently.
  </AccordionContent>
</AccordionItem>
<AccordionItem value="item-6">
  <AccordionTrigger>Is the AI feedback accurate?</AccordionTrigger>
  <AccordionContent>
    Our AI feedback is highly accurate, as it is trained on a vast dataset of IELTS responses and scores. However, it is always recommended to combine AI feedback with human feedback for the best results, especially for subjective areas like writing and speaking.
  </AccordionContent>
</AccordionItem>
<AccordionItem value="item-7">
  <AccordionTrigger>Can the AI help me manage my study schedule?</AccordionTrigger>
  <AccordionContent>
    Yes, our AI can help you create a personalized study schedule based on your target test date, current skill level, and daily availability. It ensures that you cover all necessary topics and practice areas in a structured manner to maximize your preparation.
  </AccordionContent>
</AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MailIcon className="w-5 h-5 text-muted-foreground" />
                <span>yuanlin7019082@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-muted-foreground" />
                <span>WeChat ID: masterwitcher</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-muted-foreground" />
                <span>+86 13027087353</span>
              </div>
            </div>
            <form className="space-y-4 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={4} placeholder="Enter your message" />
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

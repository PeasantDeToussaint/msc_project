import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Headphones, PenTool, Mic, Award, Calendar, GraduationCap } from 'lucide-react';

const SidebarItem = ({ targetId, children, isActive = false, isNested = false, onClick }) => (
  <button
    onClick={() => onClick(targetId)}
    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground w-full text-left ${
      isNested ? 'ml-4' : ''
    } ${isActive ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
  >
    {children}
  </button>
);

const Section = ({ id, title, children }) => (
  <section id={id} className="mb-8">
    <h2 className="text-2xl font-bold mb-4 scroll-m-20">{title}</h2>
    {children}
  </section>
);

export default function IELTSInfoPage() {
  const [activeSection, setActiveSection] = useState('about-ielts');
  const contentRef = useRef(null);

  const handleSidebarClick = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement && contentRef.current) {
      const scrollTop = targetElement.offsetTop - contentRef.current.offsetTop;
      contentRef.current.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (!contentRef.current) return;

    const sections = contentRef.current.querySelectorAll('section');
    const scrollPosition = contentRef.current.scrollTop;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - contentRef.current.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop - 50 && scrollPosition < sectionTop + sectionHeight - 50) {
        setActiveSection(section.id);
      }
    });
  };

  useEffect(() => {
    const scrollArea = contentRef.current;
    if (scrollArea) {
      scrollArea.addEventListener('scroll', handleScroll);
      return () => scrollArea.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 flex-col border-r bg-background hidden lg:flex fixed left-0 h-screen">
        <ScrollArea className="flex-grow">
          <nav className="flex flex-col space-y-1 px-4 py-6">
            <SidebarItem targetId="about-ielts" isActive={activeSection === 'about-ielts'} onClick={handleSidebarClick}>
              <BookOpen className="h-4 w-4" /> About IELTS
            </SidebarItem>
            <SidebarItem targetId="test-format" isActive={activeSection === 'test-format'} onClick={handleSidebarClick}>
              <GraduationCap className="h-4 w-4" /> Test Format
            </SidebarItem>
            <SidebarItem targetId="listening" isNested isActive={activeSection === 'listening'} onClick={handleSidebarClick}>
              <Headphones className="h-4 w-4" /> Listening
            </SidebarItem>
            <SidebarItem targetId="reading" isNested isActive={activeSection === 'reading'} onClick={handleSidebarClick}>
              <BookOpen className="h-4 w-4" /> Reading
            </SidebarItem>
            <SidebarItem targetId="writing" isNested isActive={activeSection === 'writing'} onClick={handleSidebarClick}>
              <PenTool className="h-4 w-4" /> Writing
            </SidebarItem>
            <SidebarItem targetId="speaking" isNested isActive={activeSection === 'speaking'} onClick={handleSidebarClick}>
              <Mic className="h-4 w-4" /> Speaking
            </SidebarItem>
            <SidebarItem targetId="scoring-system" isActive={activeSection === 'scoring-system'} onClick={handleSidebarClick}>
              <Award className="h-4 w-4" /> Scoring System
            </SidebarItem>
            <SidebarItem targetId="test-preparation" isActive={activeSection === 'test-preparation'} onClick={handleSidebarClick}>
              <GraduationCap className="h-4 w-4" /> Test Preparation
            </SidebarItem>
            <SidebarItem targetId="test-dates-and-locations" isActive={activeSection === 'test-dates-and-locations'} onClick={handleSidebarClick}>
              <Calendar className="h-4 w-4" /> Test Dates and Locations
            </SidebarItem>
          </nav>
        </ScrollArea>
      </aside>
      <div className="flex-1 ml-0 lg:ml-64">
        <ScrollArea className="h-screen" ref={contentRef}>
          <main className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl font-bold mb-8">IELTS Documentation</h1>
              
              <Section id="about-ielts" title="About IELTS">
                <p className="text-muted-foreground mb-4">
                  The International English Language Testing System (IELTS) is the world's most popular English language proficiency test for higher education and global migration. Trusted by over 10,000 organizations in more than 140 countries, IELTS is your passport to international opportunities.
                </p>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Key Facts</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Accepted by over 10,000 organizations worldwide</li>
                      <li>Available in two test formats: Academic and General Training</li>
                      <li>Results typically available within 13 days</li>
                      <li>Valid for 2 years from the test date</li>
                    </ul>
                  </CardContent>
                </Card>
              </Section>

              <Section id="test-format" title="Test Format">
                <p className="text-muted-foreground mb-4">
                  IELTS evaluates your English language abilities across four key areas: Listening, Reading, Writing, and Speaking. Each section is designed to assess different aspects of your language proficiency.
                </p>
              </Section>

              <Section id="listening" title="Listening">
                <p className="text-muted-foreground mb-4">
                  The Listening test takes approximately 30 minutes. There are 40 questions. There are four parts to the test and each part consists of 10 questions. The test is played once only.
                </p>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Test Format</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Part 1: A conversation between two people set in an everyday social context</li>
                      <li>Part 2: A monologue set in an everyday social context</li>
                      <li>Part 3: A conversation between up to four people set in an educational or training context</li>
                      <li>Part 4: A monologue on an academic subject</li>
                    </ul>
                  </CardContent>
                </Card>
              </Section>

              <Section id="reading" title="Reading">
                <p className="text-muted-foreground mb-4">
                  The Reading test takes 60 minutes. There are 40 questions. There are three sections with increasing difficulty. The Academic and General Training tests have different reading texts.
                </p>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Test Format</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Academic Reading: Three long texts which range from descriptive and factual to discursive and analytical</li>
                      <li>General Training Reading: Section 1 contains two or three short factual texts, Section 2 contains two short work-related factual texts, Section 3 contains one longer text on a topic of general interest</li>
                    </ul>
                  </CardContent>
                </Card>
              </Section>

              <Section id="writing" title="Writing">
                <p className="text-muted-foreground mb-4">
                  The Writing test takes 60 minutes. There are two tasks to complete. It is the same for both Academic and General Training tests but the essays are different.
                </p>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Test Format</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Academic Writing: Task 1 - Describe visual information (graph/table/chart/diagram), Task 2 - Essay on a given topic</li>
                      <li>General Training Writing: Task 1 - Write a letter, Task 2 - Essay on a given topic</li>
                    </ul>
                  </CardContent>
                </Card>
              </Section>

              <Section id="speaking" title="Speaking">
                <p className="text-muted-foreground mb-4">
                  The Speaking test takes between 11 and 14 minutes. It is a face-to-face interview with a certified IELTS examiner. The test is interactive and as close to a real-life situation as a test can get.
                </p>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Test Format</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Part 1: Introduction and interview (4-5 minutes)</li>
                      <li>Part 2: Individual long turn (3-4 minutes)</li>
                      <li>Part 3: Two-way discussion (4-5 minutes)</li>
                    </ul>
                  </CardContent>
                </Card>
              </Section>

              <Section id="scoring-system" title="Scoring System">
                <p className="text-muted-foreground mb-4">
                  IELTS uses a 9-band scale to identify levels of proficiency, from non-user (band score 1) through to expert (band score 9).
                </p>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Band Scores</h3>
                    <ul className="space-y-1">
                      <li><strong>9</strong>: Expert user</li>
                      <li><strong>8</strong>: Very good user</li>
                      <li><strong>7</strong>: Good user</li>
                      <li><strong>6</strong>: Competent user</li>
                      <li><strong>5</strong>: Modest user</li>
                      <li><strong>4-1</strong>: Limited to non-user</li>
                    </ul>
                  </CardContent>
                </Card>
              </Section>

              <Section id="test-preparation" title="Test Preparation">
                <p className="text-muted-foreground mb-4">
                  Proper preparation is key to achieving your desired IELTS score. Here are some effective strategies to help you prepare:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Familiarize yourself with the test format and question types</li>
                  <li>Practice with official IELTS materials and past papers</li>
                  <li>Improve your English skills through regular reading, writing, listening, and speaking practice</li>
                  <li>Take timed practice tests to improve your time management skills</li>
                  <li>Consider enrolling in an IELTS preparation course or working with a tutor</li>
                </ul>
              </Section>

              <Section id="test-dates-and-locations" title="Test Dates and Locations">
                <p className="text-muted-foreground mb-4">
                  IELTS tests are conducted up to four times a month in over 1,600 locations across 140 countries. To find test dates and locations near you:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Visit the official IELTS website</li>
                  <li>Select your country and preferred test type (Academic or General Training)</li>
                  <li>Choose a test center and available date that suits you</li>
                  <li>Register and pay for your test online</li>
                </ol>
                <Button className="mt-4" asChild>
                  <a href="https://www.ielts.org/book-a-test" target="_blank" rel="noopener noreferrer">
                    Find Test Dates and Locations
                  </a>
                </Button>
              </Section>
            </div>
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
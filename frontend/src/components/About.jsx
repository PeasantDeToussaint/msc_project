import React, { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { BookOpen, Headphones, PenTool, Mic, Award, Calendar, GraduationCap, BookmarkIcon, ClipboardList, Lightbulb, Menu } from 'lucide-react'

const SidebarItem = ({ targetId, icon: Icon, children, isActive = false, onClick }) => (
  <Button
    variant="ghost"
    className={`w-full justify-start ${isActive ? 'bg-muted' : ''}`}
    onClick={() => onClick(targetId)}
  >
    <Icon className="mr-2 h-4 w-4" />
    {children}
  </Button>
)

const Section = ({ id, title, children }) => (
  <section id={id} className="mb-8 scroll-mt-16">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {children}
  </section>
)

const Sidebar = ({ activeSection, setActiveSection }) => {
  const handleClick = (sectionId) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="space-y-1">
      <SidebarItem targetId="overview" icon={BookOpen} isActive={activeSection === 'overview'} onClick={handleClick}>
        Overview
      </SidebarItem>
      <SidebarItem targetId="test-format" icon={GraduationCap} isActive={activeSection === 'test-format'} onClick={handleClick}>
        Test Format
      </SidebarItem>
      <SidebarItem targetId="listening" icon={Headphones} isActive={activeSection === 'listening'} onClick={handleClick}>
        Listening
      </SidebarItem>
      <SidebarItem targetId="reading" icon={BookOpen} isActive={activeSection === 'reading'} onClick={handleClick}>
        Reading
      </SidebarItem>
      <SidebarItem targetId="writing" icon={PenTool} isActive={activeSection === 'writing'} onClick={handleClick}>
        Writing
      </SidebarItem>
      <SidebarItem targetId="speaking" icon={Mic} isActive={activeSection === 'speaking'} onClick={handleClick}>
        Speaking
      </SidebarItem>
      <SidebarItem targetId="scoring-system" icon={Award} isActive={activeSection === 'scoring-system'} onClick={handleClick}>
        Scoring System
      </SidebarItem>
      <SidebarItem targetId="preparation-guide" icon={BookmarkIcon} isActive={activeSection === 'preparation-guide'} onClick={handleClick}>
        Preparation Guide
      </SidebarItem>
      <SidebarItem targetId="preparation-tips" icon={Lightbulb} isActive={activeSection === 'preparation-tips'} onClick={handleClick}>
        Preparation Tips
      </SidebarItem>
      <SidebarItem targetId="test-preparation" icon={ClipboardList} isActive={activeSection === 'test-preparation'} onClick={handleClick}>
        Test Preparation
      </SidebarItem>
      <SidebarItem targetId="test-dates-and-locations" icon={Calendar} isActive={activeSection === 'test-dates-and-locations'} onClick={handleClick}>
        Test Dates and Locations
      </SidebarItem>
    </nav>
  )
}

export default function IELTSInfoPage() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r bg-background hidden lg:block">
        <div className="sticky top-0 p-4 h-screen overflow-auto">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>
      </aside>
      <div className="flex-1">
        <header className="sticky top-0 z-10 bg-background border-b lg:hidden">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">IELTS Documentation</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="mt-6 w-full">
                  <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <main className="p-6 lg:p-8">
          <ScrollArea className="h-[calc(100vh-4rem)] lg:h-screen">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl font-bold mb-8 lg:hidden">IELTS Documentation</h1>
              
              <Section id="overview" title="Overview">
                <p className="text-muted-foreground mb-4">
                  The IELTS (International English Language Testing System) is a standardized test designed to assess English language proficiency for non-native English speakers. It consists of four main components: Listening, Reading, Writing, and Speaking.
                </p>
                <Card className="mb-4">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Speaking Practice</h3>
                    <p className="mb-2">The IELTS Speaking Practice simulates a 11-14 minute face-to-face interview with a certified examiner. It is divided into three parts:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li><strong>Introduction and Interview (4-5 minutes):</strong> Answer questions about yourself and your family</li>
                      <li><strong>Individual Long Turn (3-4 minutes):</strong> Speak about a given topic introduced by the examiner</li>
                      <li><strong>Two-way Discussion (4-5 minutes):</strong> Have a longer discussion with the examiner about the topic from Part 2</li>
                    </ol>
                  </CardContent>
                </Card>
                <Card className="mb-4">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Writing Test</h3>
                    <p className="mb-2">The IELTS Writing Test lasts for 60 minutes, and you will need to complete two writing tasks:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Task 1:</strong> Write a report summarizing, describing, or explaining visual information (graphs, charts, tables, etc.) in at least 150 words.</li>
                      <li><strong>Task 2:</strong> Write an essay responding to a point of view, argument, or problem in at least 250 words.</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Listening Test</h3>
                    <p className="mb-2">The IELTS Listening Test consists of four sections:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li><strong>Part 1:</strong> Social Needs - Everyday conversations and specific information</li>
                      <li><strong>Part 2:</strong> Social Context - Spoken descriptions about everyday situations</li>
                      <li><strong>Part 3:</strong> Educational Context - Discussions related to educational settings</li>
                      <li><strong>Part 4:</strong> Academic Subject - Academic lectures or presentations</li>
                    </ol>
                  </CardContent>
                </Card>
              </Section>

              <Section id="test-format" title="Test Format">
                <p className="text-muted-foreground mb-4">
                  IELTS evaluates your English language abilities across four key areas: Listening, Reading, Writing, and Speaking. Each section is designed to assess different aspects of your language proficiency.
                </p>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Test Components</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Listening:</strong> 30 minutes, 40 questions</li>
                      <li><strong>Reading:</strong> 60 minutes, 40 questions</li>
                      <li><strong>Writing:</strong> 60 minutes, 2 tasks</li>
                      <li><strong>Speaking:</strong> 11-14 minutes, face-to-face interview</li>
                    </ul>
                  </CardContent>
                </Card>
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

              <Section id="preparation-guide" title="Preparation Guide">
                <p className="text-muted-foreground mb-4">
                  Here's a comprehensive guide to help you prepare for the IELTS test:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong>Understand the test format and requirements:</strong> Familiarize yourself with the IELTS test structure, question types, and time limits for each section.</li>
                  <li><strong>Assess your current English level:</strong> Take a practice test to identify your strengths and weaknesses.</li>
                  <li><strong>Set a target score:</strong> Determine the IELTS score you need for your specific goals (e.g., university admission, immigration).</li>
                  <li><strong>Create a study plan:</strong> Develop a structured schedule that covers all four test sections (Listening, Reading, Writing, and Speaking).</li>
                  <li><strong>Build your vocabulary:</strong> Focus on academic and topic-specific vocabulary relevant to the IELTS test.</li>
                  <li><strong>Practice regularly:</strong> Use official IELTS practice materials and past papers to familiarize yourself with the test format and improve your skills.</li>
                  <li><strong>Improve your time management:</strong> Practice completing tasks within the given time limits to enhance your efficiency during the actual test.</li>
                  <li><strong>Seek feedback:</strong> Consider joining a study group or working with a tutor to get constructive feedback on your performance.</li>
                  <li><strong>Focus on your weakest areas:</strong> Dedicate extra time to improving the skills you find most challenging.</li>
                  <li><strong>Stay informed:</strong> Keep up with current events and read widely to improve your general knowledge and language skills.</li>
                </ol>
              </Section>

              <Section id="preparation-tips" title="Preparation Tips">
                <p className="text-muted-foreground mb-4">
                  Here are some valuable tips to help you prepare effectively for the IELTS exam:
                </p>
                <ol className="list-decimal pl-5 space-y-4">
                  <li>
                    <strong>Understand the exam format and requirements:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Familiarize yourself with the exam structure, content, timing, and scoring criteria.</li>
                      <li>Review official IELTS information on their website for the most up-to-date details.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Assess your current English level:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Take a professional level test or a practice IELTS test to understand your starting point.</li>
                      <li>This will help you identify areas that need improvement.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Set a target score and exam date:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Determine the IELTS score required for your goals (e.g., university admission, immigration).</li>
                      <li>Choose an exam date that allows sufficient preparation time.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Create a study plan:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Develop a structured schedule covering all four test sections.</li>
                      <li>Allocate more time to areas that need improvement.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Build your vocabulary:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Focus on academic and topic-specific vocabulary relevant to IELTS.</li>
                      <li>Use resources like "Cambridge IELTS Vocabulary: Essential Words and Phrases for IELTS".</li>
                    </ul>
                  </li>
                </ol>
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
          </ScrollArea>
        </main>
      </div>
    </div>
  )
}
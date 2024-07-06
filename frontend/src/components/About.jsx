import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

export default function Component() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 flex-col border-r bg-background sm:flex fixed left-0">
        <nav className="flex flex-col space-y-1 px-4 py-6 overflow-y-auto h-full">
          <Link
            to="/about"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
          >
            About IELTS
          </Link>
          <div className="space-y-1">
            <Link
              to="/test-format"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            >
              Test Format
            </Link>
            <div className="ml-4 space-y-1">
              <Link
                to="/listening"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              >
                Listening
              </Link>
              <Link
                to="/reading"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              >
                Reading
              </Link>
              <Link
                to="/writing"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              >
                Writing
              </Link>
              <Link
                to="/speaking"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              >
                Speaking
              </Link>
            </div>
          </div>
          <Link
            to="/scoring-system"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
          >
            Scoring System
          </Link>
          <Link
            to="/test-preparation"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
          >
            Test Preparation
          </Link>
          <Link
            to="/test-dates-and-locations"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
          >
            Test Dates and Locations
          </Link>
        </nav>
      </aside>
      <div className="flex-1 ml-64">
        <header className=" top-0 z-20 border-b bg-background px-4 py-3 sm:px-6 bg-opacity-50 backdrop-blur">
          <Breadcrumb className="text-left">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/about">About</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>IELTS</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="px-4 py-8 sm:px-10 md:px-8 lg:px-10 pt-5">
          <div className="mx-auto max-w-full text-left"> {/* Changed max-w to full and added text-left */}
            <section id="about-ielts">
              <h1 className="text-2xl font-bold">About IELTS</h1>
              <p className="mt-4 text-sm text-muted-foreground">
                IELTS (International English Language Testing System) is a globally recognized English proficiency test
                that assesses your ability to communicate in English. It is widely used for educational, immigration,
                and employment purposes.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                The test is accepted by over 10,000 organizations worldwide, including universities, professional bodies, employers, and immigration authorities. It is designed to reflect how you will use English in your new life abroad, whether that be studying, working, or living in an English-speaking country.
              </p>
            </section>
            <section id="test-format">
              <h2 className="text-xl font-bold">Test Format</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                The IELTS test consists of four sections: Listening, Reading, Writing, and Speaking. Each section is
                designed to evaluate a specific aspect of your English language skills.
              </p>
              <div className="ml-4 space-y-2 text-sm text-muted-foreground">
                <section id="listening">
                  <h3 className="text-base font-medium text-muted-foreground">Listening</h3>
                  <p>This section tests your ability to understand spoken English in a variety of contexts.</p>
                  <p className="mt-2">
                    The Listening section lasts for 30 minutes and consists of four recordings of native English speakers. You will answer a series of questions based on these recordings, which include conversations, monologues, and everyday situations.
                  </p>
                </section>
                <section id="reading">
                  <h3 className="text-base font-medium text-muted-foreground">Reading</h3>
                  <p>
                    This section assesses your comprehension of written English, including academic and general texts.
                  </p>
                  <p className="mt-2">
                    The Reading section lasts for 60 minutes and includes three reading passages with a variety of question types, such as multiple-choice, matching, and summary completion. The texts are taken from books, journals, magazines, and newspapers.
                  </p>
                </section>
                <section id="writing">
                  <h3 className="text-base font-medium text-muted-foreground">Writing</h3>
                  <p>
                    This section evaluates your ability to write in English, including tasks such as describing data and
                    writing an essay.
                  </p>
                  <p className="mt-2">
                    The Writing section also lasts for 60 minutes and consists of two tasks. Task 1 requires you to describe visual information (e.g., a graph, chart, or diagram) in your own words. Task 2 requires you to respond to a point of view, argument, or problem with a well-structured essay.
                  </p>
                </section>
                <section id="speaking">
                  <h3 className="text-base font-medium text-muted-foreground">Speaking</h3>
                  <p>This section tests your ability to communicate in English through a face-to-face interview.</p>
                  <p className="mt-2">
                    The Speaking section lasts for 11-14 minutes and is conducted with a certified examiner. It consists of three parts: an introduction and interview, a long turn where you speak for 1-2 minutes on a given topic, and a two-way discussion based on the topic in Part 2.
                  </p>
                </section>
              </div>
            </section>
            <section id="scoring-system">
              <h2 className="text-xl font-bold">Scoring System</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                The IELTS test is scored on a scale of 1 to 9, with 1 representing the lowest level of proficiency and 9
                representing the highest. Your overall band score is the average of your scores in the four sections.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Each band score corresponds to a level of English proficiency:
                <ul className="mt-2 ml-4 list-disc text-muted-foreground">
                  <li><strong>Band 9:</strong> Expert user</li>
                  <li><strong>Band 8:</strong> Very good user</li>
                  <li><strong>Band 7:</strong> Good user</li>
                  <li><strong>Band 6:</strong> Competent user</li>
                  <li><strong>Band 5:</strong> Modest user</li>
                  <li><strong>Band 4:</strong> Limited user</li>
                  <li><strong>Band 3:</strong> Extremely limited user</li>
                  <li><strong>Band 2:</strong> Intermittent user</li>
                  <li><strong>Band 1:</strong> Non-user</li>
                  <li><strong>Band 0:</strong> Did not attempt the test</li>
                </ul>
              </p>
            </section>
            <section id="test-preparation">
              <h2 className="text-xl font-bold">Test Preparation</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                To prepare for the IELTS test, it is recommended to practice the different sections, familiarize
                yourself with the test format, and work on improving your English language skills in areas such as
                vocabulary, grammar, and pronunciation.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                There are numerous resources available for IELTS preparation, including:
                <ul className="mt-2 ml-4 list-disc text-muted-foreground">
                  <li>Official IELTS practice materials and sample tests</li>
                  <li>Online courses and tutorials</li>
                  <li>IELTS preparation books and guides</li>
                  <li>Language learning apps and websites</li>
                  <li>Practice with native English speakers</li>
                </ul>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                It's also beneficial to join study groups or find a study partner to practice speaking and exchange feedback.
              </p>
            </section>
            <section id="test-dates-and-locations">
              <h2 className="text-xl font-bold">Test Dates and Locations</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                IELTS tests are offered multiple times throughout the year at various locations around the world. You
                can check the available test dates and locations on the official IELTS website.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                It's important to book your test well in advance, as test centers can fill up quickly, especially during peak times. Make sure to have all necessary identification documents ready and familiarize yourself with the test center location and procedures before the test day.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                For more information, visit the official IELTS website or contact your nearest test center.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

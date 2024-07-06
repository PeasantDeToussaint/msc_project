import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';

function BookOpenIcon(props) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function PencilIcon(props) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function HeadphonesIcon(props) {
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
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function MicIcon(props) {
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
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

export default function Homepage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-primary to-primary-foreground py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Everything you need to prepare for the IELTS. Completely Free.
          </h1>
          <p className="mt-4 text-lg text-white/80 md:text-xl">
          Learn IELTs using personalized practice tests and quizes that adjusts accoridng to your skills. Get accurate scoring on your writing and listening responses using our AI system.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="#"
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-muted hover:text-muted-foreground focus:bg-muted focus:text-muted-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Take an Introductory Test
            </Link>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold md:text-4xl">Improve Your Scores With AI Help</h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">

          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="#"
              className="group flex flex-col items-start rounded-md bg-white p-6 shadow-sm transition-colors hover:bg-muted"
            >
              <BookOpenIcon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-medium">Reading</h3>
              <p className="mt-2 text-muted-foreground">Practice reading questions that most likely cover your weaknesses </p>
            </Link>
            <Link
              to="#"
              className="group flex flex-col items-start rounded-md bg-white p-6 shadow-sm transition-colors hover:bg-muted"
            >
              <PencilIcon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-medium">Writing</h3>
              <p className="mt-2 text-muted-foreground">Get immediate scoring and verbal feedbacks on where to improve</p>
            </Link>
            <Link
              to="#"
              className="group flex flex-col items-start rounded-md bg-white p-6 shadow-sm transition-colors hover:bg-muted"
            >
              <HeadphonesIcon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-medium">Listening</h3>
              <p className="mt-2 text-muted-foreground">Follow our spaced repetition schedules to practice questions you missed</p>
            </Link>
            <Link
              to="#"
              className="group flex flex-col items-start rounded-md bg-white p-6 shadow-sm transition-colors hover:bg-muted"
            >
              <MicIcon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-medium">Speaking</h3>
              <p className="mt-2 text-muted-foreground">Get feedback on your speaking band scores and practice smartly</p>
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-muted py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold md:text-4xl">Full-length IELTS Practice Tests</h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Simulate the real IELTS exam experience with our comprehensive full-length practice tests.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Card>
              <CardContent className="flex flex-col items-start gap-4">
                <BookOpenIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-medium">IELTS Academic</h3>
                <p className="text-muted-foreground">Prepare for the academic version of the IELTS exam.</p>
                <Link
                  to="#"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:bg-primary/90 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Start Simulation
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-start gap-4">
                <BookOpenIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-medium">IELTS General</h3>
                <p className="text-muted-foreground">Prepare for the general version of the IELTS exam.</p>
                <Link
                  to="#"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:bg-primary/90 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Start Simulation
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold md:text-4xl">All the Study Resources You Need At Once.</h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Vocabulary, Grammar, Texts, Audios. We have you coverred.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-start gap-4">
                <BookOpenIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-medium">IELTS Vocabulary</h3>
                <p className="text-muted-foreground">Expand your vocabulary and master key IELTS terms.</p>
                <Link
                  to="#"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:bg-primary/90 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Explore
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-start gap-4">
                <BookOpenIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-medium">IELTS Grammar</h3>
                <p className="text-muted-foreground">Strengthen your grammar skills for the IELTS exam.</p>
                <Link
                  to="#"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:bg-primary/90 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Explore
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-start gap-4">
                <BookOpenIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-medium">IELTS Tips &amp; Strategies</h3>
                <p className="text-muted-foreground">Learn effective strategies to ace the IELTS exam.</p>
                <Link
                  to="#"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:bg-primary/90 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Explore
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

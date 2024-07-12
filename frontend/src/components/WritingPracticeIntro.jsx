import React from 'react';
import { Link } from 'react-router-dom';

export default function Component() {
  return (
    <main className="w-full">
      <section className="container py-8 md:py-16 lg:py-24">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Writing Practice</h2>
            <p className="text-muted-foreground md:text-base/relaxed mt-4">
              IELTS Writing Test lasts for 60 minutes, and you will need to complete two writing tasks, each of which requires different text types (description, report, discussion, etc).
            </p>
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 h-[80vh] gap-0">
          <Link
            to="/WritingPracticeTask1Intro"
            className="flex flex-col items-center justify-center bg-black text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50 p-8"
          >
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold">Practice Task 1</h2>
              <p className="text-muted-foreground md:text-base/relaxed mt-4">
              Write a report summarizing, describing, or explaining visual information (graphs, charts, tables, etc.) in at least 150 words.
            </p>
            </div>
          </Link>
          <Link
            to="/WritingPracticeTask2Intro"
            className="flex flex-col items-center justify-center bg-white text-black transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50 p-8"
          >
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold">Practice Task 2</h2>
              <p className="text-muted-foreground md:text-base/relaxed mt-4">
              Write an essay responding to a point of view, argument, or problem in at least 250 words.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}

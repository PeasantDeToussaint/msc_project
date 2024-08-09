import React from "react";
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@shadcn/ui";

export default function Component() {
    const [feedback, setFeedback] = useState(null);

    useEffect(() =>
    {
        fetch('/essay/processEssay')
    })
  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center bg-background text-foreground">
      <div className="container max-w-3xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">IELTS Essay Feedback</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Detailed feedback on your IELTS essay performance.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Task Achievement</h2>
                  <div className="rounded-full bg-muted px-4 py-2 text-xl font-bold">7.5</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your essay effectively addresses the task, with a clear position that is well-supported throughout.
                  You demonstrate a good understanding of the prompt and provide relevant and well-developed ideas to
                  support your argument. Your essay meets the requirements of the task and shows a strong command of the
                  topic.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Coherence and Cohesion</h2>
                  <div className="rounded-full bg-muted px-4 py-2 text-xl font-bold">6.5</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your essay is generally well-organized, with a clear introduction, body, and conclusion. You use a
                  range of cohesive devices, such as transition words and phrases, to connect your ideas and guide the
                  reader through your argument. However, there are a few instances where the flow of your essay could be
                  improved, and your use of cohesive devices could be more varied.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Lexical Resource</h2>
                  <div className="rounded-full bg-muted px-4 py-2 text-xl font-bold">7.0</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your essay demonstrates a good range of vocabulary, with appropriate word choice and a variety of
                  lexical items. You use some less common words and phrases effectively, and your vocabulary is
                  generally accurate and precise. However, there are a few instances where your word choice could be
                  more appropriate or where you could use a more varied vocabulary to express your ideas.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Grammatical Range and Accuracy</h2>
                  <div className="rounded-full bg-muted px-4 py-2 text-xl font-bold">6.5</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your essay demonstrates a good range of grammatical structures, with a variety of sentence types and
                  complex constructions. Your grammar is generally accurate, with only a few minor errors that do not
                  significantly impact the overall meaning of your essay. However, there are a few instances where your
                  grammar could be more accurate or where you could use a more varied range of grammatical structures to
                  express your ideas.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Overall Score</h2>
                <div className="rounded-full bg-muted px-4 py-2 text-xl font-bold">7.0</div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center gap-4">
            <Button variant="primary" className="h-10 px-8 text-sm font-medium shadow">
              Re-attempt
            </Button>
            <Button variant="outline" className="h-10 px-8 text-sm font-medium shadow-sm">
              Return
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

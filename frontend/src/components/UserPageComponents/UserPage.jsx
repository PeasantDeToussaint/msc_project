import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UserPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-3 md:px-4">
      <div className="grid md:grid-cols-[1fr_250px] gap-8">
        <div className="grid gap-6">
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">Your IELTS Practice</div> {/* Increased to text-xl */}
              <Button variant="outline" size="sm" className="text-sm"> {/* Increased to text-sm */}
                View All
              </Button>
            </div>
            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Practice History</CardTitle> {/* Increased to text-base */}
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      numberOfMonths={1}
                      className="p-0 [&_td]:w-8 [&_td]:h-8 [&_th]:w-8 [&_[name=day]]:w-8 [&_[name=day]]:h-8 [&>div]:space-x-0 [&>div]:gap-4"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Overall Performance</CardTitle> {/* Increased to text-base */}
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {['Listening', 'Reading', 'Writing', 'Speaking'].map((skill, index) => (
                        <div key={skill}>
                          <div className="flex items-center justify-between text-sm mb-1"> {/* Increased to text-sm */}
                            <div>{skill}</div>
                            <div className="font-semibold">{[7.5, 6.5, 7.0, 7.0][index]}</div>
                          </div>
                          <Progress value={[75, 65, 70, 70][index]} className="h-1" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <LexicalResource />
            </div>
          </div>
          <div className="grid gap-3">
            <div className="text-xl font-bold">Past Essays</div> {/* Increased to text-xl */}
            <div className="grid gap-4">
              {['Essay 1', 'Essay 2'].map((essay, index) => (
                <Card key={essay}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{essay}</CardTitle> {/* Increased to text-base */}
                    <CardDescription className="text-sm"> {/* Increased to text-sm */}
                      Topic: {index === 0 ? 'Describe your dream job' : 'The importance of education'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose text-sm"> {/* Increased to text-sm */}
                      <p>
                        {index === 0
                          ? 'My dream job would be to work as a software engineer at a leading technology company...'
                          : 'Education is a fundamental aspect of human development and plays a crucial role...'}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center justify-between w-full">
                      <div className="font-semibold text-sm">Score: {index === 0 ? '7.5' : '8.0'}</div> {/* Increased to text-sm */}
                      <Button variant="ghost" size="sm">
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Your Profile</CardTitle> {/* Increased to text-base */}
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <div className="font-semibold text-base">John Doe</div> {/* Increased to text-base */}
                  <div className="text-muted-foreground text-sm">john@example.com</div> {/* Increased to text-sm */}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <div className="text-muted-foreground text-sm"> {/* Increased to text-sm */}
                  Tasks Completed: <span className="font-semibold">25</span>
                </div>
                <Button variant="ghost" size="sm">
                  <FilePenIcon className="w-4 h-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Upcoming Tests</CardTitle> {/* Increased to text-base */}
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {['IELTS General', 'IELTS Academic'].map((test, index) => (
                  <div key={test} className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
                    <div className="font-semibold text-sm">{test}</div> {/* Increased to text-sm */}
                    <div className="text-muted-foreground text-sm"> {/* Increased to text-sm */}
                      Test Date: <span className="font-semibold">{index === 0 ? 'Aug 15, 2023' : 'Oct 10, 2023'}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <CalendarDaysIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function LexicalResource() {
  const lexicalData = [
    { label: 'Most Used Words', value: 'the, be, to, and, a, in, that, have, I, it, for, not, on, with, he, as, you, do, at, this, but, his, by, from' },
    { label: 'Unique Words', value: '1,234' },
    { label: 'Total Words', value: '5,678' },
    { label: 'Lexical Density', value: '21.7%' },
    { label: 'Type-Token Ratio (TTR)', value: '0.54' },
    { label: 'Synonym Usage', value: '15% of sentences contain synonyms' },
    { label: 'Advanced Vocabulary', value: '78 words' },
    { label: 'Spelling Accuracy', value: '95%' },
    { label: 'Common Misspellings', value: 'occurance (occurrence), seperate (separate)' },
    { label: 'Repeated Words', value: 'important (12 times), necessary (8 times)' },
    { label: 'Rare Word Usage', value: 'philanthropy, juxtaposition, paradigm' },
    { label: 'Suggested Words to Learn', value: 'catalyst, nuance, empirical, mitigate' },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Lexical Resource</CardTitle> {/* Increased to text-base */}
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {lexicalData.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <div className="text-sm">{label}</div> {/* Increased to text-sm */}
              <div className="font-semibold text-sm">{value}</div> {/* Increased to text-sm */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Icon components remain the same
function CalendarDaysIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function EyeIcon(props) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CartesianGrid, XAxis, Line, LineChart } from "recharts";
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart";

export default function UserPage() {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6">
      <div className="grid md:grid-cols-[1fr_300px] gap-12">
        <div className="grid gap-8">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">Your IELTS Practice</div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Practice History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      numberOfMonths={1}
                      className="p-0 [&_td]:w-10 [&_td]:h-10 [&_th]:w-10 [&_[name=day]]:w-10 [&_[name=day]]:h-10 [&>div]:space-x-0 [&>div]:gap-6"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div>Listening</div>
                        <div className="font-semibold">7.5</div>
                      </div>
                      <Progress value={75} />
                      <div className="flex items-center justify-between">
                        <div>Reading</div>
                        <div className="font-semibold">6.5</div>
                      </div>
                      <Progress value={65} />
                      <div className="flex items-center justify-between">
                        <div>Writing</div>
                        <div className="font-semibold">7.0</div>
                      </div>
                      <Progress value={70} />
                      <div className="flex items-center justify-between">
                        <div>Speaking</div>
                        <div className="font-semibold">7.0</div>
                      </div>
                      <Progress value={70} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <LexicalResource />
              <Card>
                <CardHeader>
                  <CardTitle>Score Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <LinechartChart className="aspect-[16/9]" />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="text-2xl font-bold">Past Essays</div>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Essay 1</CardTitle>
                  <CardDescription>Topic: Describe your dream job</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose">
                    <p>
                      My dream job would be to work as a software engineer at a leading technology company. I have
                      always been fascinated by technology and the way it can be used to solve complex problems and
                      improve people's lives.
                    </p>
                    <p>
                      As a software engineer, I would have the opportunity to work on cutting-edge projects, collaborate
                      with talented teams, and constantly learn new skills. I would enjoy the challenge of breaking down
                      complex problems, designing elegant solutions, and seeing my work come to life in the form of
                      functional and user-friendly applications.
                    </p>
                    <p>
                      Beyond the technical aspects, I am also drawn to the fast-paced and innovative culture of the tech
                      industry. I thrive in environments where creativity, problem-solving, and continuous improvement
                      are valued. I believe that my analytical mind, attention to detail, and passion for technology
                      would make me a valuable asset to any software engineering team.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Score: 7.5</div>
                    <Button variant="ghost" size="icon">
                      <EyeIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Essay 2</CardTitle>
                  <CardDescription>Topic: The importance of education</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose">
                    <p>
                      Education is a fundamental aspect of human development and plays a crucial role in shaping the
                      future of individuals and societies. It is the key to unlocking one's full potential, fostering
                      personal growth, and creating a more equitable and prosperous world.
                    </p>
                    <p>
                      At its core, education provides individuals with the knowledge, skills, and critical thinking
                      abilities necessary to navigate the complexities of the modern world. It empowers people to make
                      informed decisions, solve problems, and adapt to the ever-changing landscape of our society.
                    </p>
                    <p>
                      Beyond the personal benefits, education also has a profound impact on the broader community.
                      Educated individuals are more likely to contribute to the economic and social development of their
                      communities, through their participation in the workforce, civic engagement, and the promotion of
                      sustainable practices.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Score: 8.0</div>
                    <Button variant="ghost" size="icon">
                      <EyeIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-semibold">John Doe</div>
                  <div className="text-muted-foreground">john@example.com</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">
                  Tasks Completed: <span className="font-semibold">25</span>
                </div>
                <Button variant="ghost" size="icon">
                  <FilePenIcon className="w-5 h-5" />
                </Button>
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <div className="font-semibold">IELTS General</div>
                  <div className="text-muted-foreground">
                    Test Date: <span className="font-semibold">Aug 15, 2023</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <CalendarDaysIcon className="w-5 h-5" />
                  </Button>
                </div>
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <div className="font-semibold">IELTS Academic</div>
                  <div className="text-muted-foreground">
                    Test Date: <span className="font-semibold">Oct 10, 2023</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <CalendarDaysIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function LexicalResource() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lexical Resource</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {/* Most Used Words */}
          <div className="flex items-center justify-between">
            <div>Most Used Words</div>
            <div className="font-semibold">
              the, be, to, and, a, in, that, have, I, it, for, not, on, with, he, as, you, do, at, this, but, his, by, from
            </div>
          </div>

          {/* Unique Words */}
          <div className="flex items-center justify-between">
            <div>Unique Words</div>
            <div className="font-semibold">1,234</div>
          </div>

          {/* Total Words */}
          <div className="flex items-center justify-between">
            <div>Total Words</div>
            <div className="font-semibold">5,678</div>
          </div>

          {/* Lexical Density */}
          <div className="flex items-center justify-between">
            <div>Lexical Density</div>
            <div className="font-semibold">21.7%</div>
          </div>

          {/* Type-Token Ratio (TTR) */}
          <div className="flex items-center justify-between">
            <div>Type-Token Ratio (TTR)</div>
            <div className="font-semibold">0.54</div>
          </div>

          {/* Synonym Usage */}
          <div className="flex items-center justify-between">
            <div>Synonym Usage</div>
            <div className="font-semibold">15% of sentences contain synonyms</div>
          </div>

          {/* Advanced Vocabulary */}
          <div className="flex items-center justify-between">
            <div>Advanced Vocabulary</div>
            <div className="font-semibold">78 words</div>
          </div>

          {/* Spelling Accuracy */}
          <div className="flex items-center justify-between">
            <div>Spelling Accuracy</div>
            <div className="font-semibold">95%</div>
          </div>

          {/* Common Misspellings */}
          <div className="flex items-center justify-between">
            <div>Common Misspellings</div>
            <div className="font-semibold">occurance (occurrence), seperate (separate)</div>
          </div>

          {/* Repeated Words */}
          <div className="flex items-center justify-between">
            <div>Repeated Words</div>
            <div className="font-semibold">important (12 times), necessary (8 times)</div>
          </div>

          {/* Rare Word Usage */}
          <div className="flex items-center justify-between">
            <div>Rare Word Usage</div>
            <div className="font-semibold">philanthropy, juxtaposition, paradigm</div>
          </div>

          {/* Suggested Words to Learn */}
          <div className="flex items-center justify-between">
            <div>Suggested Words to Learn</div>
            <div className="font-semibold">catalyst, nuance, empirical, mitigate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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

function LinechartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

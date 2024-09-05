import React, { useState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useDropzone } from 'react-dropzone'
import { Edit3, Mic, Headphones, Plus, Trash2, Image as ImageIcon, Search } from 'lucide-react'

const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.ALLOCATED_PORT}`;


const endpoints = {
  writingTask1: `${BASE_URL}/writingTask1Questions/prompts`,
  writingTask2: `${BASE_URL}/writingTask2Questions/prompts`,
  speaking: `${BASE_URL}/speakingQuestions/prompts`,
}

const writingTask2Categories = [
  'Public Transport', 'Employment', 'Youth Crime', 'Celebrity', 'Society',
  'Government Spending', 'Development', 'Globalisation', 'Criminal Justice',
  'Technology', 'Environment', 'Education', 'Health'
]

const speakingGenres = [
  'Education', 'Holiday', 'Furniture', 'Products', 'Sports', 'Social Problems',
  'Change', 'Entertainment', 'Events', 'TV', 'Parenting', 'Exciting Experience',
  'Timing', 'Technology', 'Apologising', 'Party', 'Eating habits',
  'Newspaper And Magazine', 'Clothes, Fashion & Photos', 'Movies', 'Job',
  'Major', 'Trees', 'Plans', 'Transport', 'Email', 'Family', 'Family & Housework',
  'Traditional Products', 'Lake/River', 'Text Message', 'Neighbours',
  'Gift & Noise', 'Volunteer Works', 'Public Transport', 'Dreams', 'Celebrity',
  'History', 'Work', 'Weather', 'Machine', 'Birthdays', 'Things',
  'Presents or Gifts', 'Help', 'Daily Routine', 'A Member of A Team', 'The Sea',
  'Gifts', 'Friends', 'Country', 'Lifestyle', 'Festival', 'Exercise',
  'Dictionaries', 'Language', 'Teacher', 'Mobile Phones', 'City',
  'Patience & Politeness', 'Health', 'Travel', 'Memories', 'Writing', 'Food',
  'Company', 'Something Difficult To Use', 'Mobile phone', 'Shopping', 'Money',
  'Musical Instruments', 'Music', 'Hobbies', 'Animals', 'Home', 'A Person You Know',
  'Rules', 'Outdoor Activities', 'Desired Change to Local Area', 'Restaurants',
  'High School', 'Advertisements', 'Mobile phones',
  'Time When Someone Apologised to You', 'Leisure activities',
  'Indoor Activities & Transportation', 'News', 'Late', 'Flowers', 'School',
  'Environment', 'Animal', 'Influence', 'Accommodation', 'Buildings', 'Vegetables',
  'Internet', 'Reading', 'Museums', 'Study', 'Computer', 'Colours', 'Bags & Boat',
  'Memory', 'Clothes', 'The internet', 'Personal', 'Business', 'Decision', 'Art',
  'Books', 'Art & Photography', 'Electronic Devices', 'Garden', 'Humour',
  'Something Difficult to Use', 'Science', 'Hometown', 'Seasons',
  'A Challenging Thing You Did'
]

export default function Component() {
  const { toast } = useToast()
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false)
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [section, setSection] = useState("writingTask1")
  const [subSection, setSubSection] = useState("1")
  const [imageFile, setImageFile] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    fetchQuestions()
  }, [section, subSection])

  useEffect(() => {
    const filtered = questions.filter(question => 
      question.question.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "all" || question.type === filterType || question.category === filterType || question.genre === filterType)
    )
    setFilteredQuestions(filtered)
  }, [questions, searchTerm, filterType])

  const fetchQuestions = async () => {
    try {
      let url = endpoints[section]
      if (section === 'speaking') {
        url += `?part=${subSection}`
      }
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setQuestions(data)
    } catch (error) {
      console.error('Failed to fetch questions:', error)
      toast({ title: `Error: ${error.message}`, variant: 'destructive' })
    }
  }

  const handleAddQuestion = async (question) => {
    try {
      const formData = new FormData()
      Object.keys(question).forEach(key => formData.append(key, question[key]))
      if (section === 'writingTask1' && imageFile) {
        formData.append('image', imageFile)
      }
      if (section === 'speaking') {
        formData.append('part_id', subSection)
      }
      const response = await fetch(endpoints[section], {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      fetchQuestions()
      toast({ title: 'Question added successfully' })
    } catch (error) {
      console.error('Failed to add question:', error)
      toast({ title: 'Failed to add question', variant: 'destructive' })
    }
  }

  const handleEditQuestion = async (id, updatedQuestion) => {
    try {
      const formData = new FormData()
      Object.keys(updatedQuestion).forEach(key => formData.append(key, updatedQuestion[key]))
      if (section === 'writingTask1' && imageFile) {
        formData.append('image', imageFile)
      }
      if (section === 'speaking') {
        formData.append('part_id', subSection)
      }
      const response = await fetch(`${endpoints[section]}/${id}`, {
        method: 'PUT',
        body: formData,
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      fetchQuestions()
      toast({ title: 'Question updated successfully' })
    } catch (error) {
      console.error('Failed to update question:', error)
      toast({ title: 'Failed to update question', variant: 'destructive' })
    }
  }

  const handleDeleteQuestion = async (id) => {
    try {
      const response = await fetch(`${endpoints[section]}/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      fetchQuestions()
      toast({ title: 'Question deleted successfully' })
    } catch (error) {
      console.error('Failed to delete question:', error)
      toast({ title: 'Failed to delete question', variant: 'destructive' })
    }
  }

  const onDrop = (acceptedFiles) => {
    setImageFile(acceptedFiles[0])
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
  })

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1 overflow-hidden">
      <aside className="w-64 bg-gray-80 p-4 overflow-y-auto flex-shrink-0">
          <nav className="space-y-2">
            <Button
              variant={section === 'writingTask1' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setSection('writingTask1')}
            >
              <Edit3 className="mr-2 h-5 w-5" />
              Writing Task 1
            </Button>
            <Button
              variant={section === 'writingTask2' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setSection('writingTask2')}
            >
              <Edit3 className="mr-2 h-5 w-5" />
              Writing Task 2
            </Button>
            <Button
              variant={section === 'speaking' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setSection('speaking')}
            >
              <Mic className="mr-2 h-5 w-5" />
              Speaking
            </Button>
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">{section.replace(/([A-Z])/g, ' $1').trim()} Questions</h2>
            <Button onClick={() => setShowAddQuestionModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Question
            </Button>
          </div>
          {section === 'speaking' && (
            <>
              <Tabs value={subSection} onValueChange={setSubSection} className="mb-6">
                <TabsList>
                  <TabsTrigger value="1">Part 1</TabsTrigger>
                  <TabsTrigger value="2">Part 2</TabsTrigger>
                  <TabsTrigger value="3">Part 3</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex mb-4 space-x-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search questions..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {speakingGenres.map(genre => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuestions
                  .filter(question => question.part_id === parseInt(subSection))
                  .map((question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      onEdit={() => setCurrentQuestion(question)}
                      onDelete={() => handleDeleteQuestion(question.id)}
                    />
                  ))}
              </div>
            </>
          )}
          {section !== 'speaking' && (
            <>
              <div className="flex mb-4 space-x-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search questions..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type or category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {section === 'writingTask1' && (
                      <>
                        <SelectItem value="line">Line Graph</SelectItem>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="pie">Pie Chart</SelectItem>
                        <SelectItem value="table">Table</SelectItem>
                        <SelectItem value="process">Process Diagram</SelectItem>
                        <SelectItem value="map">Map</SelectItem>
                        <SelectItem value="mixed">Mixed Chart</SelectItem>
                      </>
                    )}
                    {section === 'writingTask2' && writingTask2Categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuestions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onEdit={() => setCurrentQuestion(question)}
                    onDelete={() => handleDeleteQuestion(question.id)}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
      <AddEditQuestionDialog
        isOpen={showAddQuestionModal || !!currentQuestion}
        onClose={() => {
          setShowAddQuestionModal(false)
          setCurrentQuestion(null)
        }}
        onSave={(question) => {
          if (currentQuestion) {
            handleEditQuestion(currentQuestion.id, question)
          } else {
            handleAddQuestion(question)
          }
          setShowAddQuestionModal(false)
          setCurrentQuestion(null)
        }}
        question={currentQuestion}
        section={section}
        subSection={subSection}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        imageFile={imageFile}
      />
      <Toaster />
    </div>
  )
}

const QuestionCard = ({ question, onEdit, onDelete }) => (
  <Card className="hover:shadow-lg transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="flex justify-between items-center text-sm">
        <span className="truncate">{question.question.substring(0, 100)}...</span>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit3 className="h-4 w-4 text-blue-500" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-xs text-gray-500">
        {question.type ? `Type: ${question.type}` : 
         question.category ? `Category: ${question.category}` : 
         question.genre ? `Genre: ${question.genre}` : 
         question.part_id ? `Part: ${question.part_id}` : 'N/A'}
      </p>
      {question.image_url && (
        <div className="mt-2 relative h-32 w-full">
          <img src={`${API_BASE_URL}/uploads/${question.image_url}`} alt="Question" className="absolute inset-0 w-full h-full object-cover rounded" />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-white" />
          </div>
        </div>
      )}
    </CardContent>
  </Card>
)

const AddEditQuestionDialog = ({ isOpen, onClose, onSave, question, section, subSection, getRootProps, getInputProps, imageFile }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>{question ? 'Edit' : 'Add'} Question</DialogTitle>
        <DialogDescription>
          {question ? 'Edit the selected IELTS question.' : 'Create a new IELTS question.'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const questionData = Object.fromEntries(formData)
        onSave(questionData)
      }}>
        <div className="grid gap-4 py-4">
          {section === 'writingTask1' && (
            <div className="grid gap-2">
              <Label htmlFor="category">Chart Type</Label>
              <Select name="category" defaultValue={question?.category || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Select chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line Graph</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="table">Table</SelectItem>
                  <SelectItem value="process">Process Diagram</SelectItem>
                  <SelectItem value="map">Map</SelectItem>
                  <SelectItem value="mixed">Mixed Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {section === 'writingTask2' && (
            <div className="grid gap-2">
              <Label htmlFor="category">Question Category</Label>
              <Select name="category" defaultValue={question?.category || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Select question category" />
                </SelectTrigger>
                <SelectContent>
                  {writingTask2Categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {section === 'speaking' && (
            <div className="grid gap-2">
              <Label htmlFor="genre">Genre</Label>
              <Select name="genre" defaultValue={question?.genre || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {speakingGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="question">Question</Label>
            <Textarea id="question" name="question" defaultValue={question?.question} />
          </div>
          {['writingTask1', 'writingTask2', 'speaking'].includes(section) && (
            <div className="grid gap-2">
              <Label htmlFor="time_limit">Time Limit (minutes)</Label>
              <Input id="time_limit" name="time_limit" type="number" defaultValue={question?.time_limit} />
            </div>
          )}
          {section === 'writingTask1' && (
            <div className="grid gap-2">
              <Label>Upload Image</Label>
              <div {...getRootProps()} className="border-dashed border-2 border-gray-300 p-4 rounded-md hover:border-blue-500 transition-colors duration-300">
                <input {...getInputProps()} />
                <p className="text-center">Drop your image here or click to select one</p>
                <ImageIcon className="mx-auto mt-2 h-8 w-8 text-gray-400" />
              </div>
              {imageFile && <p className="text-sm text-muted-foreground">Selected file: {imageFile.name}</p>}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
)
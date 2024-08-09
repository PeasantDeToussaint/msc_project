import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../context/authContext';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useDropzone } from 'react-dropzone';

const API_BASE_URL = 'http://localhost:3000';

const endpoints = {
  writingTask1: `${API_BASE_URL}/writingTask1Questions/prompts`,
  writingTask2: `${API_BASE_URL}/writingTask2Questions/prompts`,
  speaking: `${API_BASE_URL}/speakingQuestions/prompts`,
};

export default function AdminComponent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const [showAddPromptModal, setShowAddPromptModal] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [tab, setTab] = useState("writingTask1");
  const [imageFile, setImageFile] = useState(null);
  const [chartType, setChartType] = useState('');

  useEffect(() => {
    fetchPrompts();
  }, [tab]);

  const fetchPrompts = async () => {
    let endpoint;
    if (tab === 'writingTask1') {
      endpoint = endpoints.writingTask1;
    } else if (tab === 'writingTask2') {
      endpoint = endpoints.writingTask2;
    } else if (tab.startsWith('speaking')) {
      endpoint = endpoints.speaking;
    }
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Not Found: The requested resource was not found.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPrompts(data);
    } catch (error) {
      console.error('Failed to fetch prompts:', error);
      toast({ title: `Error: ${error.message}`, variant: 'destructive' });
    }
  };

  const handleAddPrompt = async (prompt) => {
    let endpoint;
    if (tab === 'writingTask1') {
      endpoint = endpoints.writingTask1;
    } else if (tab === 'writingTask2') {
      endpoint = endpoints.writingTask2;
    } else if (tab.startsWith('speaking')) {
      endpoint = endpoints.speaking;
    }
    try {
      const formData = new FormData();
      formData.append('category', prompt.category);
      formData.append('question', prompt.question);
      formData.append('time_limit', prompt.time_limit);
      if (imageFile) {
        formData.append('image', imageFile);
      }
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchPrompts();
      toast({ title: 'Prompt added successfully' });
    } catch (error) {
      console.error('Failed to add prompt:', error);
      toast({ title: 'Failed to add prompt', variant: 'destructive' });
    }
  };

  const handleEditPrompt = async (id, updatedPrompt) => {
    let endpoint;
    if (tab === 'writingTask1') {
      endpoint = `${endpoints.writingTask1}/${id}`;
    } else if (tab === 'writingTask2') {
      endpoint = `${endpoints.writingTask2}/${id}`;
    } else if (tab.startsWith('speaking')) {
      endpoint = `${endpoints.speaking}/${id}`;
    }
    try {
      const formData = new FormData();
      formData.append('category', updatedPrompt.category);
      formData.append('question', updatedPrompt.question);
      formData.append('time_limit', updatedPrompt.time_limit);
      if (imageFile) {
        formData.append('image', imageFile);
      }
      const response = await fetch(endpoint, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchPrompts();
      toast({ title: 'Prompt updated successfully' });
    } catch (error) {
      console.error('Failed to update prompt:', error);
      toast({ title: 'Failed to update prompt', variant: 'destructive' });
    }
  };

  const handleDeletePrompt = async (id) => {
    let endpoint;
    if (tab === 'writingTask1') {
      endpoint = `${endpoints.writingTask1}/${id}`;
    } else if (tab === 'writingTask2') {
      endpoint = `${endpoints.writingTask2}/${id}`;
    } else if (tab.startsWith('speaking')) {
      endpoint = `${endpoints.speaking}/${id}`;
    }
    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchPrompts();
      toast({ title: 'Prompt deleted successfully' });
    } catch (error) {
      console.error('Failed to delete prompt:', error);
      toast({ title: 'Failed to delete prompt', variant: 'destructive' });
    }
  };

  const onDrop = (acceptedFiles) => {
    setImageFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
  });

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </header>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="writingTask1" onValueChange={(value) => setTab(value)}>
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="writingTask1">Writing Task 1</TabsTrigger>
                <TabsTrigger value="writingTask2">Writing Task 2</TabsTrigger>
                <TabsTrigger value="speaking1">Speaking Part 1</TabsTrigger>
                <TabsTrigger value="speaking2">Speaking Part 2</TabsTrigger>
                <TabsTrigger value="speaking3">Speaking Part 3</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="h-8 gap-1 text-sm" onClick={() => setShowAddPromptModal(true)}>
                  <div className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Add New Questions</span>
                </Button>
              </div>
            </div>
            <TabsContent value="writingTask1">
              <PromptTable prompts={prompts} onEdit={setCurrentPrompt} onDelete={handleDeletePrompt} showImageColumn />
            </TabsContent>
            <TabsContent value="writingTask2">
              <PromptTable prompts={prompts} onEdit={setCurrentPrompt} onDelete={handleDeletePrompt} />
            </TabsContent>
            <TabsContent value="speaking1">
              <PromptTable prompts={prompts.filter(prompt => prompt.part_id === 1)} onEdit={setCurrentPrompt} onDelete={handleDeletePrompt} />
            </TabsContent>
            <TabsContent value="speaking2">
              <PromptTable prompts={prompts.filter(prompt => prompt.part_id === 2)} onEdit={setCurrentPrompt} onDelete={handleDeletePrompt} />
            </TabsContent>
            <TabsContent value="speaking3">
              <PromptTable prompts={prompts.filter(prompt => prompt.part_id === 3)} onEdit={setCurrentPrompt} onDelete={handleDeletePrompt} />
            </TabsContent>
          </Tabs>
          {showAddPromptModal && (
            <Dialog open={showAddPromptModal} onOpenChange={setShowAddPromptModal}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Prompt</DialogTitle>
                  <DialogDescription>Create a new IELTS prompt.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {tab === 'writingTask1' ? (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Chart Type</Label>
                        <select id="category" value={chartType} onChange={(e) => setChartType(e.target.value)}>
                          <option value="">Select Chart Type</option>
                          <option value="line">Line Graph</option>
                          <option value="bar">Bar Chart</option>
                          <option value="pie">Pie Chart</option>
                          <option value="table">Table</option>
                          <option value="process">Process Diagram</option>
                          <option value="map">Map</option>
                          <option value="mixed">Mixed Chart</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="question">Question</Label>
                        <Textarea id="question" placeholder="Enter question" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="time_limit">Time Limit</Label>
                        <Input id="time_limit" placeholder="Enter time limit" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Upload Image</Label>
                        <div {...getRootProps({ className: 'dropzone' })} className="border-dashed border-2 border-gray-300 p-4 rounded-md">
                          <input {...getInputProps()} />
                          <p>Drop your image here or select one.</p>
                        </div>
                        {imageFile && <p>Selected file: {imageFile.name}</p>}
                      </div>
                    </>
                  ) : tab === 'writingTask2' ? (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="question">Question</Label>
                        <Textarea id="question" placeholder="Enter question" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="time_limit">Time Limit</Label>
                        <Input id="time_limit" placeholder="Enter time limit" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="part">Part</Label>
                        <Input id="part" placeholder="Enter part (1, 2, or 3)" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="question">Question</Label>
                        <Textarea id="question" placeholder="Enter question" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="time_limit">Time Limit</Label>
                        <Input id="time_limit" placeholder="Enter time limit" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="genre">Genre</Label>
                        <Input id="genre" placeholder="Enter genre" />
                      </div>
                    </>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" className="mr-2" onClick={() => setShowAddPromptModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      const newPrompt = tab === 'writingTask1'
                        ? {
                            category: document.getElementById('category').value,
                            question: document.getElementById('question').value,
                            time_limit: document.getElementById('time_limit').value,
                          }
                        : tab === 'writingTask2'
                        ? {
                            question: document.getElementById('question').value,
                            time_limit: document.getElementById('time_limit').value,
                          }
                        : {
                            part_id: document.getElementById('part').value,
                            question: document.getElementById('question').value,
                            time_limit: document.getElementById('time_limit').value,
                            genre: document.getElementById('genre').value,
                          };
                      handleAddPrompt(newPrompt);
                      setShowAddPromptModal(false);
                    }}
                  >
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {currentPrompt && (
            <Dialog open={Boolean(currentPrompt)} onOpenChange={() => setCurrentPrompt(null)}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Prompt</DialogTitle>
                  <DialogDescription>Edit the selected IELTS prompt.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {tab === 'writingTask1' ? (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-category">Chart Type</Label>
                        <select id="edit-category" value={chartType} onChange={(e) => setChartType(e.target.value)}>
                          <option value="line">Line Graph</option>
                          <option value="bar">Bar Chart</option>
                          <option value="pie">Pie Chart</option>
                          <option value="table">Table</option>
                          <option value="process">Process Diagram</option>
                          <option value="map">Map</option>
                          <option value="mixed">Mixed Chart</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-question">Question</Label>
                        <Textarea id="edit-question" defaultValue={currentPrompt.question} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-time_limit">Time Limit</Label>
                        <Input id="edit-time_limit" defaultValue={currentPrompt.time_limit} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Upload Image</Label>
                        <div {...getRootProps({ className: 'dropzone' })} className="border-dashed border-2 border-gray-300 p-4 rounded-md">
                          <input {...getInputProps()} />
                          <p>Drop or select new images.</p>
                        </div>
                        {imageFile && <p>Selected file: {imageFile.name}</p>}
                      </div>
                    </>
                  ) : tab === 'writingTask2' ? (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-question">Question</Label>
                        <Textarea id="edit-question" defaultValue={currentPrompt.question} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-time_limit">Time Limit</Label>
                        <Input id="edit-time_limit" defaultValue={currentPrompt.time_limit} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-part">Part</Label>
                        <Input id="edit-part" defaultValue={currentPrompt.part_id} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-question">Question</Label>
                        <Textarea id="edit-question" defaultValue={currentPrompt.question} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-time_limit">Time Limit</Label>
                        <Input id="edit-time_limit" defaultValue={currentPrompt.time_limit} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="edit-genre">Genre</Label>
                        <Input id="edit-genre" defaultValue={currentPrompt.genre} />
                      </div>
                    </>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" className="mr-2" onClick={() => setCurrentPrompt(null)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      const updatedPrompt = tab === 'writingTask1'
                        ? {
                            category: document.getElementById('edit-category').value,
                            question: document.getElementById('edit-question').value,
                            time_limit: document.getElementById('edit-time_limit').value,
                          }
                        : tab === 'writingTask2'
                        ? {
                            question: document.getElementById('edit-question').value,
                            time_limit: document.getElementById('edit-time_limit').value,
                          }
                        : {
                            part_id: document.getElementById('edit-part').value,
                            question: document.getElementById('edit-question').value,
                            time_limit: document.getElementById('edit-time_limit').value,
                            genre: document.getElementById('edit-genre').value,
                          };
                      handleEditPrompt(currentPrompt.id, updatedPrompt);
                      setCurrentPrompt(null);
                    }}
                  >
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
      <Toaster />
    </div>
  );
}

const PromptTable = ({ prompts, onEdit, onDelete, showImageColumn }) => (
  <Card>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prompt</TableHead>
            <TableHead>Category/Chart Type</TableHead>
            {showImageColumn && <TableHead>Image</TableHead>}
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prompts.map((prompt) => (
            <TableRow key={prompt.id}>
              <TableCell>{prompt.question}</TableCell>
              <TableCell>{prompt.category || prompt.genre}</TableCell>
              {showImageColumn && (
                <TableCell>
                  {prompt.image_url ? (
                    <img src={`http://localhost:3000/uploads/${prompt.image_url}`} alt="Prompt" className="w-20 h-20 object-cover" />) : 'No Image'}
                </TableCell>
              )}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(prompt)}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(prompt.id)}>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

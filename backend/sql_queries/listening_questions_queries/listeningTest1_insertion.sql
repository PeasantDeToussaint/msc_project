-- Insert audio recording data
INSERT INTO audio_recordings (id, title, file_path)
VALUES (1, 'Test1', 'backend/uploads/listening/audio_files/test1Audio.mp3');

-- Insert questions
INSERT INTO listening_questions (audio_recording_id, section, order_num, type, data)
VALUES
-- Questions 1-4 (Multiple Choice)
(1, 1, 1, 'multiple_choice', '{"question": "Where did Julie leave her car?", "options": ["in the underground parking lot", "in the outdoor parking lot", "opposite the university building", "near the Student Services office"], "correct_answer": "in the outdoor parking lot"}'),
(1, 1, 2, 'multiple_choice', '{"question": "What are the regulations for the underground parking area, level 1?", "options": ["Undergraduate parking is allowed.", "Postgraduate parking only is allowed.", "Staff parking only is allowed."], "correct_answer": "Staff parking only is allowed."}'),
(1, 1, 3, 'multiple_choice', '{"question": "If you don''t have a parking permit, what action will be taken?", "options": ["Your car will have a wheel clamped.", "You will pay a fine only.", "Your car will be towed away and you will pay a fine."], "correct_answer": "You will pay a fine only."}'),
(1, 1, 4, 'multiple_choice', '{"question": "How does Julie usually travel to university?", "options": ["by car", "by rail", "by bus"], "correct_answer": "by bus"}'),

-- Questions 5-10 (Form/Table/Flow-chart/Note/Summary Completion)
(1, 2, 5, 'form_table_flowchart_note_summary_completion', '{"question": "Name:", "correct_answer": "Julie Karas"}'),
(1, 2, 6, 'form_table_flowchart_note_summary_completion', '{"question": "Address:", "correct_answer": "15 Fremont Avenue"}'),
(1, 2, 7, 'form_table_flowchart_note_summary_completion', '{"question": "District:", "correct_answer": "Hawkesley"}'),
(1, 2, 8, 'form_table_flowchart_note_summary_completion', '{"question": "Faculty:", "correct_answer": "Science"}'),
(1, 2, 9, 'form_table_flowchart_note_summary_completion', '{"question": "Registration number:", "correct_answer": "IKE 614T"}'),
(1, 2, 10, 'form_table_flowchart_note_summary_completion', '{"question": "Make of car:", "correct_answer": "Fiat Panda"}'),

-- Questions 11-14 (Matching)
(1, 2, 11, 'matching', '{"question": "Biddlecombe Cascades", "options": ["a checkpoint but no toilets", "toilets but no checkpoint", "a checkpoint and toilets"], "correct_answer": "B"}'),
(1, 2, 12, 'matching', '{"question": "Crystal Falls", "options": ["a checkpoint but no toilets", "toilets but no checkpoint", "a checkpoint and toilets"], "correct_answer": "C"}'),
(1, 2, 13, 'matching', '{"question": "17 Mile Falls", "options": ["a checkpoint but no toilets", "toilets but no checkpoint", "a checkpoint and toilets"], "correct_answer": "C"}'),
(1, 2, 14, 'matching', '{"question": "Edith River Crossing", "options": ["a checkpoint but no toilets", "toilets but no checkpoint", "a checkpoint and toilets"], "correct_answer": "A"}'),

-- Questions 15-20 (Map/Plan/Diagram Labelling)
(1, 3, 15, 'map_plan_diagram_labelling', '{"question": "Biddlecombe Cascades", "correct_answer": "C"}'),
(1, 3, 16, 'map_plan_diagram_labelling', '{"question": "Crystal Fall viewpoint", "correct_answer": "E"}'),
(1, 3, 17, 'map_plan_diagram_labelling', '{"question": "The Amphitheatre", "correct_answer": "H"}'),
(1, 3, 18, 'map_plan_diagram_labelling', '{"question": "17 Mile Falls Creek", "correct_answer": "I"}'),
(1, 3, 19, 'map_plan_diagram_labelling', '{"question": "Sandy Camp Pool", "correct_answer": "D"}'),
(1, 3, 20, 'map_plan_diagram_labelling', '{"question": "Sweetwater Pool", "correct_answer": "F"}'),

-- Questions 21-25 (Matching)
(1, 3, 21, 'matching', '{"question": "It was very funny.", "options": ["Laura", "Jamie", "Denise"], "correct_answer": "C"}'),
(1, 3, 22, 'matching', '{"question": "Some people must have faced serious consequences.", "options": ["Laura", "Jamie", "Denise"], "correct_answer": "B"}'),
(1, 3, 23, 'matching', '{"question": "It caused embarrassment.", "options": ["Laura", "Jamie", "Denise"], "correct_answer": "A"}'),
(1, 3, 24, 'matching', '{"question": "It was a very immature thing to do.", "options": ["Laura", "Jamie", "Denise"], "correct_answer": "A"}'),
(1, 3, 25, 'matching', '{"question": "We are being punished for it.", "options": ["Laura", "Jamie", "Denise"], "correct_answer": "B"}'),

-- Questions 26-30 (Form/Table/Flow-chart/Note/Summary Completion)
(1, 4, 26, 'form_table_flowchart_note_summary_completion', '{"question": "Flow-chart item 26", "options": ["librarian", "professor", "RA", "laboratory technician", "safety officer", "student", "laboratory supervisor"], "correct_answer": "G"}'),
(1, 4, 27, 'form_table_flowchart_note_summary_completion', '{"question": "Flow-chart item 27", "options": ["librarian", "professor", "RA", "laboratory technician", "safety officer", "student", "laboratory supervisor"], "correct_answer": "B"}'),
(1, 4, 28, 'form_table_flowchart_note_summary_completion', '{"question": "Flow-chart item 28", "options": ["librarian", "professor", "RA", "laboratory technician", "safety officer", "student", "laboratory supervisor"], "correct_answer": "F"}'),
(1, 4, 29, 'form_table_flowchart_note_summary_completion', '{"question": "Flow-chart item 29", "options": ["librarian", "professor", "RA", "laboratory technician", "safety officer", "student", "laboratory supervisor"], "correct_answer": "C"}'),
(1, 4, 30, 'form_table_flowchart_note_summary_completion', '{"question": "Flow-chart item 30", "options": ["librarian", "professor", "RA", "laboratory technician", "safety officer", "student", "laboratory supervisor"], "correct_answer": "D"}'),

-- Questions 31-36 (Map/Plan/Diagram Labelling)
(1, 4, 31, 'map_plan_diagram_labelling', '{"question": "Map label 31", "options": ["Atlantic rain forest", "Amazonian rain forest", "Brazilian forest", "Caatinga", "Cerrado", "Grassland", "Pantanal", "Pampas"], "correct_answer": "B"}'),
(1, 4, 32, 'map_plan_diagram_labelling', '{"question": "Map label 32", "options": ["Atlantic rain forest", "Amazonian rain forest", "Brazilian forest", "Caatinga", "Cerrado", "Grassland", "Pantanal", "Pampas"], "correct_answer": "A"}'),
(1, 4, 33, 'map_plan_diagram_labelling', '{"question": "Map label 33", "options": ["Atlantic rain forest", "Amazonian rain forest", "Brazilian forest", "Caatinga", "Cerrado", "Grassland", "Pantanal", "Pampas"], "correct_answer": "H"}'),
(1, 4, 34, 'map_plan_diagram_labelling', '{"question": "Map label 34", "options": ["Atlantic rain forest", "Amazonian rain forest", "Brazilian forest", "Caatinga", "Cerrado", "Grassland", "Pantanal", "Pampas"], "correct_answer": "G"}'),
(1, 4, 35, 'map_plan_diagram_labelling', '{"question": "Map label 35", "options": ["Atlantic rain forest", "Amazonian rain forest", "Brazilian forest", "Caatinga", "Cerrado", "Grassland", "Pantanal", "Pampas"], "correct_answer": "E"}'),
(1, 4, 36, 'map_plan_diagram_labelling', '{"question": "Map label 36", "options": ["Atlantic rain forest", "Amazonian rain forest", "Brazilian forest", "Caatinga", "Cerrado", "Grassland", "Pantanal", "Pampas"], "correct_answer": "D"}'),

-- Questions 37-40 (Form/Table/Flow-chart/Note/Summary Completion)
(1, 4, 37, 'form_table_flowchart_note_summary_completion', '{"question": "Cerrado - Cattle", "correct_answer": "72.3"}'),
(1, 4, 38, 'form_table_flowchart_note_summary_completion', '{"question": "Cerrado - Goats", "correct_answer": "8.1"}'),
(1, 4, 39, 'form_table_flowchart_note_summary_completion', '{"question": "Pantanal - Cattle", "correct_answer": "3"}'),
(1, 4, 40, 'form_table_flowchart_note_summary_completion', '{"question": "Pampas - Sheep", "correct_answer": "none"}');

-- Update image_path for map labelling questions
UPDATE listening_questions
SET image_path = 'backend/uploads/listening/question_images/test1A.png'
WHERE audio_recording_id = 1 AND section = 3 AND type = 'map_plan_diagram_labelling';

UPDATE listening_questions
SET image_path = 'backend/uploads/listening/question_images/test1A.png'
WHERE audio_recording_id = 1 AND section = 4 AND type = 'map_plan_diagram_labelling';
-- Insert audio recording data for Test 2
INSERT INTO audio_recordings (id, title, file_path)
VALUES (2, 'Test2', 'backend/uploads/listening/audio_files/test2Audio.mp3');

-- Insert questions for Test 2
INSERT INTO listening_questions (audio_recording_id, section, order_num, type, data)
VALUES
-- Questions 1-5 (Form/Table/Flow-chart/Note/Summary Completion)
(2, 1, 1, 'form_table_flowchart_note_summary_completion', '{"question": "A yearly membership costs £ ___ for alumni", "correct_answer": "240"}'),
(2, 1, 2, 'form_table_flowchart_note_summary_completion', '{"question": "Features offered include: the Emily Pankhurst ___", "correct_answer": "fitness center"}'),
(2, 1, 3, 'form_table_flowchart_note_summary_completion', '{"question": "Features offered include: the Dalton ___", "correct_answer": "swimming pool"}'),
(2, 1, 4, 'form_table_flowchart_note_summary_completion', '{"question": "Features offered include: personal ___ at an extra charge", "correct_answer": "trainers"}'),
(2, 1, 5, 'form_table_flowchart_note_summary_completion', '{"question": "Hours: 6 a.m. to ___ on weekends", "correct_answer": "midnight"}'),

-- Questions 6-10 (Form/Table/Flow-chart/Note/Summary Completion)
(2, 2, 6, 'form_table_flowchart_note_summary_completion', '{"question": "Customer name: Shannon ___", "correct_answer": "Fleet"}'),
(2, 2, 7, 'form_table_flowchart_note_summary_completion', '{"question": "Street Address:", "correct_answer": "24 Whitehal Close"}'),
(2, 2, 8, 'form_table_flowchart_note_summary_completion', '{"question": "Postcode:", "correct_answer": "NEO 1EN"}'),
(2, 2, 9, 'form_table_flowchart_note_summary_completion', '{"question": "Telephone number:", "correct_answer": "9765 484 493"}'),
(2, 2, 10, 'form_table_flowchart_note_summary_completion', '{"question": "Proof of address:", "correct_answer": "electricity bill"}'),

-- Questions 11-20 (Form/Table/Flow-chart/Note/Summary Completion)
(2, 2, 11, 'form_table_flowchart_note_summary_completion', '{"question": "To get a student visa you must make a folder of health information including: vaccination ___", "correct_answer": "records"}'),
(2, 2, 12, 'form_table_flowchart_note_summary_completion', '{"question": "To get a student visa you must make a folder of health information including: proof you don''t have a serious ___", "correct_answer": "contagious disease"}'),
(2, 2, 13, 'form_table_flowchart_note_summary_completion', '{"question": "Have a consultation with a doctor specialised in ___ to get information on:", "correct_answer": "travel medicine"}'),
(2, 2, 14, 'form_table_flowchart_note_summary_completion', '{"question": "___ for malaria", "correct_answer": "medication"}'),
(2, 2, 15, 'form_table_flowchart_note_summary_completion', '{"question": "what to expect if you have any existing ___", "correct_answer": "health issues"}'),
(2, 2, 16, 'form_table_flowchart_note_summary_completion', '{"question": "In each country, it is ___ in some areas but not others.", "correct_answer": "present"}'),
(2, 2, 17, 'form_table_flowchart_note_summary_completion', '{"question": "You must ___ and not travel to high-risk areas if you are not protected.", "correct_answer": "keep informed"}'),
(2, 2, 18, 'form_table_flowchart_note_summary_completion', '{"question": "To prevent insect bites: wear long-sleeved shirts and ___", "correct_answer": "lone trousers"}'),
(2, 2, 19, 'form_table_flowchart_note_summary_completion', '{"question": "use insect repellent on ___ and flying-insect spray in rooms", "correct_answer": "bare skin"}'),
(2, 2, 20, 'form_table_flowchart_note_summary_completion', '{"question": "stay indoors in the peak biting periods of ___ and dawn", "correct_answer": "dusk"}'),

-- Questions 21-23 (Matching)
(2, 3, 21, 'matching', '{"question": "Joshua", "options": ["They encourage students to work hard.", "Important changes have been made because of the forms.", "We could be judged because of what we write.", "It is alright to say that you don''t have an opinion.", "Probably no one reads them anyway.", "They are required; if we don''t do them we will get bad marks."], "correct_answer": "D"}'),
(2, 3, 22, 'matching', '{"question": "Ethan", "options": ["They encourage students to work hard.", "Important changes have been made because of the forms.", "We could be judged because of what we write.", "It is alright to say that you don''t have an opinion.", "Probably no one reads them anyway.", "They are required; if we don''t do them we will get bad marks."], "correct_answer": "E"}'),
(2, 3, 23, 'matching', '{"question": "Lily", "options": ["They encourage students to work hard.", "Important changes have been made because of the forms.", "We could be judged because of what we write.", "It is alright to say that you don''t have an opinion.", "Probably no one reads them anyway.", "They are required; if we don''t do them we will get bad marks."], "correct_answer": "B"}'),

-- Questions 24-30 (Form/Table/Flow-chart/Note/Summary Completion)
(2, 3, 24, 'form_table_flowchart_note_summary_completion', '{"question": "Lily''s Initial Suggested Rating", "correct_answer": "4"}'),
(2, 3, 25, 'form_table_flowchart_note_summary_completion', '{"question": "Joshua''s Initial Suggested Rating", "correct_answer": "5"}'),
(2, 3, 26, 'form_table_flowchart_note_summary_completion', '{"question": "Ethan''s Initial Suggested Rating", "correct_answer": "4.5"}'),
(2, 3, 27, 'form_table_flowchart_note_summary_completion', '{"question": "Joshua''s Good Points", "correct_answer": "well thought out"}'),
(2, 3, 28, 'form_table_flowchart_note_summary_completion', '{"question": "Ethan''s Good Points: choice between ___", "correct_answer": "two topics"}'),
(2, 3, 29, 'form_table_flowchart_note_summary_completion', '{"question": "Lily''s Bad Points: no practical point / choices were both ___", "correct_answer": "boring"}'),
(2, 3, 30, 'form_table_flowchart_note_summary_completion', '{"question": "Joshua''s Bad Points: should have given us ___", "correct_answer": "more time"}'),

-- Questions 31-40 (Form/Table/Flow-chart/Note/Summary Completion)
(2, 4, 31, 'form_table_flowchart_note_summary_completion', '{"question": "Stage 1: Market Introduction - Costs", "correct_answer": "very high"}'),
(2, 4, 32, 'form_table_flowchart_note_summary_completion', '{"question": "Stage 1: Market Introduction - Sales volumes", "correct_answer": "low"}'),
(2, 4, 33, 'form_table_flowchart_note_summary_completion', '{"question": "Stage 1: Market Introduction - Get the brand noticed by the ___", "correct_answer": "target market"}'),
(2, 4, 34, 'form_table_flowchart_note_summary_completion', '{"question": "Stage 1: Market Introduction - Encourage potential customers to ___", "correct_answer": "try the product"}'),
(2, 4, 35, 'form_table_flowchart_note_summary_completion', '{"question": "Stage 2: Growth - Economies ___ lead to reduced costs and rise in sales.", "correct_answer": "of scale"}'),
(2, 4, 36, 'form_table_flowchart_note_summary_completion', '{"question": "Stage 2: Growth - Find a way to ___ return customers.", "correct_answer": "reward"}'),
(2, 4, 37, 'form_table_flowchart_note_summary_completion', '{"question": "Stage 2: Growth - Differentiate the ___ from rival products.", "correct_answer": "brand"}'),
(2, 4, 38, 'form_table_flowchart_note_summary_completion', '{"question": "Stage 3: Maturity - Sales will ___", "correct_answer": "peak"}'),
(2, 4, 39, 'form_table_flowchart_note_summary_completion', '{"question": "Stage 3: Maturity - Competition will be ___", "correct_answer": "intense"}'),
(2, 4, 40, 'form_table_flowchart_note_summary_completion', '{"question": "Stage 3: Maturity - Find new ___ for the product.", "correct_answer": "applications"}');
CREATE TABLE audio_recordings(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL UNIQUE
);

CREATE TYPE listening_question_type AS ENUM (
  'multiple_choice',
  'matching',
  'map_plan_diagram_labelling',
  'form_table_flowchart_note_summary_completion',
  'sentence_completion',
  'short_answer'
);

CREATE TABLE listening_questions (
  id SERIAL PRIMARY KEY,
  audio_recording_id INTEGER REFERENCES audio_recordings(id) ON DELETE CASCADE,
  section INTEGER CHECK (section BETWEEN 1 AND 4),
  order_num INTEGER NOT NULL CHECK(order_num BETWEEN 1 AND 2),
  type listening_question_type NOT NULL,
  data JSONB NOT NULL,
  image_path VARCHAR(255)
);


CREATE TABLE listening_images (
    id SERIAL PRIMARY KEY,
    audio_recording_id INTEGER REFERENCES audio_recordings(id),
    section INTEGER NOT NULL,
    image_path TEXT NOT NULL
);


CREATE INDEX idx_listening_questions_audio ON listening_questions(audio_recording_id);
CREATE INDEX idx_listening_questions_section ON listening_questions(section);
CREATE INDEX idx_listening_questions_type ON listening_questions(type);
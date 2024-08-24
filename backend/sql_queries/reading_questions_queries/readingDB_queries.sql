CREATE TABLE reading_questions (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL, -- Type of question (e.g., 'Matching Features')
    title VARCHAR(255), -- Optional title or identifier
    paragraph TEXT NOT NULL, -- The reading passage associated with this question
    data JSONB NOT NULL, -- Stores subquestions, options, and correct answers
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

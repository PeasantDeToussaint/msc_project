CREATE TABLE essays (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    essay TEXT NOT NULL,
    overall_score DECIMAL(3, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE days (
    id SERIAL PRIMARY KEY,
    date_field DATE NOT NULL,
    description TEXT,
    value INTEGER CHECK (value >= 0 AND value <= 100)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    college_major TEXT,
    college_year TEXT,
    age TEXT,
    gender TEXT,
    hobbies TEXT,
    comfort_foods TEXT,
    music_taste TEXT
);

-- Table: daily_quotes
CREATE TABLE daily_quotes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    day_id INTEGER REFERENCES days(id),
    daily_quote TEXT
);

-- Table: wellness_scores
CREATE TABLE wellness_scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    day_id INTEGER REFERENCES days(id),
    wellness_score INTEGER CHECK (wellness_score >= 0 AND wellness_score <= 100)
);

CREATE TABLE reccomendation_categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(30)
);

CREATE TABLE recommendations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    day_id INTEGER REFERENCES days(id),
    category_id INTEGER REFERENCES categories(id),
    recommendation TEXT
);

CREATE TABLE wellness_categories (
    id SERIAL PRIMARY KEY,
    category_name TEXT
);

CREATE TABLE wellness_inputs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    day_id INTEGER REFERENCES days(id),
    category_id INTEGER REFERENCES wellness_categories(id),
    score INTEGER CHECK (score >= 1 AND score <= 5)
);

CREATE TABLE wellness_notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    day_id INTEGER REFERENCES days(id),
    note TEXT
);

CREATE TABLE journal_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    day_id INTEGER REFERENCES days(id),
    entry TEXT
);
DROP TABLE IF EXISTS searches CASCADE;
DROP TABLE IF EXISTS plants CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_digest VARCHAR(255) NOT NULL
);

-- CREATE TABLE plants (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   sci_name VARCHAR(255) NOT NULL,
--   common_names TEXT NOT NULL,
--   family VARCHAR(255) NOT NULL, 
--   non_toxic_dogs BOOLEAN NOT NULL, 
--   non_toxic_cats BOOLEAN NOT NULL, 
--   non_toxic_horses BOOLEAN NOT NULL, 
--   clinical_signs TEXT NOT NULL,
--   image_url VARCHAR(255) NOT NULL,
--   aspca_url VARCHAR(255) NOT NULL
-- );

CREATE TABLE IF NOT EXISTS plants (
    id SERIAL PRIMARY KEY NOT NULL,
    family VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    non_toxicity_cats BOOLEAN NOT NULL,
    non_toxicity_dogs BOOLEAN NOT NULL,
    non_toxicity_horses BOOLEAN NOT NULL,
    additional_common_names TEXT,
    clinical_signs TEXT,
    url VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

CREATE TABLE searches (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  plant_id INTEGER UNIQUE REFERENCES plants(id) ON DELETE CASCADE,
  common_names TEXT NOT NULL, 
  description TEXT NOT NULL, 
  url VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  edible TEXT NOT NULL, 
  date TIMESTAMP
);

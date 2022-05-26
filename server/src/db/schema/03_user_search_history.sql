DROP TABLE IF EXISTS user_search_history CASCADE;

CREATE TABLE user_search_history (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plant_id INTEGER REFERENCES plants(id) ON DELETE CASCADE,
  sci_name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  info_url VARCHAR(255) NOT NULL,
  user_img_url VARCHAR(255) NOT NULL,
  common_names TEXT NOT NULL,
  date TIMESTAMP NOT NULL
);

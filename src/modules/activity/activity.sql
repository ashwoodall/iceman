DROP TABLE IF EXISTS ohhi_activity CASCADE;
CREATE TABLE ohhi_activity(
  id             SERIAL PRIMARY KEY,
  activity_label VARCHAR(255) UNIQUE,
  message        TEXT
);

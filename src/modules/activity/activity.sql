DROP TABLE IF EXISTS ohhi_activity CASCADE;
CREATE TABLE ohhi_activity(
  id          SERIAL PRIMARY KEY,
  label       VARCHAR(255),
  message     TEXT
);
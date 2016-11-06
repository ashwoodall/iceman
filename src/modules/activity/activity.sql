DROP TABLE IF EXISTS ohhi_activity;
CREATE TABLE ohhi_activity(
  id          SERIAL PRIMARY KEY,
  label       VARCHAR(255),
  message     TEXT
);
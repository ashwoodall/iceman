DROP TABLE IF EXISTS ohhi_kids_age CASCADE;
CREATE TABLE ohhi_kids_age(
  id                   SERIAL PRIMARY KEY,
  kids_age_label       VARCHAR(255) UNIQUE
);

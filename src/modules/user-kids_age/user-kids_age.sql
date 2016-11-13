DROP TABLE IF EXISTS ohhi_user_kids_age CASCADE;
CREATE TABLE ohhi_user_kids_age(
  user_kids_age_id      SERIAL PRIMARY KEY,
  user_id               INTEGER REFERENCES ohhi_user (id),
  kids_age_id           INTEGER REFERENCES ohhi_kids_age (id)
);
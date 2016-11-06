DROP TABLE IF EXISTS ohhi_user-kids_age;
CREATE TABLE ohhi_user-kids_age(
  user_id      INTEGER REFERENCES ohhi_user (id),
  kids_age_id  INTEGER REFERENCES ohhi_kids_age (id)
);
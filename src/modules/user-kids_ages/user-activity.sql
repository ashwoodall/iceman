DROP TABLE IF EXISTS ohhi_user-kids_ages;
CREATE TABLE ohhi_user-kids_ages(
  user_id       INTEGER REFERENCES ohhi_user (id),
  kids_ages_id  INTEGER REFERENCES ohhi_kids_ages (id)
);
DROP TABLE IF EXISTS ohhi_user_kids_age CASCADE;
CREATE TABLE ohhi_user_kids_age(
  user_id                       INTEGER REFERENCES ohhi_user (id),
  kids_age_id                   INTEGER REFERENCES ohhi_kids_age (id),
  CONSTRAINT user_kids_age_pkey PRIMARY KEY (user_id, kids_age_id)
);
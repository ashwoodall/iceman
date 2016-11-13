DROP TABLE IF EXISTS ohhi_user_activity CASCADE;
CREATE TABLE ohhi_user_activity(
  user_id       INTEGER REFERENCES ohhi_user (id),
  activity_id   INTEGER REFERENCES ohhi_activity (id),
  CONSTRAINT user_activity_pkey PRIMARY KEY (user_id, activity_id)
);
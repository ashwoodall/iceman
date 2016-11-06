DROP TABLE IF EXISTS ohhi_user-activity;
CREATE TABLE ohhi_user-activity(
  user_id       INTEGER REFERENCES ohhi_user (id),
  activity_id   INTEGER REFERENCES ohhi_activity (id)
);
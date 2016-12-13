DROP TABLE IF EXISTS ohhi_conversation CASCADE;
CREATE TABLE ohhi_conversation(
  id               SERIAL PRIMARY KEY,
  initiator_id     INTEGER REFERENCES ohhi_user (id),
  recipient_id     INTEGER REFERENCES ohhi_user (id),
  is_deleted       BOOLEAN DEFAULT FALSE,
  timestamp        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
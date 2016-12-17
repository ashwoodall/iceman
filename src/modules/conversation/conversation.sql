DROP TABLE IF EXISTS ohhi_conversation CASCADE;
CREATE TABLE ohhi_conversation(
  id                      SERIAL PRIMARY KEY,
  initiator_id            INTEGER REFERENCES ohhi_user (id) NOT NULL,
  recipient_id            INTEGER REFERENCES ohhi_user (id) NOT NULL,
  is_deleted              BOOLEAN DEFAULT FALSE NOT NULL,
  last_message_snippet    TEXT,
  unread_by               INTEGER REFERENCES ohhi_user (id),
  created_at              TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at              TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
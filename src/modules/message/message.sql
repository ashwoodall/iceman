DROP TABLE IF EXISTS ohhi_message CASCADE;
CREATE TABLE ohhi_message(
  id            SERIAL PRIMARY KEY,
  author        INTEGER REFERENCES ohhi_user (id),
  convo_id      INTEGER REFERENCES ohhi_conversation (id),
  body          TEXT,
  isRead        BOOLEAN DEFAULT FALSE,
  is_deleted    BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

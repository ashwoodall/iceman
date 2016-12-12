DROP TABLE IF EXISTS ohhi_reference CASCADE;
CREATE TABLE ohhi_reference(
  id            SERIAL PRIMARY KEY,
  author_id     INTEGER REFERENCES ohhi_user (id),
  recipient_id  INTEGER REFERENCES ohhi_user (id),
  body          TEXT,
  is_deleted    BOOLEAN DEFAULT FALSE,
  is_published  BOOLEAN DEFAULT FALSE,
  timestamp     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


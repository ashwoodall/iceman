DROP TABLE IF EXISTS ohhi_reference CASCADE;
CREATE TABLE ohhi_reference(
  id            SERIAL PRIMARY KEY,
  author        INTEGER REFERENCES ohhi_user (id),
  subject       INTEGER REFERENCES ohhi_user (id),
  title         VARCHAR(255),
  body          TEXT,
  isDeleted     BOOLEAN DEFAULT FALSE,
  isPublished   BOOLEAN DEFAULT FALSE,
  timestamp     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
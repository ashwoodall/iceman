DROP TABLE IF EXISTS ohhi_user CASCADE;
DO $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'kid_status') THEN
        CREATE TYPE KID_STATUS AS ENUM ('noKids', 'expecting', 'hasKids');
END IF;
END$$;
CREATE TABLE ohhi_user(
  id                    SERIAL PRIMARY KEY,
  first_name            VARCHAR(100),
  last_name             VARCHAR(100),
  email                 VARCHAR(100) UNIQUE NOT NULL,
  password              VARCHAR(255) UNIQUE NOT NULL,
  birth_date            DATE,
  hometown              VARCHAR(100),
  profile_picture       VARCHAR(255),
  introduction          TEXT,
  has_kids              KID_STATUS,
  has_pets              BOOLEAN,
  number_of_kids        SMALLINT,
  about_pets            TEXT,
  is_service_member     BOOLEAN,
  is_registered         BOOLEAN NOT NULL DEFAULT FALSE,
  current_station       VARCHAR(255),
  prior_duty_stations   TEXT,
  facebook              VARCHAR(255),
  twitter               VARCHAR(255),
  instagram             VARCHAR(255),
  pinterest             VARCHAR(255)
);

--kids_age and activities should probably be separate tables that are linked to this table by foreign key
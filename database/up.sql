CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  uuid VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "lesson" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  user_uuid VARCHAR(255),
  video_url VARCHAR(255),
  FOREIGN KEY(user_uuid) REFERENCES "user"("uuid")
);
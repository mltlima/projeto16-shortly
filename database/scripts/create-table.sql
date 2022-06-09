CREATE TABLE "users"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL
);

CREATE TABLE "sessions"(
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES "users"("id") NOT NULL,
    "token" TEXT NOT NULL
);

CREATE TABLE "urls"(
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES "users"("id") NOT NULL,
    "url" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL
);
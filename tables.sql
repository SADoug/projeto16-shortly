 CREATE DATABASE "shortly";

CREATE TABLE "usuarios" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "ConfirmPassword" TEXT NOT NULL
);

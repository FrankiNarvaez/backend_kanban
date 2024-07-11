-- Instrucciones para crear tablas

-- Crear tabla de usuarios
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL, -- El campo debe ser de 50 caracteres o menos
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(120) NOT NULL,
    id_theme BOOLEAN NOT NULL DEFAULT FALSE
);

-- Crear tabla de categorías
CREATE TABLE section (
    section_id SERIAL PRIMARY KEY,
    section_name VARCHAR(50) NOT NULL, -- El campo debe ser de 50 caracteres o menos
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    index_section SERIAL  -- Referencia a la clave foranea en user_id
);

-- Crear tabla de descripciones
CREATE TABLE tasks (
    tasks_id SERIAL PRIMARY KEY,
    tasks_name VARCHAR(50) NOT NULL, -- El campo debe ser de 50 caracteres o menos
    tasks TEXT NOT NULL, -- TEXT permite crear guardar datos de datos de tamaño indefinido
    section_id INTEGER NOT NULL     ,
    FOREIGN KEY (section_id) REFERENCES section(section_id) ON DELETE CASCADE ON UPDATE CASCADE,
    index_task SERIAL -- Referencia a la clave foranea en section_id
);
-- Instrucciones para consultar datos en la base de datos

-- Consultar las sectiones de un usuario
SELECT section.section_id, section.section_name, users.user_name 
FROM section JOIN users ON section.user_id = users.user_id 
WHERE users.user_id = $1; -- Variar el usuario

-- Consultar las descripciones de una sesión
SELECT tasks.description_id, tasks.description, section.section_name
FROM tasks
JOIN section ON tasks.section_id = section.section_id
WHERE section.section_id = 1; -- Variar número de sesión
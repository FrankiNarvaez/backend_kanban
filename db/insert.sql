-- Insert data into the tables

-- Inster data into users table
INSERT INTO users (user_name, user_id) VALUES ('user1', 'user1@gmail.com', '123456');
INSERT INTO users (user_name, user_id) VALUES ('user2', 'user2@gmail.com', '123456');
INSERT INTO users (user_name, user_id) VALUES ('user3', 'user3@gmail.com', '123456');
INSERT INTO users (user_name, user_id) VALUES ('user4', 'user4@gmail.com', '123456');

-- Insert data into section table
INSERT INTO section (section_name, user_id) VALUES ('Section 1', 1);
INSERT INTO section (section_name, user_id) VALUES ('Section 2', 1);
INSERT INTO section (section_name, user_id) VALUES ('Section 3', 2);
INSERT INTO section (section_name, user_id) VALUES ('Section 4', 2);
INSERT INTO section (section_name, user_id) VALUES ('Section 5', 3);
INSERT INTO section (section_name, user_id) VALUES ('Section 6', 1);

-- Insert data into tasks table
INSERT INTO tasks (task_name, description, section_id) VALUES ('task 1', 'description 1', 1);
INSERT INTO tasks (task_name, description, section_id) VALUES ('task 2', 'description 1', 2);
INSERT INTO tasks (task_name, description, section_id) VALUES ('task 3', 'description 1', 3);
INSERT INTO tasks (task_name, description, section_id) VALUES ('task 4', 'description 1', 2);
INSERT INTO tasks (task_name, description, section_id) VALUES ('task 5', 'description 1', 1);
INSERT INTO tasks (task_name, description, section_id) VALUES ('task 6', 'description 1', 2);
INSERT INTO tasks (task_name, description, section_id) VALUES ('task 7', 'description 1', 2);
INSERT INTO tasks (task_name, description, section_id) VALUES ('task 8', 'description 1', 1);
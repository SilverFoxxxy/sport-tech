-- DDL

DROP SCHEMA IF EXISTS sport_app CASCADE;

CREATE SCHEMA sport_app;

DROP TABLE IF EXISTS sport_app.user CASCADE;
DROP TABLE IF EXISTS sport_app.result CASCADE;
DROP TABLE IF EXISTS sport_app.exercise CASCADE;
DROP TABLE IF EXISTS sport_app.sports_ground CASCADE;
DROP TABLE IF EXISTS sport_app.post CASCADE;
DROP TABLE IF EXISTS sport_app.sports_ground_x_equipment CASCADE;
DROP TABLE IF EXISTS sport_app.user_reaction CASCADE;
DROP TABLE IF EXISTS sport_app.sport_equipment CASCADE;
DROP TABLE IF EXISTS sport_app.tags CASCADE;

CREATE TABLE sport_app.user (
    user_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    email TEXT UNIQUE,
    verified BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE sport_app.result (
    result_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    volunteer_id INTEGER,
    exercise_id INTEGER,
    result DECIMAL,
    comment TEXT,
    result_dttm TIMESTAMP DEFAULT NOW()
);

-- ALTER TABLE sport_app.RESULT ADD COLUMN ;

CREATE TABLE sport_app.exercise (
    exercise_id SERIAL PRIMARY KEY,
    sport_equipment_id INTEGER,
    exercise_name TEXT NOT NULL
);

CREATE TABLE sport_app.sports_ground (
    sports_ground_id SERIAL PRIMARY KEY,
    coordinates_x DECIMAL NOT NULL,
    coordinates_y DECIMAL NOT NULL,
    description TEXT
);

CREATE TABLE sport_app.post (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    publication_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    verified BOOLEAN
);

CREATE TABLE sport_app.sports_ground_x_equipment (
    sports_ground_id INTEGER NOT NULL,
    sport_equipment_id INTEGER NOT NULL,
    UNIQUE (sports_ground_id, sport_equipment_id)
);

CREATE TABLE sport_app.user_reaction (
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    UNIQUE (user_id, post_id),
    reaction INTEGER NOT NULL
);

CREATE TABLE sport_app.sport_equipment (
    sport_equipment_id SERIAL PRIMARY KEY,
    sport_equipment_name TEXT NOT NULL
);

CREATE TABLE sport_app.tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name TEXT NOT NULL
);

-- Testing DDL
/*
UPDATE sport_app.USER
SET ROLE = 'admin'
WHERE username = 'admin';
*/

INSERT INTO sport_app.exercise(exercise_name)
VALUES
('Подтягивания'),
('Отжимания'),
('Пресс'),
('Приседания');

SELECT *
FROM sport_app.result;

SELECT * FROM sport_app.USER;

/*INSERT INTO sport_app.result(user_id, volunteer_id, RESULT, COMMENT, result_dttm)
VALUES
(2024-05-17 02:24:59.099),
(2024-05-17 02:24:59.099),
(2024-05-17 02:24:59.099);*/
/*
SELECT t1.user_id, username, exercise_id, result
FROM sport_app.USER AS t1
INNER JOIN
(SELECT distinct on (user_id, exercise_id) user_id, exercise_id, result
FROM sport_app.RESULT
ORDER BY user_id, exercise_id, result_dttm DESC) AS t2
ON t1.user_id = t2.user_id;

SELECT distinct on (user_id, exercise_id) user_id, exercise_id, result
FROM sport_app.RESULT
ORDER BY user_id, exercise_id, result_dttm DESC;

SELECT t1.user_id, username, exercise_id, result
FROM sport_app.USER AS t1 INNER JOIN
(SELECT distinct on (user_id, exercise_id) user_id, exercise_id, result
FROM sport_app.RESULT
ORDER BY user_id, exercise_id, result_dttm DESC) AS t2
ON t1.user_id = t2.user_id;

SELECT *
FROM sport_app.USER
JOIN sport_app.post
ON ;*/

INSERT INTO sport_app.post(user_id, title, CONTENT)
VALUES (2, 'Title', 'Content');

SELECT post_id, title, t1.content, t2.username, t1.user_id
FROM sport_app.post AS t1
INNER JOIN
sport_app.USER AS t2
ON t1.user_id = t2.user_id;

SELECT post_id, title, t1.content, t2.username, t1.user_id
FROM sport_app.post AS t1
INNER JOIN
sport_app.USER AS t2
ON t1.user_id = t2.user_id;

SELECT *
FROM sport_app.post;

INSERT INTO sport_app.post(user_id, title, CONTENT)
VALUES
(6, 'Стоит ли есть перед тренировкой', 'Да, стоит поесть перед тренировкой, так как это обеспечивает организм энергией для физической активности. Однако не стоит переедать, приём пищи должен быть сбалансированным и лёгким.'),
(7, 'Соревнование по подтягиваниям, Уфа, 15 июня', 'В Уфе можно провести соревнование по подтягиванию «Стальной хват». Участники будут соревноваться в трёх возрастных категориях: мужчины и женщины от 18 до 39 лет, мужчины и женщины от 40 до 59 лет и мужчины и женщины старше 60 лет. Соревнования могут проходить в разных форматах: подтягивания на максимальное количество раз, подтягивания на время или подтягивания с дополнительным весом.'),
(4, 'Комплекс упражнений на все группы мышц', 'Вот комплекс упражнений на все группы мышц:<br>1. Приседания: укрепляют мышцы ног и ягодиц.<br>2. Планка: укрепляет мышцы живота, рук и ног.<br>3. Укрепление мышц спины: лёжа на животе, прикоснитесь к ушам кончиками пальцев рук и поднимите верхнюю часть корпуса, удерживая ноги на полу.<br>4. Выпады назад: развивает координацию и равновесие.<br>5. Тяга Кинга: развивает мышцы ног и ягодиц.<br>6. Мост: укрепляет ягодицы.<br>7. Супермен: укрепляет мышцы живота, ягодиц и спины.');

DELETE FROM sport_app.post WHERE post_id = 9;

UPDATE sport_app.post
SET CONTENT = 'Вот комплекс упражнений на все группы мышц:<br>1. Приседания: укрепляют мышцы ног и ягодиц.<br>2. Планка: укрепляет мышцы живота, рук и ног.<br>3. Укрепление мышц спины: лёжа на животе, прикоснитесь к ушам кончиками пальцев рук и поднимите верхнюю часть корпуса, удерживая ноги на полу.<br>4. Выпады назад: развивает координацию и равновесие.<br>5. Тяга Кинга: развивает мышцы ног и ягодиц.<br>6. Мост: укрепляет ягодицы.<br>7. Супермен: укрепляет мышцы живота, ягодиц и спины.'


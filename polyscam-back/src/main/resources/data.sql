-- to insert only if table is empty
INSERT INTO role (name) SELECT 'ROLE_ADMIN' WHERE NOT EXISTS (SELECT * FROM role WHERE role.name='ROLE_ADMIN');
INSERT INTO role (name) SELECT 'ROLE_USER' WHERE NOT EXISTS (SELECT * FROM role WHERE role.name='ROLE_USER');

INSERT INTO users (username, password)
SELECT 'admin', '$2a$10$z9bksJ.os1MoRFPppfjIke17HbOBg1ALrhhghzfWHmFgQL6ix3VTq'
    WHERE NOT EXISTS (SELECT * FROM users WHERE users.username='admin');
INSERT INTO users (username, password)
SELECT 'ewan.allal@gmail.com', '$2a$10$4NunZgm/xY8MDrWSaHSuK./IsnTDJG05reZ8u2Z8ffDkS4hxgFosG'
    WHERE NOT EXISTS (SELECT * FROM users WHERE users.username='user');
INSERT INTO users (username, password)
SELECT 'corentin.germain@gmail.com', '$2a$10$jUuU3Os4.NRCYvtw9vy0d.MX9WIcsYDqdG0fAeoCvBBHFysD8ECNK'
    WHERE NOT EXISTS (SELECT * FROM users WHERE users.username='user');
INSERT INTO users (username, password)
SELECT 'theo.souchon@gmail.com', '$2a$10$7PRT/5l1Bm6ZakEvqWI1nu.nvr30jtvK92Xf5rpfN.Rp17vtU4bVq'
    WHERE NOT EXISTS (SELECT * FROM users WHERE users.username='user');

WITH allUser AS (
    SELECT ur.user_id, ur.roles_id
    FROM users_roles ur
             INNER JOIN users u ON u.id = ur.user_id
)
INSERT INTO users_roles (user_id, roles_id)
SELECT u.id, 1 FROM users u
WHERE u.username='admin'
  AND NOT EXISTS (SELECT * FROM allUser a WHERE a.user_id=u.id);

WITH allUser AS (
    SELECT ur.user_id, ur.roles_id
    FROM users_roles ur
             INNER JOIN users u ON u.id = ur.user_id
)
INSERT INTO users_roles (user_id, roles_id)
SELECT u.id, 2 FROM users u
WHERE u.username IN ('ewan.allal@gmail.com','corentin.germain@gmail.com','theo.souchon@gmail.com')
  AND NOT EXISTS (SELECT * FROM allUser a WHERE a.user_id=u.id);

INSERT INTO person(id, firstname, lastname, email)
VALUES
    (NEXTVAL('person_id_sequence'), 'Ewan', 'Allal','ewan.allal@gmail.com'),
    (NEXTVAL('person_id_sequence'), 'Corentin', 'Germain','corentin.germain@gmail.com'),
    (NEXTVAL('person_id_sequence'), 'Theo', 'Souchon','theo.souchon@gmail.com');

INSERT INTO announce (id, name, price, description, person_id)
SELECT
    NEXTVAL('announce_id_sequence'),
    a.name,
    a.price,
    a.description,
    p.id
FROM person p
CROSS JOIN (VALUES
                ('chaise',10,'en bois'),
                ('table',20,'en fer'))
AS a(name,price,description)
WHERE p.firstname = 'Ewan';

INSERT INTO announce (id, name, price, description, person_id)
SELECT
    NEXTVAL('announce_id_sequence'),
    a.name,
    a.price,
    a.description,
    p.id
FROM person p
         CROSS JOIN (VALUES
                         ('tasse',8,'tasse à l''effigie du RC Lens'),
                         ('babyfoot',60,'un peu penché sur la gauche'))
    AS a(name,price,description)
WHERE p.firstname = 'Corentin';

INSERT INTO announce (id, name, price, description, person_id)
SELECT
    NEXTVAL('announce_id_sequence'),
    a.name,
    a.price,
    a.description,
    p.id
FROM person p
         CROSS JOIN (VALUES
                         ('bequille',10,'pratique pour marcher'),
                         ('télé',3000,'pas chère'))
    AS a(name,price,description)
WHERE p.firstname = 'Theo';
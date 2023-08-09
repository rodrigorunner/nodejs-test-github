SELECT * FROM client_contact;

SELECT * FROM client ORDER BY client_id ASC;

SELECT * FROM client_address;

SELECT * FROM animal;

DELETE FROM client;

INSERT INTO client 
VALUES ('2', 'Leanne Graham'), 
('3', 'Ervin Howell'), 
('4', 'Clementine Bauch'), 
('5', 'Patricia Lebsack'), 
('6', 'Chelsey Dietrich');

INSERT INTO client_contact(client_email, client_whatsapp, client_id)
VALUES ('sincere@april.biz', '1-770-736-8031', '2'),
('shanna@melissa.tv', '010-692-6593', '3'),
('nathan@yesenia.net', '1-463-123-4447', '4'),
('julianne.OConner@kory.org', '493-170-9623', '5'),
('lucio_Hettinger@annie.ca', '(254)954-1289', '6');

INSERT INTO client_address(street, zipcode, city, client_id)
VALUES ('Rex Trail', '58804-1099', 'Howemouth', '2'),
('Kulas Light', '92998-3874', 'Gwenborough', '3'),
('Victor Plains', '90566-7771', 'Wisokyburgh', '4'),
('Douglas Extension', '59590-4157', 'McKenziehaven', '5'),
('Hoeger Mall', '53919-4257', 'South Elvis', '6');

ALTER TABLE animal
ALTER COLUMN animal_age TYPE NUMERIC;

INSERT INTO animal(animal_name, animal_age, animal_breed, animal_type, client_id)
VALUES ('Soldier', 1.8, 'Baltic', 'gato', '2'),
('Dog Ruff', 3.6, 'vira-lata', 'cachorro', '3'),
('Beaty', 1.3, 'Russian', 'gato', '4'),
('Bob', 7, 'Dude', 'cachorro', '5'),
('Bet', 1.6, 'Ukranian', 'gato','6');

SELECT c.client_name, cc.client_whatsapp, ca.street, ca.city, ca.zipcode 
FROM client_contact cc
INNER JOIN client c
ON cc.client_id = c.client_id
INNER JOIN client_address ca
ON ca.client_id = c.client_id

SELECT c.client_id, a.animal_name, a.animal_age, a.animal_breed, a.animal_type
FROM animal a
INNER JOIN client c
ON a.client_id = c.client_id
WHERE c.client_id = '1'

UPDATE client SET client_name = 'Soldier'
WHERE client_id = '1';

DELETE FROM client WHERE client_id = 'db0ba46f-51a2-426c-bc1f-e0e3925b56f1';

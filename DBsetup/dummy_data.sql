INSERT IGNORE INTO user
    VALUES 
        (1, 'T800', 'Sarah', 'Connor', 'sconner@fakemail.com', 'pbkdf2:sha256:150000$YmIiIyKn$d1081a76254caa6b52e01f99418990b5d98f25a46b4db2f084bd9051a42199b9', false, 'History', 0),
        (2, 'Bulldozer', 'Carlos', 'Mendoza', 'cmendoza@fakemail.com', 'pbkdf2:sha256:150000$bAeUTD3C$99c475d825ee5f9f4a8631d006c84da44bf116a480dc3bc2432df218522d83e4', false, 'Mathematics', 0),
        (3, 'TheElderGod', 'Raiden', NULL, 'raiden@@fakemail.com', 'pbkdf2:sha256:150000$xmdiYP70$7333d701471f7e2b5204f18e4dff7fed60724995621d1766a1105c343b58a4d3', true, 'Physics', 0),
        (4, 'Queenie', 'Kara',  'Strong', 'kstrong@fakemail.com', 'pbkdf2:sha256:150000$J5O3SWHa$d59fd69e6d94f655581abd39d82972fa5102757c39e4cf65d8df3c925ebb159d', false, 'Kinesiology', 0),
        (5, 'JDog', 'James',  'Daniels', 'jdaniels@fakemail.com', 'pbkdf2:sha256:150000$8E1BoEKw$6fec252a5bcfdd1c8e19ad1a9773ffbdcb7f8addb2b16d20e22a9e39007c4844', false, 'Civil Engineering', 0),
        (6, 'admin', 'Admin',  'Account', 'admin@mail.sfsu.edu', 'pbkdf2:sha256:150000$hDHlY653$858d003d63baddfa9e180b3469231be8370db35f04947715e330d73164a4ca32', true, 'Administrative Studies', 6),
        (7, 'csboy', 'Sean',  'Darryanto', 'csboy@mail.sfsu.edu', 'pbkdf2:sha256:150000$dCH4HvSx$c6e624ee229dbe765bf03f3a8c20e6c2b4c564e07decafaf0b06a2db4e2117f6', false, 'Computer Science', 7);

INSERT IGNORE INTO listing
   VALUES
        (1, 'Mini Fridge', 'Keep your food and drinks chilled!',  'Appliances', 79.99, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58iWJ0hXM9RAqR7pGIog0QT9YhKZaZO3lU7byXV71dL2rJmmx&s', '2018-05-23 07:02:08', '2019-06-30 22:37:55', 5, true, NULL),
        (2, 'Math Textbook', 'Barely used math textbook for MATH 324', 'Books', 20, 'https://clarkchronicle.com/wp-content/uploads/2017/05/int-math-1500x994.jpg', '2016-05-01 02:16:00', '2018-04-13 14:12:42', 2, true, NULL),
        (3, 'Microwave', 'Brand new microwave for sale!',  'Appliances', 59.99, 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/3901/3901007cv12d.jpg', '2017-05-14 21:56:42', '2019-10-25 18:56:02', 4, true, NULL),
        (4, 'Couch', 'Used couch for sale.', 'Household', 75, 'https://thumbs.dreamstime.com/b/comfortable-couch-orange-red-pillow-spacious-living-room-interior-comfortable-couch-orange-red-pillow-131769657.jpg', '2016-05-12 12:32:45', '2017-05-22 12:32:33', 1, true, NULL),
        (5, 'Physics Textbook', 'Barely used math textbook for PHYS 230',  'Books', 25, 'https://images-na.ssl-images-amazon.com/images/I/911-2v5Yq8L.jpg', '2017-09-04 14:22:16', '2018-11-04 04:44:15', 3, true, NULL),
        (8, 'Cracking the Coding Interview', 'Computer Science coding interview prep text book',  'Books', 25, 'http://www.crackingthecodinginterview.com/uploads/6/5/2/8/6528028/header_images/1435811621.jpg', '2017-09-04 14:22:16', '2018-11-04 04:44:15', 3, true, NULL),
        (6, 'Electric SkateBoard', 'Make your commute easier!', 'Auto', 230, 'https://images-na.ssl-images-amazon.com/images/I/61yBxA7YrtL._SX425_.jpg', '2016-05-12 12:32:45', '2017-05-22 12:32:33', 1, true, NULL),
        (7, 'Screwdriver', 'All in one screwdrive you will ever need!', 'Tools', 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwZ708bBwt4jZ46wUbK3AligO8qFhljb5EZODyddRNUJ2KD1EVbw&s', '2016-05-12 12:32:45', '2017-05-22 12:32:33', 2, true, NULL),
        (8, 'Cracking the Coding Interview', 'Computer Science coding interview prep text book',  'Books', 20, 'http://www.crackingthecodinginterview.com/uploads/6/5/2/8/6528028/header_images/1435811621.jpg', '2017-09-04 14:22:16', '2018-11-04 04:44:15', 3, true, NULL),
        (9, 'Computer Science advanced java programming text book', 'CS Book for AP Java',  'Books', 30, 'https://images-na.ssl-images-amazon.com/images/I/41jiVYep0WL._SX331_BO1,204,203,200_.jpg', '2017-09-04 14:22:16', '2018-11-04 04:44:15', 3, true, NULL),
        (10, 'Python Programming text book', 'Computer science text book for Python',  'Books', 15, 'https://images-na.ssl-images-amazon.com/images/I/41z1V0zP2WL.jpg', '2017-09-04 14:22:16', '2018-11-04 04:44:15', 3, true, NULL),
        (11, 'PS4', 'New playstation 4',  'Electronics', 200, 'https://media.wired.com/photos/5a99f809b4bf6c3e4d405abc/master/pass/PS4-Pro-SOURCE-Sony.jpg', '2017-09-04 14:22:16', '2018-11-04 04:44:15', 3, true, NULL);

INSERT INTO message
	VALUES
		(1, 2, 5, 'Dummy data is hard.', '2019-02-01 06:02:46', 0, 2),
    (2, 5, 3, 'I dont know what to say.', '2018-02-01 06:02:46', 0, 4),
    (3, 4, 1, 'Guize, halp.', '2017-02-01 06:02:46', 0, 5);
        
INSERT INTO location
	VALUES
		(1, 'YOUR place.', NULL, 5),
        (2, '555 Fake St.', NULL, 4),
        (3, 'The quad at SFSU.', NULL, 4),
        (4, 'The starbucks at Westlake.', NULL, 3),
        (5, 'Earthrealm.', NULL, 3),
        (6, 'Wherever the light touches.', NULL, 3),
        (7, 'Room 40B at the SFSU Library.', NULL, 2),
        (8, 'YOUR place.', NULL, 1);

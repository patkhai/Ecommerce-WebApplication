CREATE TABLE user (
  user_id int NOT NULL AUTO_INCREMENT,
  username varchar(45) NOT NULL,
  first_name varchar(45) DEFAULT NULL,
  last_name varchar(45) DEFAULT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  is_admin tinyint NOT NULL DEFAULT '0',
  major varchar(45) DEFAULT NULL,
  token varchar(255) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY username_UNIQUE (username)
);

CREATE TABLE listing (
  listing_id int NOT NULL AUTO_INCREMENT,
  title varchar(45) NOT NULL,
  description varchar(255) DEFAULT NULL,
  type varchar(45) DEFAULT NULL,
  price decimal(6,2) NOT NULL DEFAULT '0.00',
  thumbnail varchar(512) DEFAULT NULL,
  created_on datetime NOT NULL,
  last_edited_on datetime NOT NULL,
  created_by int NOT NULL,
  approved bool,
  approved_by int,
  PRIMARY KEY (listing_id),
  KEY listing_creator_idx (created_by),
  CONSTRAINT listing_creator FOREIGN KEY (created_by) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT listing_approver FOREIGN KEY (approved_by) REFERENCES user (user_id) ON DELETE SET NULL
);


CREATE TABLE message (
  message_id int NOT NULL AUTO_INCREMENT,
  sent_by int NOT NULL,
  sent_to int NOT NULL,
  message_body varchar(1000) NOT NULL,
  timestamp datetime NOT NULL,
  from_admin tinyint NOT NULL DEFAULT '0',
  listing_id int,
  PRIMARY KEY (message_id),
  KEY message_sender_idx (sent_by),
  KEY message_recipient_idx (sent_to),
  CONSTRAINT message_recipient FOREIGN KEY (sent_to) REFERENCES user (user_id) ON DELETE CASCADE,
  CONSTRAINT message_sender FOREIGN KEY (sent_by) REFERENCES user (user_id) ON DELETE CASCADE,
  CONSTRAINT message_listing FOREIGN KEY (listing_id) REFERENCES listing (listing_id) ON DELETE SET NULL
);



CREATE TABLE location (
  location_id int NOT NULL AUTO_INCREMENT,
  description varchar(255) NOT NULL,
  thumbnail varchar(255) DEFAULT NULL,
  created_by int NOT NULL,
  PRIMARY KEY (location_id),
  KEY location_creator_idx (created_by),
  CONSTRAINT location_creator FOREIGN KEY (created_by) REFERENCES user (user_id) ON DELETE CASCADE
);

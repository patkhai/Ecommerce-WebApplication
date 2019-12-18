Downloading MySQL Server & Workbench
------------------------------------

1. From the MySQL homepage, go to downloads, then MySQL Community (GPL) Downloads, then click MySQL Workbench
	a. Alternatively, follow this link https://dev.mysql.com/downloads/mysql/
2. Select operating system and click download (you don't have to make an account)
	a. On the next page, choose to download the community version, not the web community version
3. When the installer opens, it should prompt you to choose a setup type, select Custom, then click next
4. Expand the MySQL Servers and Connector/J folders, and select the corresponding products, then click next
5. After installing the products, you’ll need to configure the Server  
	a. Make sure Standalone MySQL Server is selected, and click next  
	b. Confirm that configuration type is Development Computer, TCP/IP and Firewall boxes are checked, and that the Port is 3306, then click next  
	c. Select use strong password encryption for authentication, then click next  
	d. Set a root password __WRITE IT DOWN__  
	e. Create a user set to All Hosts, with the role of DB Admin  
	f. Confirm that the first two boxes are checked, and the Standard System Account option is checked, then click next, then finally   execute
	g. This should also create a local database  and schema that can be viewed in Workbench  
6. Afterwards, use the installer to download MySQL Workbench  

Setting up a New Connection
---------------------------

__Only necessary if no connection present. Installing the server should create a local connection__  

1. Open up MySQL Workbench
2. Click the Database dropdown, then click manage connections
3. Click the new button in the bottom left of the window that just popped up
4. Give the connection a name
5. Set the Hostname to “localhost” (no quotation marks)
6. Test the connection, then click ok  


Filling the Database
--------------------

__Use the following queries to create and fill the listing table__  

```sql
CREATE TABLE listing (  
    created_by VARCHAR(45) NOT NULL,  
    created_on DATETIME NOT NULL,  
    description VARCHAR(45) NULL,  
    last_edited_on DATETIME NOT NULL,  
    listing_id INT UNSIGNED NOT NULL AUTO_INCREMENT,  
    price DECIMAL(6,2) NOT NULL DEFAULT 0.00,  
    thumbnail VARCHAR(45) NULL,  
    title VARCHAR(45) NOT NULL,  
    type VARCHAR(45) NULL,  
    approved_by INT UNSIGNED,
    approved BOOL,
    PRIMARY KEY (listing_id),
    FOREIGN KEY (created_by) references User(user_id),
    FOREIGN KEY (approved_by) references User(user_id),
);
```

```sql
INSERT INTO listing  
    VALUES 
        (NULL, 'Couch', 'Used couch for sale.', 'furniture', 75, NULL, '2016-05-12 12:32:45', '2017-05-22 12:32:33', 'Sarah'),  
        (NULL, 'Math Textbook', 'Barely used math textbook for MAth 324.', 'book', 20, NULL, '2016-05-01 02:16:00', '2018-04-13 14:12:42', 'Connor'),  
        (NULL, 'Physics Tutor', 'Will help with Physics homework and notes.',  'service', 25, NULL, '2017-09-04 14:22:16', '2018-11-04 04:44:15', 'Raiden'),  
        (NULL, 'Microwave', 'Brand new microwave for sale!',  'object', 59.99, NULL, '2017-05-14 21:56:42', '2019-10-25 18:56:02', 'Kara'),  
        (NULL, 'Room Cleaning', 'Will clean any room in your house.',  'service', 10, NULL, '2018-05-23 07:02:08', '2019-06-30 22:37:55', 'James');  
```
	
__Use the describe query to check if the table was created properly__  
__Use the select query to check if the entries were added__  

`DESCRIBE` listing  
`SELECT * FROM` listing

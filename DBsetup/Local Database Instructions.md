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
	f. Confirm that the first two boxes are checked, and the Standard System Account option is checked, then click next, then finally execute
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



Clearing the Database
---------------------

__Use the following queries to delete all tables. (this is so we all start from the same place)__

```sql
DROP TABLE listing;
DROP TABLE location;
DROP TABLE message;
DROP TABLE user;
```

You'll know the tables have been deleted if running the queries gives you an "unknown table" error.

If you get a "no database selected" message, right click the "sys" schema on the left tab, and click "Set as Default Schema". Then run the query again.



Creating the Database
--------------------

__Use the SQL script below to create the tables for the database.__ 

1. Download the SQL script below.
2. In MySQL Workbench, open up the connection you created earlier.
3. Click the file dropdown tab, then click "Run SQL Script."
4. Select the tables.sql file.
5. In the next window, select a schema. ("sys" should be there by default)
6. Leave the default character set blank, then click run.

[CREATE TABLES](tables.sql)


Filling the Database
--------------------

__Use the SQL script below to fill the tables with dummy data.__ 

1. Download the SQL script below.
2. In MySQL Workbench, open up the connection you created earlier.
3. Click the file dropdown tab, then click "Run SQL Script."
4. Select the dummy_data.sql file.
5. In the next window, select a schema. ("sys" should be there by default)
6. Leave the default character set blank, then click run.

[DUMMY DATA](dummy_data.sql)

	
Testing the Database
--------------------

__Use the describe query to check if [TABLE NAME] was created properly__  
```sql
DESCRIBE [TABLE NAME];
```

__Use the select query to check if the entries were added to [TABLE NAME]__  
```sql
SELECT * FROM [TABLE NAME];
```

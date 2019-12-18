# Ecommerce-WebApplication
A web application that helps student in University to buy and sell items they want. 


Check out here at http://13.52.236.160/



Environment Setup

Virtual environments are crucial for Python development. If you're familiar with NodeJs and the node_modules directory for Node projects, then think of it in the same manner.
We store all libraries and dependencies in the virtual environment provided by Python and in order for you to utilize it properly, you have to first source the virtual environment. 

This document will guide you through how to initially set up your python project on your local machine.
First, ensure that you have Python 3.6+. 

LINUX
1. cd to the server directory
2. run `python -m venv venv`, this creates a virtualenv titled 'venv'
3. source your virtual env by running `source venv/bin/activate`, now whenever you do anything you'll do it in the context of the python project.
4. install all the dependencies by running `pip install -r requirements.txt`
5. if you want to add a new package to our dependencies, run `pip install [PACKAGE_NAME]` and to ensure that it gets stored to requirements.txt, run `pip freeze > requirements.txt`
6. now the project should be in a state ready for development. 
7. if you want to run the project properly while utilizing all the libraries used, you must ensure that you've sourced your virtual env.

WINDOWS
1. go to your PyCharm project
2. go to settings -> project -> project interpreter
3. click the cog icon next to interpreter and click 'add'
4. select new environment
5. check all the boxes
6. click ok
7. go to settings -> tools -> python integrated tools
8. set package requirements file to our requirements.txt file
9. this should prompt you for all uninstalled dependencies




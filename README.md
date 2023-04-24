# BasicLoginAPI
This's API for basic login system by using cookie system.

# How to use & How is it work 

- ```/login``` route using to login. You must write "username" and "password" in the body section. to send login request to the API. If you username and password correct, API'll respone cookie LoginKey with userId. But if incorrect usernrame or password will return ```something went wrong``` .
- ```/menu``` route using to main menu. If you have already login or You already have LoginKey, API'll return welcome back "Welcome back" with username. But if you don't have LoginKey cookie, API'll return "You must login first".

Library Management System

Group: 85
Name: 
Yu Chun To (12519126),
Lam Tsz Him (13159488),
Wong Chun Lung (13246191)

Application link: (https://s381f-project-group85-library-books.onrender.com/)
This link is for using Render's hosting service, which allows the server to run 24 hours a day.

********************************************
# login Interface function
When you enter the URL, you will be redirected to the default page, which contains two functions, namely register and login.
# Register
In the login interface, You can register your own library account. Simply enter Username and Password in the text field below the Register header and click the green Register button. You can successfully register your account."User registered successfully" will be displayed at the bottom of the screen.But if you enter a registered account, you will get a reminder that "User already exists".Finally, if there is a database or other connection error. An alert "Error occurred during registration" will appear. Check your network connection when this happens.

********************************************
# Login
Through the login interface, the user can enter a username and password that have been correctly recorded in the database. Then press the "login" button, the "Go to home" button will appear, click the button will jump to the system management interface. But if you enter an unregistered user name. An alert "User not found" will appear. If the user name and password do not match. The alert "Invalid username or password" will appear. Please register a new account and password.

Of course, we also prepared some test accounts for debuggers to test accounts. You can use the following format to login.
{	"_id":{"$oid":"655bddd6847270c99600d6cc"},
	"username":"2277236944",
 	"password":"2277236944",
  	"__v":{"$numberInt":"0"}
   }

After successful login, userid is stored in seesion.

********************************************
# Logout
In the home page, each user can log out their account by clicking the logout button in the homepage, it will return to the default page.The default page is the login screen

********************************************
# Home
In the home page, it will display "Welcome, (username)" on the right top corner.
Uses can use the search , create , delete ,update funtion on the homepage.


********************************************
# CRUD service
- Create

-	A book document may contain the following attributes with an example: 
	1)	Book ID 
	2)	Book Name
	3)	Book Author

Create operation is post request, and all information is in body of request.

********************************************
# CRUD service
- Read
- The user can use the serach by the bookid or bookname or bookauthor to list out all the information of the book deatils.


-  There is option to read and find book list all information or searching by book id.

1) Searching by Book id, Book Name, Book Author;
	user can input Bookid or Book Name or BookAuthor,search what Book you want to find 
	Bookid is in the body of get request;
	

********************************************
# CRUD service
- Update
-	The user can update the book information through the interface.
-	User can use the edit button to update the book information.
- 	User can update the bookName ,bookAuthor.
-	Among the attribute shown above, BookID cannot be changed. Since BookID is fixed, BookID is searching criteria for updating information. 


-	A Book document may contain the following attributes with an example: 
	1)	Book ID
	2)	Book Name
	3)	Book Author

********************************************
# CRUD service
- Delete
-	The user can delete the book information through the details interface.

********************************************
# Restful
In this project, there are three HTTP request types, post, get and delete.
- Post 
	Post request is used for insert.
	Path URL: /api/item/restaurantID/:restaurantID
	Test: curl -X POST -H "Content-Type: application/json" --data '{"name": "Taro & Tea", "restaurangID":"00000004"}'localhost:8099/api/item/restaurantID/00000004/name/Taro & Tea

- Get
	Get request is used for find.
	Path URL: /api/item/restaurantID/:restaurantID
	Test: curl -X GET http://localhost:8099/api/item/restaurantID/00000002

- Delete
	Delete request is used for deletion.
	Path URL: /api/item/restaurantID/:restaurantID
	Test: curl -X DELETE localhost:8099/api/item/restaurantID/00000002

For all restful CRUD services, login should be done at first.


curl -X POST -H "Content-Type: application/json" --data '{"name": "Taro & Tea", "restaurangID":"00000004"}' http://localhost:8099/api/item/restaurantID/00000004

curl -X GET http://localhost:8099/api/item/restaurantID/00000002

curl -X DELETE http://localhost:8099/api/item/restaurantID/00000002

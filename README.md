Library Management System

Group: 85
Name: 
Yu Chun To (12519126),
Lam Tsz Him (13159488),
Wong Chun Lung (13246191)

Application link: (https://s381f-project-group85-library-books.onrender.com/)
This link is for using Render's hosting service, which allows the server to run 24 hours a day.

For npm commad,
-npm install express mongoose ejs bcryptjs express-session moment-timezone
then 
-npm start
If you're trying to run it locally, the URL is http://localhost:3000/
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
	"username":"admin",
 	"password":"admin",
  	"__v":{"$numberInt":"0"}
   }

After successful login, userid is stored in seesion.

********************************************
# Logout
In the home page, each user can log out their account by clicking the logout button in the homepage, it will return to the default page.The default page is the login screen

********************************************
# Home
In the home page, it will display "Welcome, {username}" on the right top corner.
Uses can use the search , create , delete ,update funtion on the homepage.


********************************************
# CRUD service -Book Management System
- Create

-	Operation: POST request.
	Purpose: To add a new book to the database.
	Attributes:
	Book ID - A unique identifier for the book.
	Book Name - The name of the book.
	Book Author - The author of the book.
	Error Handling: If a book with the same ID already exists, the system will return an error message indicating that the book ID is already in use.
	Usage: Users provide the book's ID, name, and author in the request body. 	The book ID is mandatory and must be unique. The system checks for the uniqueness of the ID before adding the book.

Create operation is post request, and all information is in body of request.

********************************************
# CRUD service
- Read
- 	Operation: GET request.
	Purpose: To retrieve information about books from the database.
	Functionality:
		1.Searching by Book ID, Book Name, Book Author: Users can input the book ID, name, or author to find specific books. The search parameters are passed in the query string of the GET request.
		2.Listing All Books: Users can retrieve a complete list of books without any search parameters.
	Error Handling: If no matching records are found based on the provided criteria, the system will return a message indicating no results were found.
	Usage: Accessible through a search interface where users can enter their search criteria.


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
-	Operation: POST request with the book ID.
	Purpose: To remove a book from the database.
	Functionality: Users can delete a book by specifying its ID.
	Error Handling: If no book is found with the given ID, an error message is displayed indicating that the book cannot be found and hence not deleted.
	Usage: Typically available in the book details interface where a user can choose to remove a book.
********************************************
# Restful
In this project, there are three HTTP request types, post, get and delete.
- POST Request  - Add New Book
	Purpose: Used to add a new book record to the database.
	Path URL: /api/books
	Request Example: Use curl to send a POST request to add a new book.
	Test：curl -X POST -H "Content-Type: application/json" --data '{"id":"001", "name":"New Book Title", "author":"Author Name"}' https://s381f-project-group85-library-books.onrender.com/api/books


- GET Request - Retrieve Book List
	Purpose: Used to retrieve a list of all books in the database.
	Path URL: /api/books
	Request Example: Use curl to send a GET request to get the list of books.
	Test ：curl -X GET https://s381f-project-group85-library-books.onrender.com/api/books

- PUT Request - Update Book Information
	Purpose: Used to update the information of a specific book.
	Path URL: /api/books/:id (where :id is the ID of the book to update)
	Request Example: Use curl to send a PUT request to update a specific book's information.
	Test：curl -X PUT -H "Content-Type: application/json" --data '{"name":"Updated Book Title", "author":"Updated Author Name"}' https://s381f-project-group85-library-books.onrender.com/api/books/001
- DELETE Request - Delete Book
	Purpose: Used to delete a specific book from the database.
	Path URL: /api/books/:id (where :id is the ID of the book to delete)
	Request Example: Use curl to send a DELETE request to remove a specific book.
	Test：curl -X DELETE https://s381f-project-group85-library-books.onrender.com/api/books/001

For all restful CRUD services, login should be done at first.

curl -X POST -H "Content-Type: application/json" --data '{"id":"001", "name":"New Book Title", "author":"Author Name"}' https://s381f-project-group85-library-books.onrender.com/api/books

curl -X GET https://s381f-project-group85-library-books.onrender.com/api/books

curl -X PUT -H "Content-Type: application/json" --data '{"name":"Updated Book Title", "author":"Updated Author Name"}' https://s381f-project-group85-library-books.onrender.com/api/books/001

curl -X DELETE https://s381f-project-group85-library-books.onrender.com/api/books/001


If you're trying to run it locally, the URL is http://localhost:3000/ ,you need to change.Example

curl -X GET http://localhost:3000/api/books
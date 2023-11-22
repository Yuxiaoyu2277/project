Library Management System

Group: 85
Name: 
Yu Chun To (12519126),
Lam Tsz Him (13159488),
Wong Chun Lung (13246191)

Application link: (https://projectsample381.render.com/)  \\ Need update

********************************************
# Login
Through the login interface, each user can access the  information library system by entering their username and password.

Each user has a userID and password;
[
	{userid: user1, password: password1},
	{userid: user2, password: password2},
	{suerid: user3, password: password3}
]

After successful login, userid is stored in seesion.

********************************************
# Logout
In the home page, each user can log out their account by clicking the logout button.

********************************************
# Home
In the home page, it will display "Welcome, (username)" on the right top corner.
Usescan use the search function, create fuction ,add fucntion on the homepage.




********************************************
# CRUD service
- Create

-	A booking document may contain the following attributes with an example: 
	1)	Booking Name (Shake Shack)
	2)	Book ID (00000003), book id must be 8 digits
	3)	Book Author
	4)	Book Editor
	5)	Book(s) Remain Availible
Book Name and Book ID is mandatory, and other attributes are optional.

Create operation is post request, and all information is in body of request.

********************************************
# CRUD service
- Read
- The user can use the serach by the bookid or bookname or bookauthor to list out all the information of the book deatils.

//
-  There are two options to read and find restaurants list all information or searching by restaurant id.

1) List all information
	display.ejs will be displayed with all restaurant ID;
	clicking on restaurant ID, the details will be shown;

2) Searching by restaurant id
	input id of restaurant you want to find (00000003);
	id is in the body of post request, and in display.ejs restaurant id will be shown as link;
	clicking on restaurant ID, the details will be displayed;
//
********************************************
# CRUD service
- Update
-	The user can update the bookid information through the details interface.
-	Among the attribute shown above, BookID cannot be changed. Since BookID is fixed, BookID is searching criteria for updating information. 

//
-	A restaurant document may contain the following attributes with an example: 
	1)	Restaurant Name (Shake Shack)
	2)	Borough (Tung Chung)
	3)	Street (Tat Tung Road)
	4)	Restaurant Telephone (29871728), telephone number must be 8 digits
	5)	Cuisine (American)
	6)	Description (... Very nice hamburger)

	In example, we updated the borough, street and restaurant contact number.
//
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

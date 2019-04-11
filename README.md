# Project Name

Billy

## Description

Generate bills dynamically and convert them to pdf

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start saving favorite restaurants
-  **Login:** As a user I can login to the platform so that I can see my favorite restaurants
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add Bill** As a user I want to add a bill to the client
-  **List Bills** As a user I want to list the bills from each client
-  **Search Bill** As a user I want to search by REF the bill
-  **Print Bill in PDF** As a user I want to print the bill in pdf format
 

## Backlog

Clients:
- Add client
- List clients
- Save client's bills
- Insert client's info on new bills

Services
- Presaved services

Extra types of doc:
- Create new type of document
- Add new template

  
# Client

## Pages

| url | public | Functionality |
|-----|-------|---------------|
| `/` | true | landing page |
| `/signup` | true | Signup user |
| `/login` | true | login user |
| `/bills` | false | list of bills |
| `/new` | false | create bill |

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Documents Service
  - doc.listBill()
  - doc.search(ref)
  - doc.createBill(data)
  - doc.detailBill(id)
  - doc.remove(id)   
  - doc.print(id)

# Server

## Models

User model

```
username - String // required
password - String // required
```

Doc model

```
ref - String // required
type - String // required
data:{
  client:{
    name - String
    nif - String // required
    address:{
      street- String // required
      number - Number // required
      postalCode - Number // required
      country - String // required
    }  
  }
  services - [{
    name - String
    units - Number
    priceUnit - Number
  }]
}

```

## API Endpoints (backend routes)

## API routes:

### auth
|Method|Route|Functionality|
|---|---|---|
|GET|api/auth/me|Check session status|
|POST|api/auth/signup|Log in user to app and set user to session (Body: username, password)|
|POST|api/auth/login|Register user to app and set user to session (Body: username, password)|
|POST|api/auth/logout|Log out user from app and remove session|

### documents
|Method|Route|Functionality|
|---|---|---|
|POST|api/doc/add(type)|Create a document|
|GET|api/doc/get|List documents|
|GET|api/doc/get(id)|Get data from item|
|POST|api/doc/update(id)|Get data from item|
|POST|api/doc/delete|Delete document|
|GET|api/doc/print(id)|Print bill|
  

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/jsWoyYen/docgest) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/monicalopezgris/frontend-billy)

[Server repository Link](https://github.com/monicalopezgris/backend-billy)

[Deploy Link Backend](http://heroku.com)

[Deploy Link Frontend]()

### Slides

The url to your presentation slides

[Slides Link](https://slides.com/monicalopez-5/doc)

# An interview task submitted to Stackivy

##  setup
```
git clone https://github.com/donunobunjo/stackivy.git
cd stackivy
npm install
npm run start
```

## Stack used
```
node/express
MongoDB Atlas
```

## Assumptions
```
1. When registering the user, you include the user balance
```

## Endpoints

### http://localhost:3000/register
####   Method: Post
####   Content type: Content-Type: application/json
####   Body: {"userName": "joe", "email":"joe@gmail.com", "balance": 150, "mobile": "0806691940" }


### http://localhost:3000/deposit
####   Method: Post
####   Content type: Content-Type: application/json
####   Body: {"userName": "joe", "amount": 150, "notificationType": "mobile" }

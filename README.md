Memo
=========

Make learning easier with Memo! A site that lets you explore all your educational interests, sorting resourceful posts into collections. Using PostgreSQL, Express, AJAX, and more.

## Screenshots
### Main Page
!["main page"](https://raw.githubusercontent.com/JCyan90/Memo/master/docs/main-page.png)

### Post Page
!["post page and comments"](https://raw.githubusercontent.com/JCyan90/Memo/master/docs/post-page.png)

### Profile Overview
!["profile overview with stats"](https://raw.githubusercontent.com/JCyan90/Memo/master/docs/profile-overview.png)

### User's Posts
!["user posts from profile"](https://raw.githubusercontent.com/JCyan90/Memo/master/docs/users-posts-from-profile.png)


## Setting Up

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

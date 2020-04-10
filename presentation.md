# Week 6 - Authentication

---

## Next steps 
- Delete functionality
- Differentiation between signed in and signed out
- Password validation

---

## User stories 
- [x] Submit information for anyone to see
- [x] Come back to the site later to see my posts still there 
- [ ] I want to be the only person allowed to delete my posts

---

## Stretch user stories
- [ ] A user page that shows everything posted by me
- [ ] GithHub actions CI set up 

---

## Acceptance criteria
- [x] Forms for users to sign up and log in
- [x] A form for users to submit data only accessible to logged in users
- [x] A page showing all the data
- [ ] A way for logged in users to delete their own data
- [ ] Semantic form elements with correctly associated labels
- [ ] A Postgres database hosted on Heroku
- [x] Tests for server routes and database access
- [x] Not process user input as SQL commands
- [x] Hidden environment variables (i.e. not on GitHub)

---

## Building on what has come before 

![sandcastle](https://media.giphy.com/media/l0Iy3Vv4BKQ1II5zO/giphy.gif)

---

![SRV|VRS](https://i.imgur.com/SvZHmCG.png)

---

## Initial planning 
- Miro board 
- Mob coding
- Changed project 2.5 hours in 😱

---

![Security/database flowchart](https://i.imgur.com/7upbi5B.png)

---

## WHAT WE LEARNED 🤓

### Hashing

![hash](https://media.giphy.com/media/10GUbOX16lS15C/giphy.gif)

---

### NEVER HASH PASSWORDS SYNCHRONOUSLY
`data.password = bcryptjs.hashSync(data.password, salt);`

- Hashing takes a long time by design
- By hashing syncronously we were blocking our server so it wouldn't be able to handle incoming requests until the hashing was done 😭
- In future we will use the async promise method to hash 🙏

---

### HEROKU IS TEMPERAMENTAL
- We could get the sign up, login and log out to work on our local servers, but not on Heroku 🤔🤔🤔

---

### TECHNICAL ISSUES
- We had to be very adaptable!

---

### THIRD PARTY MODULES ARE REALLY USEFUL

- (or can be)

---

## Learning Objectives
![](https://media.giphy.com/media/4zifMZ8pBYUOQ/giphy.gif)

---

### Hettie
- JWT setting and removing cookies and authentication
- Securely storing passwords
- TDD
- Next time: GitHub Actions

---

### Hannah 
- bcrypt and storing passwords on a database
- Keeping focus
- Working on a new codebase
- What the hell we've been doing for the past 6 weeks

---

### Ina
- bcryptjs 
- setting and removing cookies 
- testing

--- 

### Ivo 
- learn bcrypt
- learn about JWTs

---

# Questions?

![](https://media.giphy.com/media/cMVgEhDeKzPwI/giphy.gif)

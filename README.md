# :memo: About

Rentx, a vehicle rental API. This is the main NodeJs project developed during RocketSeat's career acceleration program, Ignite.

<br />

# :wrench: Techs used

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Typeorm](https://typeorm.io)
- [Sentry](https://sentry.io)
- [AWS-SDK](https://docs.aws.amazon.com/sdk-for-javascript/index.html)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Jest](https://jestjs.io)
- [Redis](https://redis.io)
- Etc

# :arrow_down: How to download this project

⚠ The following tools must be installed: [nodejs](https://nodejs.org/en/).

⚠ You can use [yarn](https://yarnpkg.com/) or [npm]() to install dependencies.

<br />

Clone this project to your local machine:
```bash
# Clone this project to your local machine
$ git clone https://github.com/YvesJaques/Ignite-rentx

# access the project folder
$ cd Ignite-websockets

# Install dependencies
$ yarn / npm install

# run the project
$ yarn / npm run
```

<br />

<p align="center">Made by <a href="https://www.linkedin.com/in/yves-morais-jaques/" target="_blank">Yves Morais Jaques</a></p>

# :memo: Requirements

# Car registration

**RF**
- Should be able to register a new car.
- Should be able to list all categories.

**RN**
- Should not be able to register a car with a duplicate plate number.
- A car should be registered as available as default.
- Only admins should be able to register new cars.

# Cars list

**RF**
- Shoul be able to list all available cars.
- Should be able to list all available cars by category name.
- Should be able to list all available cars by brand name.
- Should be able to list all available cars by car name.

**RN**
- User doesn't need to be logged in.

# Car specification registration

**RF**
- Should be able to register an specification for a car.

**RN**
- Should not be able to register an specification for a non registered car.
- Should not be able to register a duplicate specification for a car.
- Only admins should be able to register specifications.

# Car images registration

**RF**
- Should be able to register a car's image.

**RNF**
- Use Multer for file upload.

**RN**
- User should be able to register multiple images for a car.
- Only admins should be able to upload images.

# Car rent

**RF**
- Should be able to register a rent.

**RN**
- A rent should have a minimum duration of 24 hours.
- Should not be able to register a duplicate active rent for the same user.
- Should not be able to register a duplicate active rent for the same car.
- User must be logged in.
- A car should be set as unavailable after a rent is made.

# Car devolution

**RF**
- Sohlud be able to register a car devolution.

**RN**
- Customer should be charged a full daily rate even if the car is returned before the minimum rent duration.
- On car return the same should be set as available again.
- On car return the user should be able to make a new rent.
- The total rent charge should be calculated on devolution.
- A fine should be charged in case the devolution exceeds the stipulated duration.
- The fine should be added to the total rent charge.
- User must be logged in.

# User's rents listing

**RF**
- Should be able to list all rents for the user.

**RN**
- User must be logged in.

# Recover password

**RF**
- User should be able to recover password by entering the registered email.
- User should recevei an email with password recover instructions.
- User should be able to insert a new password.

**RN**
- User must insert a new password.
- Password recover link should expire in 3 hours

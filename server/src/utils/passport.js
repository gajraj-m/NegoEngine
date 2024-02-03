// const passport = require("passport");
// const { GoogleStrategy } = require("passport-google-oauth20").Strategy;
// const User = require("../models/user.model.js");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:8080/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await User.findOne({ email: profile.emails[0].value });

//         if (user) {
//           // If the user already exists, return the user
//           return done(null, user);
//         } else {
//           // If the user doesn't exist, create a new user with Google information
//           user = await User.create({
//             email: profile.emails[0].value,
//             username: profile.displayName,
//             // You can customize other fields based on your User model
//           });
//           return done(null, user);
//         }
//       } catch (error) {
//         console.error(error);
//         return done(error, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

// module.exports = passport;

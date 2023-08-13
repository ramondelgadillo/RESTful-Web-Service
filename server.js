// Ramon Delgadillo
// Student ID: 027020745

// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path'); // Import the 'path' module
const app = express();

// Read data from 'data.json' file
const rawData = fs.readFileSync('data.json');
const data = JSON.parse(rawData);

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public'))); 

// Endpoint to get a list of tweets
app.get('/api/tweets', (req, res) => {
  // Map data to create an array of tweet objects
  const tweets = data.map(tweet => ({
    created_at: tweet.created_at,
    id: tweet.id,
    text: tweet.text
  }));
  res.json(tweets);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Endpoint to get a list of users
app.get('/get_all_users', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  // Map data to create an array of user objects
  const users = data.map(entry => ({
      name: entry.user.name,
      screen_name: entry.user.screen_name,
      id: entry.user.id_str,
  }));

  if (users.length > 0) {
      res.json(users);
  } else {
      res.json({ error: 'No users found' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Endpoint to get details about a specific tweet by ID
app.get('/get_tweet', (req, res) => {
  const tweetId = req.query.tweet_id;
  const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  // Find the tweet with the specified ID
  const tweet = data.find(entry => entry.id_str === tweetId);
  if (tweet) {
      const tweetDetails = {
          text: tweet.text,
          created_at: tweet.created_at,
          retweet_count: tweet.retweet_count,
          favorited: tweet.favorited,
      };
      res.json(tweetDetails);
  } else {
      res.json({ error: 'Tweet not found' });
  }
});
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Endpoint to get external links from tweets
app.get('/api/external-links', (req, res) => {
  // Map data to create an array of link groups
    const linkGroups = data.map(tweet => ({
      tweetId: tweet.id,
      links: extractLinksFromText(tweet.text)
    }));
    res.json(linkGroups);
  });
  
  // Function to extract links from tweet text
  function extractLinksFromText(text) {
    const linkRegex = /https?:\/\/[^\s/$.?#].[^\s]*/gi;
    return text.match(linkRegex) || [];
  }
  

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Endpoint to get detailed profile information about a user by screen name
app.get('/get_profile', (req, res) => {
  const screenName = req.query.screen_name;
  const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  // Find the profile information of the user with the specified screen name
  const profile = data.find(entry => entry.user.screen_name === screenName);
  if (profile) {
      const profileInfo = {
          name: profile.user.name,
          description: profile.user.description,
          location: profile.user.location,
          followers_count: profile.user.followers_count,
          friends_count: profile.user.friends_count,
          verified: profile.user.verified,
      };
      res.json(profileInfo);
  } else {
      res.json({ error: 'User not found' });
  }
});
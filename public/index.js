// Ramon Delgadillo
// Student ID: 027020745

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // References to various HTML elements for the "Get Tweets" and "Get External Links" functionalities
  const getTweetsBtn = document.getElementById('getTweetsBtn');
  const tweetsContainer = document.getElementById('tweetsContainer');
  const getExternalLinksBtn = document.getElementById('getExternalLinksBtn');
  const externalLinksContainer = document.getElementById('externalLinksContainer');

  // References to HTML elements for the "Get User Profile", "Get Tweet Details", and "Get All Users" functionalities
  const getUserProfileBtn = document.getElementById('usersearchBtn');
  const getTweetDetailsBtn = document.getElementById('tweetsearchBtn');
  const getAllUsersBtn = document.getElementById('getAllUsersBtn');

  // References to containers for displaying fetched data
  const userProfileContainer = document.getElementById('profileInfo');
  const tweetDetailsContainer = document.getElementById('tweetDetails');
  const allUsersContainer = document.getElementById('allUsers');
  
  // Store the toggle states for each button
  const toggleStates = {
    tweets: false,
    externalLinks: false,
    userProfile: false,
    tweetDetails: false,
    allUsers: false, 
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Event listener for the "Get Tweets" button
  getTweetsBtn.addEventListener('click', async () => {
    // Toggle the state
    toggleStates.tweets = !toggleStates.tweets; 
    // Clear the container
    tweetsContainer.innerHTML = '';

    if (toggleStates.tweets) {
      // Fetch and display tweets
      const response = await fetch('/api/tweets');
      const tweets = await response.json();
      // Populate the container with fetched tweets
      tweets.forEach(tweet => {
        const tweetDiv = document.createElement('div');
        tweetDiv.innerHTML = `<p>Created At: ${tweet.created_at}</p><p>Text: ${tweet.text}</p><hr>`;
        tweetsContainer.appendChild(tweetDiv);
      });
    }
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Event listener for the "Get External Links" button
  getExternalLinksBtn.addEventListener('click', async () => {
    // Toggle the state
    toggleStates.externalLinks = !toggleStates.externalLinks; 
    // Clear the container
    externalLinksContainer.innerHTML = '';

    if (toggleStates.externalLinks) {
      // Fetch and display external links
      const response = await fetch('/api/external-links');
      const data = await response.json();

      // Populate the container with fetched external links
      data.forEach(linkGroup => {
        const { tweetId, links } = linkGroup;
        const linkGroupDiv = document.createElement('div');
        linkGroupDiv.innerHTML = `
          <h3>Tweet ID: ${tweetId}</h3>
          <ul>
            ${links.map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join('')}
          </ul>
        `;
        externalLinksContainer.appendChild(linkGroupDiv);
      });
    }
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Event listener for the "Get User Profile" button
  getUserProfileBtn.addEventListener('click', async () => {
    // Toggle the state
    toggleStates.userProfile = !toggleStates.userProfile;
    // Clear the container
    userProfileContainer.innerHTML = '';

    if (toggleStates.userProfile) {
      // Fetch user profile data
      const screenName = document.getElementById('screenName').value;
      fetch(`/get_profile?screen_name=${screenName}`)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  userProfileContainer.innerHTML = data.error;
              } else {
                // Display user profile data in the container
                  userProfileContainer.innerHTML = `
                      <h2>${data.name}</h2>
                      <p>${data.description}</p>
                      <p>Location: ${data.location}</p>
                      <p>Followers: ${data.followers_count}</p>
                      <p>Friends: ${data.friends_count}</p>
                      <p>Verified: ${data.verified}</p>
                  `;
              }
          })
          .catch(error => {
              console.error('Error:', error);
          });
    }
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Event listener for the "Get Tweet Details" button
  getTweetDetailsBtn.addEventListener('click', async () => {
    // Toggle the state
    toggleStates.tweetDetails = !toggleStates.tweetDetails;
    // Clear the container
    tweetDetailsContainer.innerHTML = '';

    if (toggleStates.tweetDetails) {
      // Fetch tweet details
      const tweetId = document.getElementById('tweetId').value;
      fetch(`/get_tweet?tweet_id=${tweetId}`)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  tweetDetailsContainer.innerHTML = data.error;
              } else {
                // Display tweet details in the container
                  tweetDetailsContainer.innerHTML = `
                      <h2>Tweet Details</h2>
                      <p>Text: ${data.text}</p>
                      <p>Created At: ${data.created_at}</p>
                      <p>Retweet Count: ${data.retweet_count}</p>
                      <p>Favorited: ${data.favorited}</p>
                  `;
              }
          })
          .catch(error => {
              console.error('Error:', error);
          });
    }
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getAllUsersBtn.addEventListener('click', async () => {
    // Toggle the state
    toggleStates.allUsers = !toggleStates.allUsers;
    // Clear the container
    allUsersContainer.innerHTML = '';

    if (toggleStates.allUsers) {
      // Fetch all users
      fetch('/get_all_users')
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  allUsersContainer.innerHTML = data.error;
              } else {
                // Display all users in the container
                  const usersList = data.map(user => `
                      <p>Name: ${user.name}</p>
                      <p>Screen Name: ${user.screen_name}</p>
                      <p>ID: ${user.id}</p>
                      <hr>
                  `).join('');
                  allUsersContainer.innerHTML = `
                      <h2>All Twitter Users</h2>
                      ${usersList}
                  `;
              }
          })
          .catch(error => {
              console.error('Error:', error);
          });
    }
  });
});


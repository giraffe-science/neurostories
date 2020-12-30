## What is this?

We want the https://neurostories.org home page to contain the mission statement 
and then an infinite-scrolling list of posts. 

At the time we started creating this:

1. There was a bug with infinite scrolling posts in Neve- we only saw the first 
   few posts
2. We couldn't figure out how to add the mission statement to the home page when
   it was set to display posts

But now:

1. The bug with infinite scrolling is now fixed.
2. We have realised that the way Neve wants you to add content to this posts page
   is to create a custom header, which is only possible with the
   pro version of Neve, which we are not currently paying for.

Knowing this, probably it would be better to just pay for the theme, but the work
is done anyway, so we're leaving it as-is for now.

## Installing

1. Run 
    ```
    npm run build && npm run zip
    ```
    
    This should create an `infinite-posts.zip` file in the project directory
    
2. Go to:
    
   https://www.neurostories.org/wp-admin/plugin-install.php
    
3. Click **Upload Plugin**
    
4. **Choose file**, select `infinite-posts.zip`, then **Install now**

5. Click **Replace current with uploaded**

6. Check the home page renders as expected

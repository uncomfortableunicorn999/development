# Development

### Link to Deployed Website
If you used the stencil code, this is `https://uncomfortableunicorn999.github.io/development/`

### Goal and Value of the Application
This is a dashboard for viewing your favorite NYT cooking pies for thanksgiving. It is valuable to the user because NYT doesnt allow you to sort based on time or alphabetically which is annoying as a user.
### Usability Principles Considered
I used colors that are accessible (blue) and people don't have a hard time seeing them. I also have alt text for the images for people using screen readers. And I have made the text large for people with visual impairments.
### Organization of Components
I have a Recipe Component. This takes care of creating the recipe image card, with the author, time and favorite button. 
### How Data is Passed Down Through Components
I pass in an "item" as props. This is from the json of all of my recipes that includes and author, title, image and cook time. This populates the screen with what you see. I also pass through as props the handler for the whether something has been bookmarked.
### How the User Triggers State Changes
A quick note about my filtering. I thought that filtering with "or" and checkboxes made more sense for my application. Thus, if someone clicks "Sam Sifton" and "Genevieve Ko" then it will show all recipes that are made by either Ko or Sifton. The starting state is all of the recipes, even though nothing has been clicked. If someone clicks an author and an amount of time, it will be the intersection between the author set and the amount of time set. However, if only the author is selected, then it will show everything for that author, no matter how long the recipe takes. There was a lot of discourse on Ed about "or" vs "and" filtering so I thought I should clear up my approach somewhere in my README.

I keep a dictionary for each of the filter types; the starting state is that all of the varibales are false (unchecked). When somehting gets checked, it gets set to the opposite of what it currently is, and uses state to keep track of that. I then filter on the dictionary. I do this for all of the checkboxes. I also have a variable that keeps track of the amount of time of all of the favorites (the aggregator). When a new item gets checked, its time gets added to the current total. If it is being unchecked, then the time gets subtracted from the state variable. 

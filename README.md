
# Rick and Morty Tyro Health Challenge Submission

## Libraries Used

### Next.js

I wanted to use next.js for the built in router for separating the list and profile pages.  This felt like the right design choice as it allows the concerns of the two pages to be separated.  i.e. search logic and pagination logic is only in the list page, and the profile page is only concerned with displaying the profile of a single character.  It also allows the profile page to be extended to show more information about the character in the future without needing to change the list page.

### Jotai with Tanstack Query

I used jotai for state management as I prefer the API to other state management libraries.  I also used Tanstack Query for data fetching and caching.  I like the API of Tanstack Query and it is a good fit for this project as it allows me to easily fetch the list of characters and the profile of a single character as a suspendabe atom.  It also handles caching and invalidation for me for the most part.

### Zod

I used zod for validation of the types coming from the API.  I wanted to build the pages so that if an unexpected type came from the api, it would fail gracefully.

## Tools

### Github Copilot

I used Github Copilot while building the app.  I primarily use it for autocomplete and searching for relevant info on libraries and APIs.  I also used it for some of the repetitive styling, I would create a general design then extend it across components with the tool.  I also used it for setting up the tests, I would ask it to create a test for a specific component and it would generate the test for me.  I would then modify the test to fit my needs.

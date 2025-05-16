# Developer Efficiency
Consider adjusting the `npm run dev` command and wrapping structure to watch for changes in files, live, and 
recompile on change, and reload.  This way the dev just hits save in the IDE, and their code recompiles and the browser
reloads.  This would improve the roundtrip of "I made a change, lets see what improvement I achieved!" without the need 
for stopping the `npm` command, starting it again, and reloading myself. Some things I did reloaded and some didn't.

# Reusability
Some of the functions I added would be well suited to go into a formatting library use for other
components, and/or across other projects.  In the past I have handled this by creating an internal npm module which was
then imported in each case where it was used.  I didn't take the time to do that here.

# Mobile Support
The pages design is what I would term "mostly" good for mobile - in that the design flexes some for different devices, 
but if this were going to production we would need to check it out on a range of devices and decide on a potentially 
different presentation for search results, one thats more vertical then horizontal.

# Time and Effort
As I discussed with Ed, my familiarity with Typescript is limited, and I haven't used Tailwind.  So, I spent roughly 3 
hours on this, up from the 2 recommended. I did more googling to figure out how to do this, or that, then I normally 
would in a pure javascript react environment, or a node environment.  I hope this shows you my ability to learn and 
understand the patterns and anti patterns and how to resolve them, even if my direct knowledge of precisely how to do 
it with Typescript requires some google-fu.  In a very short time I will be well versed in Typescript and that searching 
won't be neccessary anymore.

# Performance
Ideally this would be built with an automatic paginatio system where we pull ~50 records at first, and as the user 
scrolls down more records are pulled.  Then, if they enter a search term we would do the filtering through database
querying and not by filtering the very large data set from memory.  In cases where there is a large dataset, those
adjustments will make a big difference in performance; they were just out of the scope for 2 hours for me.  

What I *was* able to accomplish was adding firstNameFilter, lastNameFilter, cityFilter, etc. for each of the string 
values from the database so at least the .toLowerCase() doesn't need to be run for every row as we're filtering.
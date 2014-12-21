Weather
=======

A basic weather application that provides current conditions and a 10 day forecast for San Francisco California. 
I have a developer’s account for the Weather Underground APIs which I used for getting the weather data. 
Unfortunately the free developer account only allows a limited number of requests per day. 
So I cached the weather data temporally and only refresh the data from Weather Underground APIs after a defined time interval. 
I am using TingoDB to persist the cached weather data. TingoDB is an embedded JavaScript and file based database that is upwards compatible with MongoDB at the API level. 
That means if I later want to add MongoDB, I only need some very minor code changes specific to the database initialization to use MongoDB instead.

The demo application cane be seen in the link below. (please excuse the “waether” misspelling in the URI, oops)

[https://waether.herokuapp.com/](Weather Application)

I also have a blog post about this application and the technologies used to create it.

[http://grafcode.net/blog/?p=152](Weather Application Blog Post)

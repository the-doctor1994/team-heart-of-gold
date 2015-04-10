#Heart of Gold
<img src = "../Images/logo1.png" alt = "Heart of Gold" height = "132" width="110">

##<i>"StudyBuddy"</i>


#Technical Speicification

##Database Modules/Components:
<!--
List out different components you will need - List out how you plan to implement them and what they will need to interact with to make the application function
-->






##Information Tranfer/Data Translation Components:
<!--
List out different components you will need - List out how you plan to implement them and what they will need to interact with to make the application function
-->

###
###
###

##Frontend/UI Components:
<!--
List out different components you will need - List out how you plan to implement them and what they will need to interact with to make the application function
-->

###studystyle.css

This will be a universal stylesheet for the website that will create a universal look-and-feel

This is a base level component and has no dependencies

###doj.js

:SUBJECT TO CHANGE: This file will have scripting that is used for a wide range of functionality on the website, and there may be other .js files that are made for the login and registration screens.

This is a base-level component and has no dependencies

###index.html

This html document will be the first thing a user sees when they visit the applicaiton, and it will have a login option, with an included integration for password recovery and creating a new login registration if it necessary.

This module will require:
>studystyle.css
>doj.js
>backend management for verifying user membership
>Data translation and parsing for the small form

###profBuilder.html

This document will basically be the long-form version of being able to build a profile for a user. The data will be submitted to the database by form after the user completes the document.

This module will require:
>studystyle.css
>doj.js
>backend management for adding a new user/checking if they exist
>Data translation of this information, ajax protocols most likely

###home.html

This document will have a List of new matches, old matches, classes that are being taken etc.

This module will require:
>studystyle.css
>doj.js
>backend protocol/Data translation for the information on the page

###matcher.html

This will be the actual "matching" portion of the application that will present matches based on attributes the user has added in their profile.

This module will require:
>studystyle.css
>doj.css
>backend protocol/Data Translation for the information on the page

###chat.html

This wil be a dynamic view that will allow someone to chat with their matches and set up meetings to study with them. It will allow you to choose a match, which will open a chat window. The user will only be able to chat with one other user at a time.

This module will require:
>studystyle.css
>doj.js
>backend protocol/Data translation for the information on the page

###edituser.html

Since the idea is to be able to add multiple classes to study for, there will be a document that allows a user to add another class to their profile. The user will also be able to edit their profile from this view.

This module will require:
>studystyle.css
>doj.js
>backend protocol/Data translation for the information on the page



#Heart of Gold
<img src = "../Images/logo1.png" alt = "Heart of Gold" height = "132" width = "110">

##"Study Buddy"

##Team
###**Brenton Chasse**   - Backend/Databases - Dojo Sempai
###*Bio:*  Brenton is a Senior Computer Systems Engineering student pursuing a minor in Computer Science. This developer is familliar with using the Dojo Javascript toolkit for front end web applicaiton development. He looks forwared to furthering his knowledge of the Dojo toolkit by using it on top of node.js on the back end.
###**Grayson Kempster** - Backend/Databases
###*Bio:* Grayson is a Junior Computer Science major with a focus on physics. He work as an RA in the Washington Tower of the SouthWest residence area. This developer was raised in a small town called Hopedale in MA where I earned the rank of Eagle Scout in the local Boy Scout troop. I am good at creative problem solving, and have experience with Java, HTML, C, and UNIX. In terms of this project I am interested in database management, graphic design, and function design.
###**Gary White**       - Frontend/UI
###*Bio:* Gary has experience working on large-scale projects, including their documentation, from cs320. This developer has a fair amount of Web Development experience using the following languages and protocols: JavaScript, HTML, CSS, XAML, XML, PHP, and SQL. Gary is most interested in UI design for this project.
###**Philron Hozier**   - Frontend/UI
###*Bio:* Philron is urrently a Junior @UMass Amherst pursuing a BS Computer Science degree. He is interested in CS is the design of software and user experience.  This developer has past experience developing two, rather small, mobile applications in Objective-C for iOS (teacher absentee app, music lyric app). 
###**Main Khan**        - Networking/Data Parsing
###*Bio:* Main is currently a Sophomore seeking a double major in Computer Science and Computational Mathematics. He is interested in working on front end for this project.
###**Tyler Caldwell**   - Networking/Data Parsing
###*Bio:* Tyler is a Junior comp sci/econ dual-degree student at UMass. He is interested in software engineering and computational social science.

*Brenton Chasse, 3/13/15*

##Disclaimer
<!--
Status of the functional specification, what it does and does not discuss
-->
By no means does this functional specification outline how our site will behave and appear to the user in our final application. Implemented features may be adapted, modified, expanded, added, and removed as we develop our web application and further our understand the needs in the niche that our application seeks to fulfill. In our development, we strive to provide a simple, intuitive, and visually pleasing user interface which provides high quality and robust user interactions. As we develop, we will update this document so that the specifications listed will be accurate to our final application.

*Brenton Chasse, 03/12/15*

##Project Idea Summary
<!---
Just a basic run-through
-->
##Revision History
<!--
To be updated throughout the semester
-->
##Use Cases
1. Javaris Jamar Javarison-Lamar is freshmen student at UMass and is overwhelmed by the difficulty of his college courses. He is looking for some people to study with in several of his classes however, nobody in his dorm shares any of his classes making it difficult to meet up with people in person to complete homework. Luckily for Javaris, he can use StudyBuddy to ease his problems. He simply creates an account and completes his profile and is now ready to meet with people to study with.
2. D’Squarious Green Jr. is a physics student who decided to drop his linear algebra class within the add/drop period. Unfortunately for X-Wing @Alliciousness, D’Squarious’s study buddy for that class, he will no longer be able to do his homework with him anymore. He goes on to his StudyBuddy profile and removes linear algebra from his currently enrolled classes. X-Wing gets a notification from StudyBuddy telling him that D’Squarious is no longer available for studying.
3. Tyroil Smoochie-Wallace and L’Carpetron Dookmarriot have moved off campus for the semester making it difficult for them to work with their study group from last semester. In order for them to find new a new study group they want to use StudyBuddy and get together with some other off-campus students. To do so, they simply go onto their StudyBuddy profile and edit their campus location and how far they are willing to travel (luckily, Tyroil owns his own car making travel not much of an issue).
4. Fudge has returned to college after a successful summer interning for Squeeps Inc. He would like to update his bio to reflect his newfound experience in biochemical engineering. Fudge signs in to StudyBuddy and adds a paragraph about his new professional experience to his bio, and is immediately 10x more popular on StudyBuddy.
5. J’dinkalage Morgoone and Torque Lewith are looking to meet new people. They are both in a large Bosnian Film Theory lecture, and are struggling with the subtleties of some of the assignments. None of their friends are taking the class with them, and they would like to find some classmates to work with. They sign on to StudyBuddy and create a new study group that is open to new members, and find Nyquillus Dillwad, a Bosnian film genius who is looking to share his wisdom with his less cultured classmates.
6. Davoin Shower-Handel has entered all of his currently enrolled classes and study habits into his StudyBuddy profile. He has completed his bio, and is ready to put himself out there and meet some study buddies. As he looks through the buddies that StudyBuddy believes will be compatible with him, Davoin discovers Hingle McCringleberry. Hingle is everything Davoin has ever searched for in a study buddy -- he likes to work in a quiet environment, he is a visual learner, and he can meet at all of the same times as Davoin. Davoin elects to match with Hingle, and hopes Hingle will do the same.
7. Jackmerius Tacktheritrix and Leoz Maxwell Jilliumz have mutually chosen to become study buddies, after StudyBuddy’s algorithms suggested that they might be compatible. StudyBuddy has connected them by sharing the contact information they provided for sharing with their matches. Jackmerius anxiously sends Leoz a hopeful email asking to arrange a study meeting.
8. D’marcus Williams, Ibrahim Moizoos, and Quatro Quatro have all decided to form a study group. They need to study for their Thursday afternoon final in sports management and, because they are playing in the the looming East-West bowl, they are all on tight schedules. Luckily, they were able to find people with compatible study habits through StudyBuddy and can now contact one-another to set up a time, date, and meeting place that works for them. Using the contact information they shared on StudyBuddy, they decide to meet on Wednesday night at the library and have an all-night study session.

*Tyler Caldwell and Main Khan, 03/11/15*


##Non-Goals
* We are not planning on implementing GPS location services, although that could be a feature in future implementations. We plan on keeping the location aspect limited to inputs for University of enrollment, and distance willing to travel.
* Distance willing to travel will be based on a local/regional/state basis, not on physical location. Harvesting relative location data for all possible universities is overkill since it would simply emulate gps location services.
* We are not currently planning on adding features for managing existing study groups. StudyBuddy is meant to be a study-match-making application rather than a team management application (of which there are already many).

*Tyler Caldwell, Main Khan and Brenton Chasse, 03/12/15*

##Open Issues
<!--
A list
-->
* Do we want to support older browser versions?
* How will we ensure that two people see the same real time message stream while messaging?
* Is there demand for matching Study Buddies of different Universities? (i.e.: UMass student matching with a Smith College student)

*Brenton Chasse and Grayson Kempster, 03/13/15*

##User-Perspective Flowchart
<!--
-->
##Wireframes
<!--
At least 5, with explanation as to how it meets user needs, and a list of
open issues for aspects of the application that will be answered as development
proceeds
-->

<!-- Each section must be annotated with the author and date of that section -->
<!-- We have to relate the project idea to our general education courses -->
<!-- We also have to update the README.md in the root with a section about
     the functional specification, and describing which files we created for
     this assignment that we want reviewed by the grader -->
<!-- We have to make weekly team meeting notes for each week since the second
     assignment was released in the docs/Notes directory -->
<!-- Include any prototype code or research we've done up to this point -->
<!-- Describe log-in and authentication functionality too -->

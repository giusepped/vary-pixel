VARY-PIXEL PROJECT

Our project is a collaborative pixel drawing web application. As a user, you can register and draw in real time with other users in any of the rooms on our website. Each room also has a chat so you can interact with those you are drawing with. If none of the exisiting canvases interest you, then you can create your own, give it a name and start having fun with pixel art. You could even invite your friends! Visit our website:

https://varypixel.herokuapp.com/

Alternatively, here is how you get started on your local environment:

```bash
git clone https://github.com/giusepped/vary-pixel.git
cd vary-pixel
npm install
node server.js
```

Visit http://localhost:3000/

==================
## [v1.0](https://github.com/giusepped/vary-pixel/releases/tag/v1.0)

* Implemented home page
* Created a canvas
* Implemented a canvas where pixels can be drawn with a click
* Testing with jasmine, jasmine-jquery, protractor

==================
##[v2.0](https://github.com/giusepped/vary-pixel/releases/tag/v2.0)

* Created homepage where all the canvases are shown as thumbnails
* Added Angular.js and made website a single page application
* Styling and responsiveness
* Added Users on the Parse database
* Added relationship between users and canvases (many to many relation called 'contributors')
* Added title to each canvas
* Added a colour palette

=================
##[v3.0](https://github.com/giusepped/vary-pixel/releases/tag/v3.0)

* Added Chat Room for each Canvas using socket.io.
* Also, using socket.io and database, now the canvas saves automatically when the user goes home
* Added more tools to the canvas page: eraser, colour picker.
* On the homepage, contributors are displayed when hovering over a canvas
* Added a search bar to search by title
* Canvases are filtered by most recently updated
* Optimised styling on both the home and the canvas
//Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

//Save Bookmark
function saveBookmark(e) {
  // Get from values
  e.preventDefault();
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }
  var bookmark = {
    name: siteName,
    url: siteUrl,
  };

  /*
  //Local Storage Test
  localStorage.setItem("test", "Hello World");
  console.log(localStorage.getItem("test"));
  localStorage.removeItem("test");
  console.log(localStorage.getItem("test"));
  */

  if (localStorage.getItem("bookmarks") === null) {
    // Initialize the array
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  document.getElementById("myForm").reset();
  // Re-fetch bookmarks
  fetchBookmarks();
  e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url) {
  //Get bookmarks from LocalStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // Loop throught bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  //Re-Set back to localStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  //Re-fetch bookmarks
  fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from LocalStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  //Get output id
  var bookmarksResults = document.getElementById("bookmarksResults");

  // Build output
  bookmarksResults.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      '<div class="well">' +
      "<h3>" +
      name +
      '<a class="btn btn-default" target="_blank" href="' +
      url +
      '">Visit</a>' +
      "<a onclick=\"deleteBookmark('" +
      url +
      '\')" class="btn btn-danger" target="_blank" href="#">Delete</a>' +
      "</h3>" +
      "</div>";
  }
}
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }
  return true;
}

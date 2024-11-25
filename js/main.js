// @ts-nocheck

var BookmarkNameInput = document.getElementById("BookmarkName");
var BookmarkURLInput = document.getElementById("BookmarkURL");
var TableBody = document.getElementById("tbody");
var RulesBox = document.getElementById("RulesBox");
var CloseBtn = document.getElementById("CloseBtn");
var BookmarkList = [];

if (localStorage.getItem("Bookmarks") !== null) {
    BookmarkList = JSON.parse(localStorage.getItem("Bookmarks"));
    DisplayData();
}
function ValidName(name) {
    var NameRegex = /^\w{3,}('?\s?\w)*$/;
    return NameRegex.test(name);
}
function ValidURL(url) {
    var URLRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.(.+)\w{1,}\/?(:\d{2,5})?(\/\w+)*$/;
    return URLRegex.test(url);
}
function capitalize(str) {
    var strArr = str.toLowerCase().split(" ");
    for (var i = 0; i < strArr.length; i++) {
        strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);     
    }
    return strArr.join(" ");
}
function addBookmark() {
    var Bookmark = {
        SiteName: capitalize(BookmarkNameInput.value),
        SiteURL: BookmarkURLInput.value,
    };
    if (ValidName(Bookmark.SiteName) && ValidURL(Bookmark.SiteURL)) {
        BookmarkList.push(Bookmark);
        localStorage.setItem("Bookmarks", JSON.stringify(BookmarkList));
        DisplayData();
        ClearInput();
    } else {
        RulesBox.classList.remove("d-none");
    }
}
function ValidNameInput(){
    if(ValidName(BookmarkNameInput.value)){
        BookmarkNameInput.classList.remove("is-invalid");
        BookmarkNameInput.classList.add("is-valid");
    }else{
        BookmarkNameInput.classList.remove("is-valid");
        BookmarkNameInput.classList.add("is-invalid");
    }
}
function ValidURLInput(){
    if(ValidURL(BookmarkURLInput.value)){
        BookmarkURLInput.classList.remove("is-invalid");
        BookmarkURLInput.classList.add("is-valid");
    }else{
        BookmarkURLInput.classList.remove("is-valid");
        BookmarkURLInput.classList.add("is-invalid");
    }
}
function DisplayData() {
    var BookmarkBox = "";
    for (let i = 0; i < BookmarkList.length; i++) {
        BookmarkBox += `
        <tr>
            <td>${i + 1}</td>
            <td>${BookmarkList[i].SiteName}</td>
            <td>
                <button onclick="VisitWeb(${i})" class="btn visit-btn" data-index="${i}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                </button>
            </td>
            <td>
                <button onclick="DeleteBookmark(${i})" class="btn delete-btn pe-2" data-index="${i}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                </button>
            </td>
        </tr>
        `;
    }
    TableBody.innerHTML = BookmarkBox;
}
function ClearInput() {
    BookmarkNameInput.value = "";
    BookmarkURLInput.value = "";
}
function VisitWeb(i) {
    var httpRegex = /^(http(s)?):\/\/(www\.)/;
    if (httpRegex.test(BookmarkList[i].SiteURL)) {
        open(BookmarkList[i].SiteURL);
    } else {
        open(`https://${BookmarkList[i].SiteURL}`);
    }
}
function DeleteBookmark(i) {
    BookmarkList.splice(i, 1);
    localStorage.setItem("Bookmarks", JSON.stringify(BookmarkList));
    DisplayData(BookmarkList);
}
function CloseBox() {
    RulesBox.classList.add("d-none");
}

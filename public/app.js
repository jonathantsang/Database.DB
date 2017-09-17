(function(){
// Initialize Firebase
var config = {
	apiKey: "AIzaSyCNvWgkczePo7UAOQlyRGE628IhT7LrYLk",
    authDomain: "databasedb-dce9a.firebaseapp.com",
    databaseURL: "https://databasedb-dce9a.firebaseio.com",
    projectId: "databasedb-dce9a",
    storageBucket: "databasedb-dce9a.appspot.com",
    messagingSenderId: "203329129628"
};
firebase.initializeApp(config);

const preObject = document.getElementById('object');
const ulList = document.getElementById('list')

const dbRefObject = firebase.database().ref().child('object');
const dbRefList = dbRefObject.child('list');

// Sync object changes
dbRefObject.on('value', snap=> {
	preObject.innerText = JSON.stringify(snap.val(), null, 3);
});

dbRefList.on('child_added', snap => {
	const li = document.createElement('li');
	li.innerText = snap.val();
	li.id = snap.key;
	ulList.appendChild(li);
});

dbRefList.on('child_changed', snap => {
	const liChanged = document.createElement(snap.key);
	liChanged.innerText = snap.val();
});

dbRefList.on('child_removed', snap => {
	const liToRemove = document.createElement(snap.key);
	liToRemove.remove();
});

// cmd+shift+r

}());
const elUsersList = document.querySelector(".js-users-list");
const elPostsList = document.querySelector(".js-user-posts");
const elCommentsList = document.querySelector(".js-user-comment");

const elUsersTemp = document.querySelector(".js-users-temp").content;
const elPostsTemp = document.querySelector(".js-posts-temp").content;
const elCommentsTemp = document.querySelector(".js-comments-temp").content;


function renderUsers(arr){
    elUsersList.innerHTML = null;

    const UsersFrag = new DocumentFragment();

    arr.forEach(item => {
        const elUsersTempClone = elUsersTemp.cloneNode(true);

        elUsersTempClone.querySelector(".js-user-name").textContent = item.username;
        elUsersTempClone.querySelector(".js-user-fullname").textContent = item.name;
        elUsersTempClone.querySelector(".js-user-email").href = `mailto: ${item.email}`;
        elUsersTempClone.querySelector(".js-user-email").textContent = item.email;
        elUsersTempClone.querySelector(".js-geo-location").href = `https://www.google.com/maps/place/${Object.values(item.address?.geo).join(",")}`;
        elUsersTempClone.querySelector(".js-user-phone").href = `tel: ${item.phone}`;
        elUsersTempClone.querySelector(".js-user-company").href = item.website;
        elUsersTempClone.querySelector(".js-user-company").textContent = item.website;

        
        elUsersTempClone.querySelector(".js-company-name").textContent = item.company?.name;
        elUsersTempClone.querySelector(".js-company-desc").textContent = item.company?.catchPhrase;
        elUsersTempClone.querySelector(".js-company-second-desc").textContent = item.company?.bs;
        elUsersTempClone.querySelector(".js-users-btn").dataset.id = item.id;
        
        elUsersTempClone.querySelector(".js-user-id").textContent = item.id;

        UsersFrag.appendChild(elUsersTempClone)
    });

    elUsersList.appendChild(UsersFrag)
}

function renderPosts(arr){
    elPostsList.innerHTML = null;
    elCommentsList.innerHTML = null;

    const UsersFrag = new DocumentFragment();

    arr.forEach(item => {
        const elPostsTempClone = elPostsTemp.cloneNode(true);

        elPostsTempClone.querySelector(".js-post-name").textContent = item.title;
        elPostsTempClone.querySelector(".js-post-desc").textContent = item.body;
        elPostsTempClone.querySelector(".js-post-btn").dataset.id = item.id;
        elPostsTempClone.querySelector(".js-post-id").textContent = item.id;

        UsersFrag.appendChild(elPostsTempClone)
    });

    elPostsList.appendChild(UsersFrag)
}

function renderComments(arr){
    elCommentsList.innerHTML = null;

    const UsersFrag = new DocumentFragment();

    arr.forEach(item => {
        const elCommentsTempClone = elCommentsTemp.cloneNode(true);

        elCommentsTempClone.querySelector(".js-comment-name").textContent = item.name;
        elCommentsTempClone.querySelector(".js-comment-desc").textContent = item.body;
        elCommentsTempClone.querySelector(".js-comment-id").textContent = item.id;

        UsersFrag.appendChild(elCommentsTempClone)
    });

    elCommentsList.appendChild(UsersFrag)
}

async function getUsers(){
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
        const data = await res.json();

        renderUsers(data)
    } catch (error) {
        console.log(error);
    }
}

async function getUserPost(userId){
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        const data = await res.json();

        renderPosts(data)
    } catch (error) {
        console.log(error);
    }
}

async function getUserComments(postId){
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        const data = await res.json();

        renderComments(data)
    } catch (error) {
        console.log(error);
    }
}


elUsersList.addEventListener("click", evt => {
    if(evt.target.matches(".js-users-btn")){    
        getUserPost(evt.target.dataset.id)
    }
})

elPostsList.addEventListener("click", evt => {
    getUserComments(evt.target.dataset.id)
})



getUsers()

var postTitleRef;
var postDescRef;
var currentPost = 0


const renderPost = () => {
    const post = json_data.posts[currentPost]
    postTitleRef.innerHTML = post.title
    postDescRef.innerHTML = post.description
    renderPostComments(post.id)
}

const renderPrevPost = () => {
    if (currentPost != 0) {
        currentPost--
        renderPost()
    }
}

const renderNextPost = () => {
    if (currentPost != json_data.total_count-1){
        currentPost++
        renderPost()
    }
}

//TODO: render next and previous active

const init = () => {
    postTitleRef = document.querySelector('#post-title')
    postDescRef = document.querySelector('#post-description')
    renderPost()
}
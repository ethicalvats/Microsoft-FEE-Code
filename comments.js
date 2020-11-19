var currentPostId

const findPost = (postId) => json_data.posts.find(p => p.id === postId)

const addComment = (comment) => {
    const post = findPost(currentPostId)
    post.comments.posts.push(comment)
    renderComment(comment)
}

const removeComment = (event) => {
    const commentId = event.target.parentElement.getAttribute('data-commentid')
    const post = findPost(currentPostId)
    const postComments = post.comments.posts
    const newComments = postComments.filter(p => p.id !== parseInt(commentId))
    post.comments.posts = newComments
    renderPostComments(currentPostId)
}

const renderComment = (comment) => {
    const commetListRef = document.querySelector('#comments-list')
    const commentRef = document.querySelector('#comment-template')
    const newCommentNode = commentRef.cloneNode(true)
    newCommentNode.querySelector('.author').innerHTML = comment.name
    newCommentNode.querySelector('section p').innerHTML = comment.text
    newCommentNode.querySelector('.actions .delete').setAttribute('data-commentid', comment.id)
    newCommentNode.classList.remove('hidden')
    newCommentNode.removeAttribute('id')
    commetListRef.appendChild(newCommentNode)
}

const removeAllComments = () => {
    const commetListRef = document.querySelector('#comments-list')
    commetListRef.innerHTML = ""
}

const renderPostComments = (postId) => {
    currentPostId = postId
    removeAllComments()
    const postComments = findPost(postId).comments.posts
    if (postComments.length > 0){
        postComments.forEach(post => {
            renderComment(post)
        });
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const saveComment = () => {
    const commentAuthor = document.querySelector("form input[name=name]")
    const commentText = document.querySelector("form textarea[name=comment]")
    if (!commentAuthor || !commentText){
        return
    }
    const commentPost = {
        id: getRandomInt(100),
        name: commentAuthor.value,
        text: commentText.value,
        likesCount: 0,
        timestamp: new Date().getDate
    }
    addComment(commentPost)
    commentAuthor.value = null
    commentText.value = null
}
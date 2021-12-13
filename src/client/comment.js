const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelectorAll(".delete__button");

const handleClick = async (e) => {
  console.log(e);
  const commentLi = e.target.parentElement;
  const commentId = commentLi.dataset.commentid;
  console.log(commentLi);
  const { status } = await fetch(`/api/comment/${commentId}/delete`, {
    method: "DELETE",
  });
  if (status === 200) {
    commentLi.remove();
  }
};
const addComment = (text, commentId) => {
  const videoComments = document.querySelector(".video__comments");

  const newComment = document.createElement("li");
  newComment.dataset.commentid = commentId;

  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  newComment.appendChild(icon);

  const span = document.createElement("span");
  span.innerText = `  ${text}`;
  newComment.appendChild(span);

  const button = document.createElement("button");
  button.innerText = "❌";
  newComment.appendChild(button);

  newComment.className = "video__comment";
  const ul = videoComments.querySelector("ul");
  ul.prepend(newComment);

  button.addEventListener("click", handleClick);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const data = textarea.value;
  const videoId = videoContainer.dataset.videoid;
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(data, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
  deleteBtns.forEach(function (btn) {
    btn.addEventListener("click", handleClick);
  });
}

const profileMain = document.getElementById('profileMain');
const currentInfoForm = document.getElementById('currentInfo');

const editDiv = document.getElementById('edit');
const editButton = document.getElementById('editButton');
const editForm = document.forms.editForm;

const addStackButton = document.getElementById('addStack');
const deleteStackButton = document.getElementById('deleteStack');
const allCurrentTagsDiv = document.getElementById('allCurrentTags');
const allTagsSelect = document.getElementById('allTagsSelect');

editForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  let userId = editButton.value;

  //sending input values to the server
  const response = await fetch(`/profile/${userId}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: event.target.newName.value,
      lastName: event.target.newLastName.value,
      aboutMe: event.target.aboutMe.value,
      experience: event.target.experience?.value,
    }),
  });

  //redirecting to the user's profile
  if (response.status === 200) {
    window.location.href = `/profile/${userId}`;
  }
});

addStackButton?.addEventListener('click', async (event) => {
  //retrieveing user id
  let userId = event.target.value;

  //retrieveing selected tags from the dropdown
  let selectedTagId = allTagsSelect.options[allTagsSelect.selectedIndex].value;
  let selectedTagName = allTagsSelect.options[allTagsSelect.selectedIndex].innerHTML;

  console.log('tag name', selectedTagName, 'tagid', selectedTagId);

  //sending info about selected tags to the server
  const response = await fetch(`/profile/${userId}/addStack`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tagId: selectedTagId,
      tagName: selectedTagName,
    }),
  });

  let newTag = `<a href="/tag/${selectedTagId}">${selectedTagName}</a>`;

  //instantly adding new tags
  if (response.status === 200) {
    allCurrentTags.insertAdjacentHTML('beforeend', newTag);
  }

  if (response.status === 400) {
    alert('у тебя уже есть этот навык!');
  }
});

deleteStackButton?.addEventListener('click', async (event) => {
  //retrieveing user id
  let userId = event.target.value;

  //retrieveing selected tags from the dropdown
  let selectedTagId = allTagsSelect.options[allTagsSelect.selectedIndex].value;
  let selectedTagName = allTagsSelect.options[allTagsSelect.selectedIndex].innerHTML;

  //selecting a specific tag we want to delete
  const selectedTag = document.getElementById(`${selectedTagId}`);

  const response = await fetch(`/profile/${userId}/deleteStack`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tagId: selectedTagId,
      tagName: selectedTagName,
    }),
  });

  //instantly removing the selected tag 
  if (response.status === 200) {
    console.log(123123);
    allCurrentTags.removeChild(selectedTag);
  }
});

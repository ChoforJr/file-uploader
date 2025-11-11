const getfolder = document.querySelector("#folders");

getfolder.addEventListener("change", handleOptionChangeFolder);

function handleOptionChangeFolder() {
  const selectedValue = this.value;

  if (selectedValue) {
    window.location.href = selectedValue;
  }
}

const changeBtns = document.querySelectorAll(".changeBtn");

async function handlechangeBtn(event) {
  const elementId = event.currentTarget.id;

  try {
    window.location.href = `changeFolderPg/${elementId}`;
  } catch (error) {
    console.error("Error:", error);
  }
}

changeBtns.forEach((button) => {
  button.addEventListener("click", handlechangeBtn);
});

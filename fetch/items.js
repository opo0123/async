window.addEventListener("load", () => {
  fetch("items.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const itemContainer = document.querySelector("#items");

      data.forEach((item) => {
        // div 생성 (item 카드)
        const itemElement = document.createElement("div");
        // div class를 item으로
        itemElement.classList.add("item");

        itemElement.innerHTML = `<img src="${item.image}" alt="${item.title}">
           <h3>${item.title}</h3>`;

        // 부모(itemContainer)에 자식 추가(itemElement)
        itemContainer.appendChild(itemElement);

        // 클릭 이벤트
        itemElement.addEventListener("click", () => {
          showDetail(item);
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });

  // 클릭 이벤트 실행
  function showDetail(item) {
    const detailContainer = document.querySelector("#detail");
    detailContainer.innerHTML = `<img src="${item.image}" alt="${item.title}">
          <h2>${item.title}</h2>
          <p>${item.description}</p>`;
  }
});

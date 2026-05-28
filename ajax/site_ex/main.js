window.addEventListener("load", () => {
  const wrap = document.querySelector("#wrap");
  const tabBtn = document.querySelectorAll(".tab-btn");

  // 서버 요청 객체 생성
  const xhr = new XMLHttpRequest();

  // json 요청
  xhr.open("GET", "data.json", true);

  // 데이터 도착
  xhr.onload = function () {
    // 요청 성공
    if (xhr.status === 200) {
      // 문자열 -> 객체 변환
      const data = JSON.parse(xhr.responseText);

      // 상품 출력 함수
      function renderProduct(items) {
        // 기존 내용 제거 (초기화)
        wrap.innerHTML = "";

        // items 하나씩 꺼내기 (배열 반복)
        items.forEach((item) => {
          // console.log(item); // 하나씩 분리

          // 숫자로 변환
          const price = Number(item.price);
          const sale = Number(item.sale);

          // 할인 가격 계산
          const discountPrice = price - (price * sale) / 100;

          // 화면 출력
          wrap.innerHTML += `
          <div class="card">
          <!-- 할인뱃지 -->
          <span class="sale-badge"> ${sale}% OFF </span>
          <!-- 이미지 --><div class="img-box">
          <img src="${item.img}" alt="${item.alt}" /></div>
          <div class="text">
            <!-- 상품명 -->
            <h2>${item.title}</h2>
            <!-- 설명 -->
            <p class="desc">${item.desc}</p>
            <!-- 가격 -->
            <div class="price-box">
              <!-- 원래 가격 -->
              <p class="origin-price">${price.toLocaleString()}원</p>
              <!-- 할인 가격 -->
              <p class="sale-price">${discountPrice.toLocaleString()}원</p>
            </div>
            <button class="buy-btn">구매하기</button>
          </div>
        </div>`;
        });
      }

      // 처음부터 실행
      renderProduct(data);

      // 탭 버튼 클릭 시
      tabBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
          // 모든 버튼 active 제거
          tabBtn.forEach((item) => {
            item.classList.remove("active");
          });
          // 클릭한 버튼만 active 추가
          this.classList.add("active");

          // data-tab 값 가져오기
          const btnTab = btn.dataset.tab; // bnt = this

          // ALL이면 전체 출력, 아니면 해당 category만 출력
          if (btnTab === "all") {
            renderProduct(data);
          } else {
            const filterData = data.filter((item) => item.category === btnTab);
           
            // filter 실행
            renderProduct(filterData);
          }
        });
      });
    }
  };

  // 데이터 보내기
  xhr.send();
});

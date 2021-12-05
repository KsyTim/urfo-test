const inputLeft = document.getElementById("input-left"),
    inputRight = document.getElementById("input-right"),
    thumbLeft = document.querySelector(".slider .thumb.left"),
    thumbRight = document.querySelector(".slider .thumb.right"),
    range = document.querySelector(".slider .range"),
    inputLeftText = document.querySelector('.input-left'),
    inputRightText = document.querySelector('.input-right'),
    setLeftValue = () => {
      const _this = inputLeft,
        min = parseInt(_this.min),
        max = parseInt(_this.max);

      _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

      const percent = ((_this.value - min) / (max - min)) * 100;

      thumbLeft.style.left = percent + "%";
      range.style.left = percent + "%";
      inputLeftText.innerHTML = `${parseInt(_this.value)>=10000 ? _this.value.replace(/[0]{3}/g, ' 000') : _this.value}<sup>₽</sup>`;
    },
    setRightValue = () => {
      const _this = inputRight,
        min = parseInt(_this.min),
        max = parseInt(_this.max);

      _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

      const percent = ((_this.value - min) / (max - min)) * 100;

      thumbRight.style.right = (100 - percent) + "%";
      range.style.right = (100 - percent) + "%";
      inputRightText.innerHTML = `${parseInt(_this.value) >= 10000 ? _this.value.replace(/[0]{3}/g, ' 000') : _this.value}<sup>₽</sup>`;
    },
    equipmentItem = document.querySelectorAll('.equipment__items__item'),
    addSaleInfo = (elem) => {
      const oldPrice = 
      `
        <div class="equipment__items__price_old">
          <span>5 890<sup>₽</sup></span>
        </div>
      `,
      saleMark = 
      `
        <div class="equipment__items__sale">
          <span class="equipment__items__sale-text">Акция</span>
        </div>
      `;
      elem.querySelector('.equipment__items__price').insertAdjacentHTML('beforeend', oldPrice);
      elem.insertAdjacentHTML('beforeend', saleMark);
    },
    setSale = () => {
      equipmentItem.forEach((elem, index) => {
       if (index === 1 || index === 7)  addSaleInfo(elem); 
      })
    },
    filterElem = document.querySelector('.equipment__filter'),
    modalOverlay = document.querySelector('.modal__overlay');

  setLeftValue();
  setRightValue();
  setSale();

  inputLeft.addEventListener("input", setLeftValue);
  inputRight.addEventListener("input", setRightValue);
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.matches('.equipment__info__img') || target.matches('.equipment__info__total') || target.matches('#equipment-filter')) {
      modalOverlay.classList.add('modal__overlay_visible');
      filterElem.style.display = 'block';
      filterElem.classList.add('equipment__filter_hugescreen_visible');
      document.querySelector('body').style.overflow = 'hidden';
    } else if (target.matches('.modal_close') || target.matches('.modal__overlay_visible')) {
      modalOverlay.classList.remove('modal__overlay_visible');
      filterElem.style.display = 'none';
      filterElem.classList.remove('equipment__filter_hugescreen_visible');
      document.querySelector('body').style.overflow = 'unset';
    } 
  })
  // window.addEventListener('resize', () => {
    
  // })

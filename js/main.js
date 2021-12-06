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
    modalOverlay = document.querySelector('.modal__overlay'),
    goodsContainer = document.querySelector('.equipment__goods'),
    goodsItem = document.querySelectorAll('.equipment__items__item'),
    equipmentItems = document.querySelector('.equipment__items'),
    removeSale = (elem) => {
      if (elem) {
        const oldPrice = elem.querySelector('.equipment__items__price_old'),
          saleInfo = elem.querySelector('.equipment__items__sale');
        if (oldPrice && saleInfo) {
          oldPrice.remove();
          saleInfo.remove();
        }  
      } 
    },
    hideGoods = () => {
      if (document.documentElement.offsetWidth <= 480) {
        const moreButton = 
        `
          <div class="equipment__goods__more">
            <a href="#" class="equipment__goods__more_show">Показать еще</a>
          </div> 
        `;
        goodsItem.forEach((elem, index) => {
          if (index > 7) {
            elem.style.display = 'none';
          } else if (index === 7) {
            removeSale(elem);
          }  
        })
        goodsContainer.insertAdjacentHTML('beforeend', moreButton);
      } 
    },
    moreGoods = () => {
      if (document.documentElement.offsetWidth <= 480) {
        const firstItem = 
        `
        <div class="equipment__items__item">
          <div class="equipment__items__content">
            <img src="./img/sections/equipment/item_01.png" alt="Equipment: Item 01" class="equipment__items__pic">
            <p class="equipment__items__title">Биметаллический радиатор Royal Thermo Indigo Super
            </p>
          </div>
          <div class="equipment__items__cost">
            <div class="equipment__items__price">
              <span>4 250<sup>₽</sup></span>
            </div>
            <a class="equipment__items__cart">
              <img src="./img/sections/equipment/cart.svg" alt="" class="equipment__items__cart-pic">
            </a>
          </div>
        </div>
        `;
        for(let i = 0; i < 2; i++) {
          equipmentItems.insertAdjacentHTML('beforeend', firstItem);
        }
        document.querySelectorAll('.equipment__items__item').forEach((elem, index) => {
          if (index === 0) {
            addSaleInfo(elem); 
            elem.querySelector('.equipment__items__sale').remove();
            
          } 
          elem.querySelector('.equipment__items__price span').textContent = '13 890';

        })
      }
    };

setLeftValue();
setRightValue();
setSale();
// hideGoods();
moreGoods();

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
  } else if (target.matches('.main-header__btn__item')) {
    if (document.documentElement.offsetWidth <= 768) {
      document.querySelector('.modal__menu_mobile').style.display = 'block';
      document.querySelector('body').style.overflow = 'hidden';
    }
  } else if (target.closest('a') && target.closest('a').matches('.modal__menu_close')) {
    document.querySelector('.modal__menu_mobile').style.display = 'none';
    document.querySelector('body').style.overflow = 'unset';
  } else if (target.matches('#search-form-input') || target.closest('button') && target.closest('button').matches('.main-header__search-icon')) {
    if (document.documentElement.offsetWidth <= 768) {
      document.querySelector('.modal__search_mobile').style.display = 'block';
      document.querySelector('body').style.overflow = 'hidden';
    }
  } else if (target.closest('a') && target.closest('a').matches('.modal__search_close')) {
    document.querySelector('.modal__search_mobile').style.display = 'none';
    document.querySelector('body').style.overflow = 'unset';
  }
  // console.log(target);
})

window.addEventListener('resize', moreGoods);

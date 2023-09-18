class Slider {
   static #content = null
   static #left = null
   static #right = null

   // count це поточна картинка яка показується в слайдері
   static #count = 1
   // число максимальної к-ті картинок
   static #max = null

   // створимо static init де ми підключимо всі потрібні значення

   static init = () => {
      this.#content = document.querySelector(
         '.slider__content',
      )
      this.#left = document.querySelector(
         '.slider__button--left',
      )
      this.#right = document.querySelector(
         '.slider__button--right',
      )

      this.#max = this.#content.childElementCount

      // підключимо на кнопку ф-ю яка буде повертати виконання ф-ї #slide
      this.#left.onclick = () => this.#slide('left')
      this.#right.onclick = () => this.#slide('right')
   }

   // метод який буде прокручувати наші картинки. side - буде left or right - напрямок в який ми прокручуємо
   static #slide = (side) => {
      // нам потрібно дізнатися поточну інформацію щоб виконати прокрутку

      //  містить ширину елемента this.#content, включаючи ширину видимої області контенту та ширину внутрішньої прокрутки (якщо вона є)
      const offsetWidth = this.#content.offsetWidth
      // вказує на кількість пікселів, на які елемент this.#content був прокручений вліво від свого лівого краю.
      const scrollLeft = this.#content.scrollLeft
      // містить загальну ширину елемента this.#content, включаючи будь-який прихований (за межами видимої області) контент, якщо він існує.
      const scrollWidth = this.#content.scrollWidth

      let scroll = 0

      if (side === 'left') {
         if (this.#count === 1 || scrollLeft === 0) {
            this.#count = this.#max
            scroll = (this.#count - 1) * offsetWidth
         } else {
            this.#count -= 1
            scroll = (this.#count - 1) * offsetWidth
         }
      }

      if (side === 'right') {
         if (
            this.#count === this.#max ||
            scrollLeft === scrollWidth - offsetWidth
         ) {
            this.#count = 1
            scroll = 0
         } else {
            this.#count += 1
            scroll = (this.#count - 1) * offsetWidth
         }
      }

      this.#content.scrollTo({
         top: 0,
         left: scroll,
         behavior: 'smooth',
      })
   }
}

document.addEventListener('DOMContentLoaded', () => {
   Slider.init()
})

class Header {
   static #height = null
   static #wrapper = null
   static #button = null

   static #isOpen = false

   static init() {
      this.#height = document.querySelector(
         '.header__bottom',
      ).offsetHeight
      this.#wrapper = document.querySelector(
         '.header__wrapper',
      )
      this.#button = document.querySelector('.header__button')

      this.#button.onclick = this.#toggle;
   }

   static #toggle = () => {
      if (this.#isOpen) {
         this.#button.classList.replace(
            'header__button--open',
            'header__button--close',
         )

         this.#wrapper.style.height = 0
      } else {
         this.#button.classList.replace(
            'header__button--close',
            'header__button--open',
         )
         this.#wrapper.style.height = `${this.#height}px`
      }

      this.#isOpen = !this.#isOpen
   }
}

document.addEventListener('DOMContentLoaded', () => {
   Header.init()
})

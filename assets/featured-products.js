import './featured-products.scss';

customElements.define(
  'add-to-cart-button',
  class extends HTMLButtonElement {
    constructor() {
      super();
      this.originalText = this.textContent;
    }

    connectedCallback() {
      this.addEventListener('click', this.addToCart.bind(this));
    }

    async addToCart() {
      const variantId = this.dataset.variantId;
      if (!variantId) {
        console.error('Missing variant ID');
        return;
      }

      try {
        this.disabled = true;
        this.textContent = 'Adding...';

        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ id: parseInt(variantId), quantity: 1 }] }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        this.dispatchEvent(new CustomEvent('cart:updated', { bubbles: true }));

        const section = this.closest('[data-section-id]');
        const sectionId = section?.dataset.sectionId;

        if (!section || !sectionId) {
          console.warn(`Section not found: data-section-id=${sectionId}`);
          return;
        }

        const sectionResponse = await fetch(`?section_id=${sectionId}`, {
          headers: { Accept: 'text/html' },
        });
        if (!sectionResponse.ok) {
          throw new Error(`Failed to fetch section: ${sectionResponse.status}`);
        }

        const sectionHtml = await sectionResponse.text();
        if (!sectionHtml.trim()) {
          console.warn('Empty section response');
          return;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(sectionHtml, 'text/html');
        const newSection = doc.querySelector(`#shopify-section-${sectionId}`);

        if (newSection) {
          section.replaceWith(newSection);
        }
        this.textContent = 'Added!';
      } catch (error) {
        console.error('Add to cart error:', error);
        alert('Failed to add product to cart. Please try again.');
        this.textContent = this.originalText;
        this.disabled = false;
      }
    }

    disconnectedCallback() {
      this.removeEventListener('click', this.addToCart);
    }
  },
  { extends: 'button' }
);

document.addEventListener('cart:updated', async () => {
  try {
    const bubbleResponse = await fetch('/?section_id=cart-icon-bubble');
    if (!bubbleResponse.ok) {
      console.warn(`Failed to fetch cart-icon-bubble: ${bubbleResponse.status}`);
      return;
    }
    const bubbleData = await bubbleResponse.text();
    const cartBubble = document.querySelector('#cart-icon-bubble');
    if (cartBubble && bubbleData.trim()) {
      cartBubble.innerHTML = bubbleData;
    } else {
      console.warn('Cart bubble not found or data empty');
    }

    const drawerResponse = await fetch('/cart?view=ajax');
    if (!drawerResponse.ok) {
      console.warn(`Failed to fetch cart drawer: ${drawerResponse.status}`);
      return;
    }
    const drawerData = await drawerResponse.text();
    const cartDrawer = document.querySelector('cart-drawer');
    if (cartDrawer && drawerData.trim()) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = drawerData;
      const newDrawerContent = tempDiv.querySelector('cart-drawer');
      if (newDrawerContent) {
        cartDrawer.innerHTML = newDrawerContent.innerHTML;
        cartDrawer.classList.add('active');
      } else {
        console.warn('Cart drawer content not found in response');
      }
    } else {
      console.warn('Cart drawer not found or data empty');
    }
  } catch (error) {
    console.error('Cart update error:', error);
  }
});

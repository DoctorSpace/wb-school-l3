import { Component } from '../component';
import { Product } from '../product/product';
import html from './favorites.tpl.html';
import { ProductData } from 'types';
import { favoritesService } from '../../services/favorites.service';

class Favorites extends Component {
  products!: ProductData[];

  async render() {
    this.products = await favoritesService.get();

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: true });
      productComp.render();
      productComp.attach(this.view.cart);
    });


    this.view.btnClear.onclick = this._clearFavorites.bind(this);
  }

  private async _clearFavorites() {
    await favoritesService.clear();
    await this.render()
  }
}

export const favoritesComp = new Favorites(html);
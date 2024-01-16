import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTips.tpl.html';
import { Component } from '../component';

const SearchTipsName: string[] = ['чехол iphone 13 pro', 'коляски agex', 'яндекс станция 2'];
const baseURL: string = 'https://www.wildberries.ru/catalog/0/search.aspx?search='

class SearchTips extends Component {
  view: View;

  constructor(props: any) {
    super(props);
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  private createElement = (tag: string, className: string, text?: string, link?: string) => {
    const elem = document.createElement(tag);
    elem.className = className;
    if (text) elem.textContent = text;

    if (link) {
      if (tag === 'a') {
        (elem as HTMLAnchorElement).href = link;
        (elem as HTMLAnchorElement).target = '_blank';
      }
    }

    return elem;
  };

  addSearchTips(SearchTips: string[]): Element {
    const tipsContainer = this.view.root.querySelector('.search__examples');

    if (!tipsContainer) {
      throw new Error('tipsContainer not found');
    }

    tipsContainer.appendChild(this.createElement('span', 'search__normal-text', 'Например,'));

    SearchTips.forEach((SearchTip, index) => {
      const link = `${baseURL}${SearchTip}`;

      const tipExampleElem = this.createElement('div', 'search__example');
      tipExampleElem.appendChild(this.createElement('a', 'search__example-text', SearchTip, link));
      tipsContainer.appendChild(tipExampleElem);

      if (index == SearchTips.length - 1) {
      } else if (index == SearchTips.length - 2) {
        tipsContainer.appendChild(this.createElement('span', 'search__normal-text', 'или'));
      } else {
        tipsContainer.appendChild(this.createElement('span', 'search__normal-text_comma', ','));
      }
    });

    return tipsContainer;
  }

  async render() {
    if (SearchTipsName.length == 0 && this.view.root.parentElement) {
      this.view.root.parentElement.classList.add('hide');
      return;
    }

    this.view.root.appendChild(this.addSearchTips(SearchTipsName));
  }
}

export default new SearchTips(html);

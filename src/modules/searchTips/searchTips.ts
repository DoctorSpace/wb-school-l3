import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTips.tpl.html';
import { Component } from '../component';

const SearchTipsName = ['чехол iphone 13 pro', 'коляски agex', 'яндекс станция 2']

class SearchTips extends Component {
  view: View;

  constructor(props: any) {
    super(props);
    this.view = new ViewTemplate(html).cloneView();
  }


  private createElement = (tag: string, className: string, text?: string) =>{
    const elem = document.createElement(tag);
    elem.className = className;
    if (text) elem.textContent = text;
    return elem;
  }

  addSearchTips(SearchTips: string[]){

    const tipsContainer = this.view.root.querySelector('.search__examples');

    if (!tipsContainer) {
      throw new Error('tipsContainer not found');
    }

    tipsContainer.appendChild(this.createElement('span', 'search__normal-text', 'Например,'));

    SearchTips.forEach((SearchTip, index) => {

        const tipExampleElem = this.createElement('div', 'search__example');
        tipExampleElem.appendChild(this.createElement('span', 'search__example-text', SearchTip));
        tipExampleElem.addEventListener('click', () => {
            this.view.searchInput.value = SearchTip;
        });

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
    if (SearchTipsName.length == 0) {
        this.view.root.classList.add('is__empty');
        return
    }

    this.view.root.appendChild(this.addSearchTips(SearchTipsName));
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }
}

export default new SearchTips(html);

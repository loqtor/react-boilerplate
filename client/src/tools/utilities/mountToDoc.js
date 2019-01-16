/*
 * Utility to provide aXe with a fake DOM to allow for accessibility testing
 * on mounted components within our Jest tests
*/
import { mountWithIntl } from './enzymeIntlTestHelper';

let wrapper;

export default function mountToDoc(component) {
  const container = mountWithIntl(component);

  if (!wrapper) {
    wrapper = document.createElement('main');
    document.body.appendChild(wrapper);
  }

  wrapper.innerHTML = '';
  wrapper.appendChild(container.getDOMNode());

  return container;
}

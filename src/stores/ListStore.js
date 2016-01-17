import Immutable from 'immutable';

import Alt from '../Alt';
import ListActions from '../actions/ListActions';

class ListStore {
  constructor() {
    this.items = new Immutable.List();
    this.auxItems = new Immutable.List();

    this.bindListeners({
      handleUpdateItems: ListActions.UPDATE_ITEMS,
      handleAddItem: ListActions.ADD_ITEM,
      handleRemoveItem: ListActions.REMOVE_ITEM,
      handleEditItem: ListActions.EDIT_ITEM,
      handleSearchItem: ListActions.SEARCH_ITEM
    });
  }

  handleUpdateItems(items) {
    this.items = Immutable.fromJS(items);
    this.auxItems = Immutable.fromJS(items);
  }

  handleAddItem(item) {
    this.items = this.auxItems.push(Immutable.fromJS(item));
    this.auxItems = this.auxItems.push(Immutable.fromJS(item));
  }

  handleRemoveItem(index) {
    this.items = this.auxItems.delete(index);
    this.auxItems = this.auxItems.delete(index);
  }

  handleEditItem({ index, item }) {
    this.items = this.auxItems.set(index, Immutable.fromJS(item));
    this.auxItems = this.auxItems.set(index, Immutable.fromJS(item));
  }

  handleSearchItem({ query, predicate }) {
    if (query === '') {
      this.items = this.auxItems.slice();
      return;
    }
    this.items = this.auxItems.filter((item) => predicate(item.toJS(), query));
  }
}

export default Alt.createStore(ListStore, 'ListStore');

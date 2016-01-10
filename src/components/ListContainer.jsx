import AltContainer from 'alt/AltContainer';
import React from 'react';

import ListActions from '../actions/ListActions';
import ListStore from '../stores/ListStore';

import List from './List';

class ListContainer extends React.Component {
  componentDidMount() {
    ListActions.updateItems(this.props.initialItems);
  }

  addItem(item) {
    ListActions.addItem(item);
  }

  removeItem(index) {
    ListActions.removeItem(index);
  }

  editItem(index, newItem) {
    ListActions.editItem(index, newItem);
  }

  render() {
    return (
      <AltContainer store={ListStore}>
        <List
          itemSearchPredicate={this.props.itemSearchPredicate}
          itemSearchContent={this.props.itemSearchContent}
          showItemSearch={this.props.showItemSearch}
          itemContent={this.props.itemContent}
          onItemRemove={this.props.onItemRemove}
          onItemEdit={this.props.onItemEdit}
          onItemSearch={this.props.onItemSearch}
          emptyItemsText={this.props.emptyItemsText}/>
      </AltContainer>
    );
  }
}

ListContainer.propTypes = {
  itemSearchPredicate: React.PropTypes.func.isRequired,
  itemSearchContent: React.PropTypes.element,
  showItemSearch: React.PropTypes.bool,
  itemContent: React.PropTypes.element,
  initialItems: React.PropTypes.arrayOf(React.PropTypes.object),
  onItemRemove: React.PropTypes.func,
  onItemEdit: React.PropTypes.func,
  onItemSearch: React.PropTypes.func,
  emptyItemsText: React.PropTypes.string
};

export default ListContainer;

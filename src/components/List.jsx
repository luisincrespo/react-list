import React from 'react';

import Item from './Item';
import DefaultItemSearchContent from './DefaultItemSearchContent';
import DefaultItemsEmptyContent from './DefaultItemsEmptyContent';

import CustomPropTypes from '../utils/propValidators';

import ListActions from '../actions/ListActions';

class List extends React.Component {
  _onQueryChange(query) {
    ListActions.searchItem(query, this.props.itemSearchPredicate);

    this.props.onItemSearch(query);
  }

  render() {
    return (
      <div>
        {this.props.showItemSearch ? (
          <this.props.itemSearchContent
            onQueryChange={this._onQueryChange.bind(this)}/>
        ) : null}
        <ul>
          {this.props.items.isEmpty() ? ( // eslint-disable-line
            <this.props.itemsEmptyContent/>
          ) : this.props.items.map((item, i) => { // eslint-disable-line
            return (
              <Item
                key={i}
                item={item}
                index={i}
                itemContent={this.props.itemContent}
                onItemRemove={this.props.onItemRemove}
                onItemEdit={this.props.onItemEdit}/>
            );
          })}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  showItemSearch: React.PropTypes.bool,
  itemSearchContent: React.PropTypes.element,
  itemSearchPredicate: CustomPropTypes.itemSearchPredicate,
    // (item: object, query: string) => bool
  onItemSearch: React.PropTypes.func, // (query: string) => void
  itemContent: React.PropTypes.element,
  onItemRemove: React.PropTypes.func, // (index: number, item: object) => void
  onItemEdit: React.PropTypes.func,
    // (index: number, oldItem: object, newItem: object) => void
  itemsEmptyContent: React.PropTypes.element
};

List.defaultProps = {
  showItemSearch: false,
  itemSearchContent: DefaultItemSearchContent,
  itemSearchPredicate: () => true,
  onItemSearch: () => null,
  itemsEmptyContent: DefaultItemsEmptyContent
};

export default List;

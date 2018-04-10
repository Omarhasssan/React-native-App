import React, { Component } from 'react';
import Search from '../components/Search';
import SearchResults from '../containers/SearchResults';
import SelectedData from '../containers/SelectedData';
import Spinner from '../components/Spinner';
import { List, ListItem, CheckBox } from 'react-native-elements';
var _ = require('lodash');
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';

export default (withSearchContainer = (
  dispatchGetData,
  data,
  renderHeaderRight,
  setCheckedItems,
  loadCheckedItems,
  settings,
) =>
  class extends Component {
    state = {
      data: '',
      text: '',
      loading: false,
    };
    static navigationOptions({ navigation }) {
      if (navigation.state.params) {
        console.log('a', navigation.state.params.prps.onSetTeamPlayers);
        return {
          headerRight: renderHeaderRight(
            navigation.state.params.checkedItems,
            navigation,
            navigation.state.params.prps,
          ),
        };
      }
    }
    componentWillMount() {
      const { navigation, clearCheckedItems } = this.props;
      loadCheckedItems(this.props);
      this.setState({ loading: true });
      dispatchGetData(this.props);
    }
    componentWillReceiveProps(nextProps) {
      if (
        Object.keys(nextProps.checkedItems).length !==
          Object.keys(this.props.checkedItems).length ||
        !this.isEqual(nextProps.checkedItems, this.props.checkedItems)
      ) {
        this.updateCheckedItems(nextProps.checkedItems);
        setCheckedItems(nextProps.checkedItems, this.props);
      }
      if (data(nextProps).length) {
        this.setState({ data: nextProps.players });
        this.setState({ loading: false });
      }
    }
    isEqual(arr1, arr2) {
      for (var k1 in arr1) {
        let fnd = false;
        for (var k2 in arr2) if (k1 == k2) fnd = true;
        if (!fnd) return false;
      }
      return true;
    }
    updateCheckedItems(checkedItems) {
      const { navigation } = this.props;
      if (navigation)
        navigation.setParams({
          checkedItems: Object.keys(checkedItems),
          prps: this.props,
        });
    }

    render() {
      const { data, text, loading } = this.state;
      const { checkedItems, addCheckedItem, removeCheckedItem, clearCheckedItems } = this.props;
      if (loading) return <Spinner />;
      this.selectedData = [];
      this.filteredData = [];
      if (text.length) {
        this.filteredData = data.filter(d => d.name.includes(text));
      } else this.filteredData = data;
      for (var k in checkedItems) this.selectedData.push(data.filter(d => d.id == k)[0]);
      return (
        <View style={{ flex: 1 }}>
          <Search onChangeText={text => this.setState({ text })} />
          <SelectedData
            selectedData={this.selectedData}
            onRemove={key => removeCheckedItem(key)}
            checkedItems={checkedItems}
          />
          <View style={{ height: `${100}%` }}>
            <SearchResults
              onCheck={(key, value) => {
                if (!value) removeCheckedItem(key);
                else if (settings.singleCheck) {
                  clearCheckedItems();
                  addCheckedItem(key);
                } else addCheckedItem(key);
              }}
              checkedItems={checkedItems}
              data={this.filteredData}
            />
          </View>
        </View>
      );
    }
  });

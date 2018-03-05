import React, { Component } from 'react';
import Search from '../components/Search';
import SearchResults from '../containers/SearchResults';
import SelectedData from '../containers/SelectedData';
import Spinner from '../components/Spinner';
import { List, ListItem, CheckBox } from 'react-native-elements';

import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
const arr = [];
export default (withSearchContainer = (dispatchGetData, data, renderHeaderRight) =>
  class extends Component {
    state = {
      data: '',
      text: '',
      allCheckedItems: [],
      loading: false,
    };
    static navigationOptions({ navigation }) {
      if (navigation.state.params) {
        return {
          headerRight: renderHeaderRight(navigation.state.params.prps),
        };
      }
    }
    componentWillMount() {
      const { allCheckedItems } = this.state;
      this.props.navigation.setParams({
        prps: { ...this.props },
      });
      this.setState({ loading: true });
      dispatchGetData(this.props);
    }
    componentWillReceiveProps(nextProps) {
      if (data(nextProps).length) {
        this.setState({ data: nextProps.players });
        this.setState({ loading: false });
      }
    }
    update(selectedData) {
      this.playersId = selectedData.map(s => s.id);
      this.props.navigation.setParams({
        prps: { ...this.props, checkedData: this.playersId },
      });
    }

    render() {
      const { data, loading, text, allCheckedItems } = this.state;
      if (loading) return <Spinner />;
      this.selectedData = [];
      this.filteredData = [];
      if (text.length) {
        this.filteredData = data.filter(d => d.name.includes(text));
      } else this.filteredData = data;
      for (var k in allCheckedItems)
        if (allCheckedItems[k] == true) this.selectedData.push(data.filter(d => d.id == k)[0]);

      return (
        <View>
          <Search onChangeText={text => this.setState({ text })} />
          <SelectedData
            selectedData={this.selectedData}
            onCheck={key => {
              this.temp = [];
              for (var k in this.state.allCheckedItems)
                this.temp[k] = this.state.allCheckedItems[k];
              this.temp[key] = false;
              this.setState({ allCheckedItems: this.temp }, () => {
                this.update(this.selectedData);
              });
            }}
          />
          <SearchResults
            onCheck={checkedItems => {
              this.temp = [];
              for (var k in checkedItems) this.temp[k] = checkedItems[k];
              this.setState({ allCheckedItems: this.temp }, () => {
                this.update(this.selectedData);
              });
            }}
            data={this.filteredData}
            allCheckedItems={allCheckedItems}
          />
        </View>
      );
    }
  });

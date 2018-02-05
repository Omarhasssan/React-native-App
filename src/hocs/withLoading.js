import React, { Component } from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';

export default (withLoading = (WrappedComponent, loading) =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: loading(this.props),
      };
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
        loading: loading(nextProps),
      });
    }

    render() {
      if (this.state.loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  });

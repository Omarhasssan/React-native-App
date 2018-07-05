import React, { Component } from 'react';
import Spinner from '../components/Spinner';

export default (withLoadData = WrappedComponent =>
  class extends Component {
    componentDidMount() {
      this.props.loadData();
    }
    render() {
      const { dataLoaded } = this.props;

      if (dataLoaded) return <WrappedComponent {...this.props} />;
      return <Spinner />;
    }
  });

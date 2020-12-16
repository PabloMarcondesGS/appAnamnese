import React from 'react';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';

import {Container} from './styles';

const Webview = ({route}) => {
  const {url} = route.params;
  return (
    <Container>
      <WebView source={{uri: url}} style={{flex: 1}} />
    </Container>
  );
};

Webview.propTypes = {
  route: PropTypes.node.isRequired,
};

export default Webview;

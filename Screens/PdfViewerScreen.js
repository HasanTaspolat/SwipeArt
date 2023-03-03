import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'react-native-fetch-blob';
import RNBlobUtil from 'react-native-blob-util';

const PdfViewerScreen = ({ source }) => {
  return (
    <View style={styles.container}>
      <Pdf source={source} style={styles.pdf} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
});

export default PdfViewerScreen;
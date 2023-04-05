import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
// import {Arrowleft, Filter} from '../icons';
import theme from './styling';
function Navbar({title, onBackClicked, onFilterClicked, back, filter = false}) {
  return (
    <View style={styles.container}>
      <Text>hello</Text>
      {/* <Text style={styles.title}>{title}</Text> */}
      {/* {filter ? (
        <TouchableOpacity
          style={styles.filter}
          onPress={() => onFilterClicked()}>
          <Filter stroke={theme.colors.blue} />
        </TouchableOpacity>
      ) : null}

      {back ? (
        <TouchableOpacity style={styles.back} onPress={() => onBackClicked()}>
          <Arrowleft stroke={theme.colors.blue} />
        </TouchableOpacity>
      ) : null} */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5.84,
  },
  filter: {
    position: 'absolute',
    right: 10,
    top: 15,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 10,
    top: 15,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Navbar;

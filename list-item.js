/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import theme from './styling';

function AlertItem({userId, id, title, completed}) {
  const containerStyle = options => {
    return {
      borderWidth: 2,
      borderColor: theme.colors.gray,
      padding: 15,
      borderRadius: 3,
      //   flexDirection: 'row',
      //   justifyContent: 'space-between',
      shadowColor: theme.colors.gray,
      marginTop: 10,
      backgroundColor: theme.colors.white,
    };
  };

  return (
    <View style={containerStyle()}>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 15,
                  marginBottom: 5,
                  marginRight: 20,
                  color: theme.colors.black,
                }}>
                ID:
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  marginLeft: 35,
                  color: theme.colors.darkGray,
                }}>
                {id}
              </Text>
            </View>
            {/* <View style={{flexDirection:'row'}}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 12,
               marginBottom: 5,marginRight:20,

                color: theme.colors.black,
              }}>
              Completed
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '300',
                color: theme.colors.darkGray,
              }}>
              {completed}
            </Text>
          </View> */}
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 15,
                  marginBottom: 5,
                  marginRight: 20,
                  color: theme.colors.black,
                }}>
                User Id:
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',

                  color: theme.colors.darkGray,
                }}>
                {userId}
                {/* {Math.round(speed)} */}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 15,
                  marginBottom: 5,
                  marginRight: 20,
                  color: theme.colors.black,
                }}>
                Title:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  marginLeft: 20,

                  color: theme.colors.darkGray,
                }}>
                {title}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                height: 30,
                width: 30,
                borderRadius: 15,
                // marginLeft: 90,
              }}></TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
export default AlertItem;

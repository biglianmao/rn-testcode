/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
let img1 = require("./timg.png");
let img2 = require("./wx_logo.png");

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});
type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      img: img2,
      imgdata: ""
    };
  }

  updateText = text => {
    console.log(text);
    this.setState(priorstate => {
      return {
        url: text
      };
    });
  };

  loadBaiduImg = () => {
    this.setState(() => {
      return {
        img: { uri: "https://www.baidu.com/img/bd_logo1.png?where=super" }
      };
    });
  };

  loadEmImg = () => {
    this.setState(priorstate => {
      return {
        img: priorstate.img === img1 ? img2 : img1
      };
    });
  };

  onImageLoad = () => {
    console.log("load success");
  };

  loadBase64ImgX = () => {
    RNFetchBlob.fetch(
      "GET",
      "http://localhost:3000/img/splash.jpg"
    )
      // when response status code is 200
      .then(res => {
        // the conversion is done in native code
        let base64Str = "data:image/png;base64," + res.base64();
        console.log(base64Str);
        this.setState(() => {
          return {
            img: { uri: base64Str }
          };
        });
      })
      // Status code is not 200
      .catch((errorMessage, statusCode) => {
        // error handling
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={{}} onPress={this.loadEmImg}>
            <View style={styles.ViewButton}>
              <Text style={{ textAlign: "center" }}>加载内置图片</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{}} onPress={this.loadBaiduImg}>
            <View style={styles.ViewButton}>
              <Text style={{ textAlign: "center" }}>加载baidu图片</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{}} onPress={this.loadBase64ImgX}>
            <View style={styles.ViewButton}>
              <Text style={{ textAlign: "center" }}>加载Base64图片</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            autoCapitalize="none"
            placeholder="url"
            autoCorrect={false}
            onChangeText={this.updateText}
            value={this.state.url}
          />
        </View>
        <View style={{ height: 20 }} />
        <View>
          <Image
            source={this.state.img}
            style={{ width: 200, height: 200 }}
            onLoad={this.onImageLoad}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ViewButton: {
    backgroundColor: "green",
    height: 30,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

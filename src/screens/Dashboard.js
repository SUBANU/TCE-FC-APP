import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import Items from "../tabs/Items"
import Adds from "../tabs/Adds.js"
import Notification  from "../tabs/Notification";
import Orders from "../tabs/Orders";

import Transaction from "../tabs/Transaction"
const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (
        <Items/>
      ) : selectedTab == 1 ? (
        <Transaction />
      ) : selectedTab == 2 ? (
        <Adds />
      ) : selectedTab == 3 ? (
       <Orders />
      ) : (
        <Notification />
      )}
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(0);
          }}
        >
          <Image
            source={require("../images/product.png")}
            style={[styles.bottomTabImg,{tintColor:selectedTab==0?'red':'black'}]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(1);
          }}
        >
          <Image
            source={require("../images/transaction.png")}
            style={[styles.bottomTabImg,{tintColor:selectedTab==1?'red':'black'}]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(2);
          }}
        >
          <Image
            source={require("../images/add-item.png")}
            style={[styles.bottomTabImg, { width: 35, height: 35 },{tintColor:selectedTab==2?'red':'black'}]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(3);
          }}
        >
          <Image
            source={require("../images/checkout.png")}
            style={[styles.bottomTabImg,{tintColor:selectedTab==3?'red':'black'}]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(4);
          }}
        >
          <Image
            source={require("../images/notification.png")}
            style={[styles.bottomTabImg,{tintColor:selectedTab==4?'red':'black'}]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
  },
  bottomTab: {
    height: "100%",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTabImg: {
    width: 24,
    height: 24,
  },
});

import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { firebase } from "../../config";
import { TouchableOpacity } from "react-native-web";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const Items = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, [isFocused]);

  const getItems = () => {
    firebase
      .firestore()
      .collection("items")
      .get()
      .then((querySnapshot) => {
        console.log("Total users:", querySnapshot.size);
        let tempData = [];
        querySnapshot.forEach((documentSnapshot) => {
          console.log("user ID:", documentSnapshot.id, documentSnapshot.data());
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItems(tempData);
      });
  };

  const deleteItem = (docId) => {
    firebase
      .firestore()
      .collection("items")
      .doc(docId)
      .delete()
      .then(() => {
        console.log("User deleted");
        getItems();
      });
  };
  const renderImage = (item) => {
    const { imageUrl } = item.data;
    const source = { uri: imageUrl };
    return <Image source={source} style={styles.itemImage} />;
  };
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.itemView}>
              {/* <Image
                source={{uri: item.data.imageUrl }}
                style={styles.itemImage}
                onError={() => console.log("Image failed to load",item.data.imageUrl)}
              /> */}
              {renderImage(item)}

              <View style={styles.nameView}>
                <Text style={styles.nameText}>{item.data.name}</Text>
                <Text style={styles.descText}>{item.data.description}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>
                    {"$" + item.data.discountPrice}
                  </Text>
                  <Text style={styles.discText}>{"$" + item.data.price}</Text>
                </View>
              </View>
              <View style={{ margin: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("EditItems", {
                      data: item.data,
                      id: item.id,
                    });
                  }}
                >
                  <Image
                    source={require("../images/edit.jpg")}
                    style={[styles.icon, { marginBottom: 25 }]}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    deleteItem(item.id);
                  }}
                >
                  <Image
                    source={require("../images/delete.jpg")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemView: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: 20,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: "53%",
  },
  priceView: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
  },
  descText: {
    fontSize: 14,
    fontWeight: "600",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "700",
    color: "green",
  },
  discText: {
    fontSize: 17,
    fontWeight: "600",
    textDecorationLine: "line-through",
    marginLeft: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
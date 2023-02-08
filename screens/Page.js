import React, { useState, useEffect, useCallback } from "react";
import { getPharmacyList } from "../redux/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
export default function Page2() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let PharmacyList = useSelector((state) => state.myReducer.remotePharmacyList);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getPharmacyListAction(page);
  }, [page]);

  const getPharmacyListAction = useCallback(
    async (page) => {
      await dispatch(getPharmacyList(page));
    },
    [dispatch]
  );

  const onPressItem = useCallback(
    (item) => {
      dispatch({ type: "SELECTED_PHARMACY", payload: item });
      navigation.navigate("PharmacyDetailsModal");
    },
    [dispatch, navigation]
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={PharmacyList.items}
        onEndReachedThreshold={0.5}
        onEndReached={() => setPage(page + 1)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onPressItem(item);
              }}
            >
              <View style={styles.item}>
                <View style={styles.topItemSection}>
                  <View style={styles.topItemLeftSection}>
                    <Image
                      style={styles.PharmacyMainImage}
                      source={{
                        uri: "https://www.pharmaciengiphar.com/sites/default/files/styles/article/public/pharmacien-m%C3%A9dicaments_0.jpg",
                      }}
                    />
                  </View>

                  <View style={styles.topItemRightSection}>
                    <Text numberOfLines={1} style={styles.PharmacyTitle}>
                      {item.center.name}
                    </Text>
                    <Text style={styles.PharmacyAdress}>
                      {item.publicInformation.address.departmentCode +
                        " " +
                        item.publicInformation.address.city}
                    </Text>
                    <Text style={styles.PharmacyDistance}>à 752 mètres</Text>
                  </View>
                </View>

                <View style={styles.bottomItemSection}>
                  <View style={[styles.PharmacyHoursItems]}>
                    <Text style={styles.dayText}>Lun.</Text>
                    <Text style={styles.MonthText}>13/09</Text>
                  </View>

                  <View
                    style={[
                      styles.PharmacyHoursItems,
                      { backgroundColor: "#F2B5C0" },
                    ]}
                  >
                    <Text style={styles.hourText}>9:12</Text>
                  </View>

                  <View
                    style={[
                      styles.PharmacyHoursItems,
                      { backgroundColor: "#E5E5E5" },
                    ]}
                  >
                    <Text style={styles.hourText}>-</Text>
                  </View>

                  <View
                    style={[
                      styles.PharmacyHoursItems,
                      { backgroundColor: "#F2B5C0" },
                    ]}
                  >
                    <Text style={styles.hourText}>9:12</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0EDFE",
    padding: 10,
  },
  item: {
    flexGrow: 1,

    backgroundColor: "white",
    flexDirection: "column",
    width: "100%",

    marginTop: 5,
    marginBottom: 5,
    borderRadius: 15,
  },
  topItemSection: {
    flex: 1,
    flexDirection: "row",

    backgroundColor: "white",

    width: "100%",
    borderRadius: 15,
  },

  topItemLeftSection: {
    backgroundColor: "white",

    flex: 1,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },

  topItemRightSection: {
    backgroundColor: "white",

    flex: 2,
    borderTopRightRadius: 15,
  },

  bottomItemSection: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
    borderRadius: 15,
  },
  dayText: {
    color: "#68C8C2",
    fontSize: 14,
    fontWeight: "bold",
  },
  MonthText: {
    color: "#D9D9D9",
    fontSize: 14,
    fontWeight: "bold",
  },
  hourText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  PharmacyTitle: {
    color: "#68C8C2",
    fontSize: 25,
    fontWeight: "bold",
  },
  PharmacyAdress: {
    color: "#898989",
  },
  PharmacyDistance: {
    color: "#D9D9D9",
  },
  PharmacyMainImage: {
    width: "70%",
    height: "90%",
    borderRadius: 60,
  },

  PharmacyHoursItems: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    borderRadius: 10,
    marginTop: 5,
  },
});

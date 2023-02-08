import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import moment from "moment";

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;
export default function PharmacyDetails() {
  const navigation = useNavigation();
  let selectedPharmacyDetails = useSelector(
    (state) => state.myReducer.remoteSelectedPharmacy
  );

  const onPressBackButton = useCallback(
    (item) => {
      navigation.navigate("Root");
    },
    [navigation]
  );

  useEffect(() => {
    checkPharmacyOpeningStatus();
  }, []);

  const checkPharmacyOpeningStatus = useCallback(() => {
    const currentDay = moment().format("dddd").toUpperCase();
    const currentTime = moment().format("HH:mm");
    const startTime =
      selectedPharmacyDetails.publicInformation.officeInformation
        .openingSchedules[currentDay].schedules[0].startTime;
    const endTime =
      selectedPharmacyDetails.publicInformation.officeInformation
        .openingSchedules[currentDay].schedules[0].endTime;
    const openDay =
      selectedPharmacyDetails.publicInformation.officeInformation
        .openingSchedules[currentDay].isActive;

    var format = "HH:mm";
    var time = moment(currentTime, format),
      beforeTime = moment(startTime, format),
      afterTime = moment(endTime, format);
    if (time.isBetween(beforeTime, afterTime) && openDay) return true;
    else return false;
  });

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
              }}
            />
          </View>

          <View style={styles.body}>
            <Text style={styles.name}>Pharmacie</Text>
            <Text style={styles.info}>
              {selectedPharmacyDetails.center.name}
            </Text>

            <Text style={styles.name}>Adresse</Text>
            <Text style={styles.info}>
              {selectedPharmacyDetails.publicInformation.address.fullAddress}
            </Text>

            <Text style={styles.name}>Téléphone</Text>
            <Text style={styles.info}>
              {
                selectedPharmacyDetails.publicInformation.officeInformation
                  .phoneNumber
              }
            </Text>
            <Text style={styles.name}>Ouverture</Text>
            {checkPharmacyOpeningStatus() ? (
              <View
                style={[
                  styles.PharmacyHoursItems,
                  { backgroundColor: "green" },
                ]}
              >
                <Text style={styles.hourText}>Ouvert</Text>
              </View>
            ) : (
              <View
                style={[styles.PharmacyHoursItems, { backgroundColor: "red" }]}
              >
                <Text style={styles.hourText}>Fermé</Text>
              </View>
            )}

            <Text style={styles.name}>Description</Text>
            <Text style={styles.info} numberOfLines={8}>
              {selectedPharmacyDetails.publicInformation.officeDescription}
            </Text>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              onPressBackButton();
            }}
          >
            <Text style={styles.hourText}> Retour</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#E0EDFE",
    height: Height * 0.23,
  },
  footerContainer: {
    width: Width,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },

  scrollView: {
    marginHorizontal: 5,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginTop: Height * 0.1,
    alignSelf: "center",
  },

  PharmacyHoursItems: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    borderRadius: 10,
    marginTop: 5,
  },
  name: {
    fontSize: 22,
    color: "green",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    backgroundColor: "red",
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },

  hourText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

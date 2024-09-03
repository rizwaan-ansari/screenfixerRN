import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import HeaderTabBar from "../components/HeaderTabBar";

const FindLeads = () => {
  return (
    <>
      <SafeAreaView className="w-full flex-1 bg-brand">
        <HeaderTabBar />
      </SafeAreaView>
    </>
  )
}

export default FindLeads
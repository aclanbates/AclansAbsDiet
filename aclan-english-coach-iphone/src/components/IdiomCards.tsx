import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { idioms } from "../data/idioms";
import { theme } from "../theme";
import { Card } from "./Card";

export function IdiomCards() {
  return (
    <Card>
      <Text style={styles.title}>Today's 5 Idioms</Text>
      <Text style={styles.subtle}>
        Meaning, Turkish explanation, pronunciation hint, and speaking prompt.
      </Text>

      {idioms.map((item) => (
        <View key={item.idiom} style={styles.idiomBox}>
          <Text style={styles.idiom}>{item.idiom}</Text>
          <Text style={styles.text}>{item.meaning}</Text>
          <Text style={styles.turkish}>{item.turkish}</Text>
          <Text style={styles.example}>"{item.example}"</Text>
          <Text style={styles.note}>Pronunciation: {item.pronunciation}</Text>
          <Text style={styles.note}>Speaking: {item.speakingPrompt}</Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { color: theme.text, fontSize: 24, fontWeight: "800" },
  subtle: { color: theme.subtle, marginTop: 6, marginBottom: 14, fontSize: 15, lineHeight: 22 },
  idiomBox: {
    backgroundColor: theme.cardSoft,
    borderRadius: 18,
    padding: 15,
    marginTop: 12,
    borderColor: theme.border,
    borderWidth: 1
  },
  idiom: { color: theme.text, fontSize: 20, fontWeight: "800", lineHeight: 26 },
  text: { color: theme.muted, marginTop: 8, fontSize: 16, lineHeight: 23 },
  turkish: { color: theme.accentSoft, marginTop: 8, fontSize: 16, lineHeight: 23 },
  example: { color: theme.subtle, marginTop: 8, fontStyle: "italic", lineHeight: 22 },
  note: { color: theme.text, marginTop: 8, fontSize: 14, lineHeight: 20 }
});

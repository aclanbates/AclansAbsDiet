import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { grammarLessons } from "../data/grammar";
import { theme } from "../theme";
import { Card } from "./Card";

export function GrammarCoach() {
  return (
    <Card>
      <Text style={styles.title}>Grammar Coach</Text>
      <Text style={styles.subtle}>Your current high-impact correction patterns.</Text>

      {grammarLessons.map((lesson) => (
        <View key={lesson.title} style={styles.lesson}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.wrong}>Not natural: {lesson.wrong}</Text>
          <Text style={styles.correct}>Better: {lesson.correct}</Text>
          <Text style={styles.note}>{lesson.note}</Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { color: theme.text, fontSize: 24, fontWeight: "800" },
  subtle: { color: theme.subtle, marginTop: 6, marginBottom: 14, fontSize: 15, lineHeight: 22 },
  lesson: {
    backgroundColor: theme.cardSoft,
    padding: 15,
    borderRadius: 18,
    marginTop: 12,
    borderColor: theme.border,
    borderWidth: 1
  },
  lessonTitle: { color: theme.text, fontSize: 18, fontWeight: "800" },
  wrong: { color: theme.red, marginTop: 8, fontSize: 15, lineHeight: 22 },
  correct: { color: theme.green, marginTop: 6, fontSize: 15, lineHeight: 22 },
  note: { color: theme.muted, marginTop: 8, fontSize: 15, lineHeight: 22 }
});

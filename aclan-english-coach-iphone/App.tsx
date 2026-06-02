import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GrammarCoach } from "./src/components/GrammarCoach";
import { IdiomCards } from "./src/components/IdiomCards";
import { ProgressChecklist } from "./src/components/ProgressChecklist";
import { PronunciationPractice } from "./src/components/PronunciationPractice";
import { WeeklyQuiz } from "./src/components/WeeklyQuiz";
import { theme } from "./src/theme";

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.kicker}>Aclan English Coach</Text>
          <Text style={styles.title}>
            Grammar, idioms, pronunciation, and confident spoken English.
          </Text>
          <Text style={styles.subtitle}>
            A personal iPhone training app for daily idioms, grammar correction,
            self-recorded pronunciation practice, and weekly quizzes.
          </Text>
        </View>

        <ProgressChecklist />
        <PronunciationPractice />
        <IdiomCards />
        <GrammarCoach />
        <WeeklyQuiz />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.background },
  container: { padding: 18, paddingBottom: 40 },
  header: {
    backgroundColor: theme.backgroundSoft,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 28,
    padding: 22,
    marginBottom: 16,
    shadowColor: theme.shadow,
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 }
  },
  kicker: {
    color: theme.accent,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "900",
    marginBottom: 10
  },
  title: {
    color: theme.text,
    fontSize: 31,
    lineHeight: 38,
    fontWeight: "900"
  },
  subtitle: {
    color: theme.muted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 14
  }
});

import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { quizQuestions } from "../data/quiz";
import { theme } from "../theme";
import { Card } from "./Card";

export function WeeklyQuiz() {
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  return (
    <Card>
      <Text style={styles.title}>Weekly Quiz</Text>
      <Text style={styles.subtle}>Practice first. Reveal answers only after you try.</Text>

      {quizQuestions.map((q, index) => (
        <View key={q.question} style={styles.question}>
          <Text style={styles.questionText}>
            {index + 1}. {q.question}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Type your answer..."
            placeholderTextColor={theme.subtle}
            multiline
            value={answers[index] || ""}
            onChangeText={(value) => setAnswers((current) => ({ ...current, [index]: value }))}
          />
          {revealed && <Text style={styles.answer}>Answer: {q.answer}</Text>}
        </View>
      ))}

      <Pressable style={styles.button} onPress={() => setRevealed(!revealed)}>
        <Text style={styles.buttonText}>{revealed ? "Hide answers" : "Reveal answers"}</Text>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { color: theme.text, fontSize: 24, fontWeight: "800" },
  subtle: { color: theme.subtle, marginTop: 6, marginBottom: 14, fontSize: 15, lineHeight: 22 },
  question: {
    backgroundColor: theme.cardSoft,
    padding: 15,
    borderRadius: 18,
    marginTop: 12,
    borderColor: theme.border,
    borderWidth: 1
  },
  questionText: { color: theme.text, fontSize: 16, fontWeight: "700", lineHeight: 23 },
  input: {
    color: theme.text,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
    minHeight: 56,
    fontSize: 16,
    backgroundColor: theme.cardDeep
  },
  answer: { color: theme.green, marginTop: 10, fontSize: 15, lineHeight: 22 },
  button: {
    backgroundColor: theme.accent,
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    marginTop: 16,
    minHeight: 52,
    justifyContent: "center"
  },
  buttonText: { color: theme.background, fontWeight: "900", fontSize: 16 }
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";
import { Card } from "./Card";

const STORAGE_KEY = "aclan-english-coach-progress";

const tasks = [
  "Study today's 5 idioms",
  "Read the grammar cards",
  "Record one pronunciation sentence",
  "Listen back once",
  "Take or review the weekly quiz"
];

export function ProgressChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved) setChecked(JSON.parse(saved));
      })
      .catch(() => setChecked({}));
  }, []);

  const completed = useMemo(
    () => tasks.filter((task) => checked[task]).length,
    [checked]
  );

  async function toggle(task: string) {
    const next = { ...checked, [task]: !checked[task] };
    setChecked(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  async function reset() {
    setChecked({});
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  return (
    <Card>
      <Text style={styles.title}>Daily Progress</Text>
      <Text style={styles.subtle}>
        Completed {completed} of {tasks.length} practice steps today.
      </Text>

      <View style={styles.list}>
        {tasks.map((task) => {
          const isDone = !!checked[task];
          return (
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: isDone }}
              key={task}
              style={[styles.row, isDone && styles.rowDone]}
              onPress={() => toggle(task)}
            >
              <View style={[styles.checkBox, isDone && styles.checkBoxDone]}>
                <Text style={styles.checkText}>{isDone ? "✓" : ""}</Text>
              </View>
              <Text style={[styles.task, isDone && styles.done]}>{task}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable style={styles.buttonSecondary} onPress={reset}>
        <Text style={styles.buttonText}>Reset today</Text>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { color: theme.text, fontSize: 24, fontWeight: "800" },
  subtle: { color: theme.subtle, marginTop: 6, marginBottom: 14, fontSize: 15, lineHeight: 22 },
  list: { gap: 10 },
  row: {
    backgroundColor: theme.cardSoft,
    padding: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 58
  },
  rowDone: { borderColor: theme.green, borderWidth: 1 },
  checkBox: {
    width: 28,
    height: 28,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: "center",
    justifyContent: "center"
  },
  checkBoxDone: { backgroundColor: theme.green, borderColor: theme.green },
  checkText: { color: theme.background, fontWeight: "900", fontSize: 18 },
  task: { color: theme.text, fontSize: 16, flex: 1, lineHeight: 22 },
  done: { color: theme.green, textDecorationLine: "line-through" },
  buttonSecondary: {
    marginTop: 16,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    minHeight: 52
  },
  buttonText: { color: theme.text, fontWeight: "800", fontSize: 16 }
});

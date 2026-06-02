import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { pronunciationSentences } from "../data/pronunciation";
import { theme } from "../theme";
import { Card } from "./Card";

const RATING_KEY = "aclan-english-coach-pronunciation-ratings";
const ratings = ["Needs practice", "Good", "Mastered"];

export function PronunciationPractice() {
  const [index, setIndex] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [savedRatings, setSavedRatings] = useState<Record<string, string>>({});

  const current = pronunciationSentences[index];
  const rating = savedRatings[current.title] || null;

  useEffect(() => {
    AsyncStorage.getItem(RATING_KEY)
      .then((saved) => {
        if (saved) setSavedRatings(JSON.parse(saved));
      })
      .catch(() => setSavedRatings({}));
  }, []);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Microphone permission needed",
          "Please allow microphone access to record yourself."
        );
        return;
      }

      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });

      const result = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(result.recording);
      setUri(null);
    } catch {
      Alert.alert("Recording error", "Could not start recording.");
    }
  }

  async function stopRecording() {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const recordingUri = recording.getURI();
    setUri(recordingUri);
    setRecording(null);

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true
    });
  }

  async function playRecording() {
    if (!uri) return;

    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    const playback = await Audio.Sound.createAsync({ uri });
    setSound(playback.sound);
    await playback.sound.playAsync();
  }

  async function saveRating(value: string) {
    const next = { ...savedRatings, [current.title]: value };
    setSavedRatings(next);
    await AsyncStorage.setItem(RATING_KEY, JSON.stringify(next));
  }

  function nextSentence() {
    setIndex((value) => (value + 1) % pronunciationSentences.length);
    setUri(null);
  }

  return (
    <Card>
      <Text style={styles.title}>Self-Pronunciation Practice</Text>
      <Text style={styles.subtle}>
        No upload. No AI scoring. Record yourself, listen back, and self-check.
      </Text>

      <View style={styles.practiceBox}>
        <Text style={styles.label}>{current.title}</Text>
        <Text style={styles.sentence}>"{current.sentence}"</Text>
        <Text style={styles.tip}>{current.tip}</Text>
      </View>

      <View style={styles.buttons}>
        {!recording ? (
          <Pressable style={styles.button} onPress={startRecording}>
            <Text style={styles.buttonTextDark}>Record myself</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.buttonDanger} onPress={stopRecording}>
            <Text style={styles.buttonText}>Stop recording</Text>
          </Pressable>
        )}

        <Pressable style={styles.buttonSecondary} onPress={nextSentence}>
          <Text style={styles.buttonText}>Next sentence</Text>
        </Pressable>
      </View>

      {uri && (
        <View style={styles.listenBox}>
          <Pressable style={styles.buttonSecondary} onPress={playRecording}>
            <Text style={styles.buttonText}>Listen back</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.ratingRow}>
        {ratings.map((item) => {
          const active = rating === item;
          return (
            <Pressable
              key={item}
              style={[styles.ratingButton, active && styles.ratingActive]}
              onPress={() => saveRating(item)}
            >
              <Text style={[styles.ratingText, active && styles.ratingActiveText]}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {rating && <Text style={styles.saved}>Saved rating: {rating}</Text>}

      <Text style={styles.howTo}>
        Practice: read slowly once, naturally once, then record the third time.
        Listen for TH, W/V, final sounds, rhythm, and confidence.
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { color: theme.text, fontSize: 24, fontWeight: "800" },
  subtle: { color: theme.subtle, marginTop: 6, marginBottom: 14, fontSize: 15, lineHeight: 22 },
  practiceBox: {
    backgroundColor: theme.cardSoft,
    borderRadius: 18,
    padding: 16,
    borderColor: theme.border,
    borderWidth: 1
  },
  label: { color: theme.accent, textTransform: "uppercase", letterSpacing: 1.5, fontSize: 12, fontWeight: "900" },
  sentence: { color: theme.text, fontSize: 23, fontWeight: "800", lineHeight: 32, marginTop: 12 },
  tip: { color: theme.muted, marginTop: 12, fontSize: 15, lineHeight: 22 },
  buttons: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 14 },
  button: { backgroundColor: theme.accent, borderRadius: 16, padding: 15, minHeight: 52, justifyContent: "center" },
  buttonDanger: { backgroundColor: "#9f1239", borderRadius: 16, padding: 15, minHeight: 52, justifyContent: "center" },
  buttonSecondary: { borderColor: theme.border, borderWidth: 1, borderRadius: 16, padding: 15, minHeight: 52, justifyContent: "center" },
  buttonText: { color: theme.text, fontWeight: "800", fontSize: 16 },
  buttonTextDark: { color: theme.background, fontWeight: "900", fontSize: 16 },
  listenBox: { marginTop: 14, backgroundColor: theme.cardDeep, borderRadius: 18, padding: 14 },
  ratingRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 14 },
  ratingButton: { borderColor: theme.border, borderWidth: 1, borderRadius: 14, padding: 12, minHeight: 46 },
  ratingActive: { backgroundColor: theme.green, borderColor: theme.green },
  ratingText: { color: theme.text, fontWeight: "700" },
  ratingActiveText: { color: theme.background, fontWeight: "900" },
  saved: { color: theme.green, marginTop: 12, fontWeight: "800" },
  howTo: { color: theme.muted, marginTop: 16, lineHeight: 22, fontSize: 15 }
});

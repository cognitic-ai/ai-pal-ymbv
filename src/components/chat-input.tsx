import * as AC from "@bacons/apple-colors";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [text, setText] = useState("");
  const buttonScale = useSharedValue(1);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSend(trimmed);
    setText("");
  };

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const canSend = text.trim().length > 0 && !disabled;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        paddingBottom: 12,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          backgroundColor: AC.tertiarySystemBackground as any,
          borderRadius: 22,
          borderCurve: "continuous",
          paddingHorizontal: 16,
          paddingVertical: 8,
          minHeight: 44,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            color: AC.label as any,
            maxHeight: 100,
            paddingTop: 0,
            paddingBottom: 0,
          }}
          placeholder="Message your companion..."
          placeholderTextColor={AC.placeholderText as any}
          value={text}
          onChangeText={setText}
          multiline
          editable={!disabled}
          onSubmitEditing={handleSend}
          blurOnSubmit={false}
        />
      </View>
      <AnimatedPressable
        onPress={handleSend}
        onPressIn={() => {
          buttonScale.value = withSpring(0.85);
        }}
        onPressOut={() => {
          buttonScale.value = withSpring(1);
        }}
        disabled={!canSend}
        style={[
          buttonStyle,
          {
            width: 44,
            height: 44,
            borderRadius: 22,
            borderCurve: "continuous",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: canSend
              ? (AC.systemPurple as any)
              : (AC.quaternarySystemFill as any),
          },
        ]}
      >
        <Image
          source="sf:arrow.up"
          style={{
            width: 20,
            height: 20,
            tintColor: canSend ? "#FFFFFF" : (AC.tertiaryLabel as any),
          }}
        />
      </AnimatedPressable>
    </View>
  );
}

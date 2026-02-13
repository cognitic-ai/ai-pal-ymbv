import * as AC from "@bacons/apple-colors";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

export type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
};

function TypingIndicator() {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    dot1.value = withRepeat(
      withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    setTimeout(() => {
      dot2.value = withRepeat(
        withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    }, 150);
    setTimeout(() => {
      dot3.value = withRepeat(
        withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    }, 300);
  }, []);

  const dotStyle = (sv: Animated.SharedValue<number>) =>
    useAnimatedStyle(() => ({
      opacity: 0.3 + sv.value * 0.7,
      transform: [{ translateY: -sv.value * 4 }],
    }));

  const dot = {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: AC.secondaryLabel as any,
  };

  return (
    <View style={{ flexDirection: "row", gap: 4, padding: 4 }}>
      <Animated.View style={[dot, dotStyle(dot1)]} />
      <Animated.View style={[dot, dotStyle(dot2)]} />
      <Animated.View style={[dot, dotStyle(dot3)]} />
    </View>
  );
}

export default function ChatBubble({
  message,
  isTyping,
}: {
  message?: Message;
  isTyping?: boolean;
}) {
  const isUser = message?.sender === "user";

  return (
    <Animated.View
      entering={FadeInDown.duration(300).springify()}
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "80%",
        marginVertical: 2,
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 20,
          borderCurve: "continuous",
          ...(isUser
            ? {
                backgroundColor: AC.systemPurple as any,
                borderBottomRightRadius: 4,
              }
            : {
                backgroundColor: AC.tertiarySystemBackground as any,
                borderBottomLeftRadius: 4,
              }),
        }}
      >
        {isTyping ? (
          <TypingIndicator />
        ) : (
          <Text
            selectable
            style={{
              fontSize: 16,
              lineHeight: 22,
              color: isUser ? "#FFFFFF" : (AC.label as any),
            }}
          >
            {message?.text}
          </Text>
        )}
      </View>
      {message && (
        <Text
          style={{
            fontSize: 11,
            color: AC.tertiaryLabel as any,
            marginTop: 2,
            marginHorizontal: 4,
            alignSelf: isUser ? "flex-end" : "flex-start",
          }}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      )}
    </Animated.View>
  );
}

import * as AC from "@bacons/apple-colors";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
} from "react-native-reanimated";

export default function CompanionAvatar({
  size = 60,
  isThinking = false,
}: {
  size?: number;
  isThinking?: boolean;
}) {
  const pulse = useSharedValue(0);
  const breathe = useSharedValue(0);

  useEffect(() => {
    breathe.value = withRepeat(
      withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  useEffect(() => {
    if (isThinking) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 600, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    } else {
      pulse.value = withTiming(0, { duration: 300 });
    }
  }, [isThinking]);

  const outerStyle = useAnimatedStyle(() => {
    const scale = interpolate(breathe.value, [0, 1], [1, 1.05]);
    return { transform: [{ scale }] };
  });

  const glowStyle = useAnimatedStyle(() => {
    const opacity = interpolate(pulse.value, [0, 1], [0.3, 0.7]);
    const scale = interpolate(pulse.value, [0, 1], [1, 1.3]);
    return { opacity, transform: [{ scale }] };
  });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          alignItems: "center",
          justifyContent: "center",
        },
        outerStyle,
      ]}
    >
      {isThinking && (
        <Animated.View
          style={[
            {
              position: "absolute",
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: AC.systemPurple,
            },
            glowStyle,
          ]}
        />
      )}
      <View
        style={{
          width: size * 0.85,
          height: size * 0.85,
          borderRadius: (size * 0.85) / 2,
          borderCurve: "continuous",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            borderRadius: (size * 0.85) / 2,
            experimental_backgroundImage:
              "linear-gradient(135deg, #7B61FF 0%, #AF52DE 50%, #FF6BCC 100%)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: size * 0.3,
              height: size * 0.3,
              borderRadius: (size * 0.3) / 2,
              backgroundColor: "rgba(255,255,255,0.9)",
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
}

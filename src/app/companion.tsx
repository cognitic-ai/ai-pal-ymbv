import * as AC from "@bacons/apple-colors";
import { ScrollView, Text, View } from "react-native";
import CompanionAvatar from "@/components/companion-avatar";

const traits = [
  { icon: "sf:heart.fill", label: "Empathetic", color: AC.systemPink },
  { icon: "sf:brain.head.profile", label: "Thoughtful", color: AC.systemPurple },
  { icon: "sf:face.smiling", label: "Supportive", color: AC.systemOrange },
  { icon: "sf:sparkles", label: "Creative", color: AC.systemYellow },
];

const stats = [
  { label: "Messages", value: "∞" },
  { label: "Mood", value: "Happy" },
  { label: "Level", value: "Friend" },
];

export default function CompanionScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 48,
        gap: 32,
      }}
    >
      {/* Avatar */}
      <View style={{ alignItems: "center", gap: 12 }}>
        <CompanionAvatar size={100} />
        <View style={{ alignItems: "center", gap: 4 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: AC.label as any,
            }}
          >
            Nova
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: AC.secondaryLabel as any,
            }}
          >
            Your AI Companion
          </Text>
        </View>
      </View>

      {/* Stats Row */}
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          width: "100%",
        }}
      >
        {stats.map((stat) => (
          <View
            key={stat.label}
            style={{
              flex: 1,
              backgroundColor: AC.secondarySystemBackground as any,
              borderRadius: 16,
              borderCurve: "continuous",
              padding: 16,
              alignItems: "center",
              gap: 4,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: AC.label as any,
                fontVariant: ["tabular-nums"],
              }}
            >
              {stat.value}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: AC.secondaryLabel as any,
                fontWeight: "500",
              }}
            >
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Personality Traits */}
      <View style={{ width: "100%", gap: 12 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "600",
            color: AC.secondaryLabel as any,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginLeft: 4,
          }}
        >
          Personality
        </Text>
        <View style={{ gap: 8 }}>
          {traits.map((trait) => (
            <View
              key={trait.label}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: AC.secondarySystemBackground as any,
                borderRadius: 14,
                borderCurve: "continuous",
                padding: 14,
                gap: 12,
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  borderCurve: "continuous",
                  backgroundColor: AC.tertiarySystemBackground as any,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 18 }}>
                  {trait.label === "Empathetic"
                    ? "💜"
                    : trait.label === "Thoughtful"
                    ? "🧠"
                    : trait.label === "Supportive"
                    ? "😊"
                    : "✨"}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: AC.label as any,
                }}
              >
                {trait.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* About */}
      <View style={{ width: "100%", gap: 12 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "600",
            color: AC.secondaryLabel as any,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginLeft: 4,
          }}
        >
          About Nova
        </Text>
        <View
          style={{
            backgroundColor: AC.secondarySystemBackground as any,
            borderRadius: 14,
            borderCurve: "continuous",
            padding: 16,
          }}
        >
          <Text
            selectable
            style={{
              fontSize: 15,
              lineHeight: 22,
              color: AC.secondaryLabel as any,
            }}
          >
            Nova is your personal AI companion, designed to be a thoughtful
            listener and supportive friend. Whether you need encouragement, want
            to brainstorm ideas, or just feel like chatting, Nova is always here
            for you.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

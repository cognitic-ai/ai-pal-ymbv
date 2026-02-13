import * as AC from "@bacons/apple-colors";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Stack from "expo-router/stack";
import ChatBubble, { Message } from "@/components/chat-bubble";
import ChatInput from "@/components/chat-input";
import CompanionAvatar from "@/components/companion-avatar";
import { getAIResponse, getGreeting } from "@/components/ai-responses";

export default function ChatScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Send initial greeting
    const greeting: Message = {
      id: "greeting",
      text: getGreeting(),
      sender: "ai",
      timestamp: new Date(),
    };
    setMessages([greeting]);
  }, []);

  const handleSend = useCallback(
    (text: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // Simulate AI thinking time
      const delay = 1000 + Math.random() * 2000;
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getAIResponse(text),
          sender: "ai",
          timestamp: new Date(),
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, aiResponse]);
      }, delay);
    },
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: Message }) => <ChatBubble message={item} />,
    []
  );

  const keyExtractor = useCallback((item: Message) => item.id, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/companion")}
              style={{ padding: 4 }}
            >
              <CompanionAvatar size={34} isThinking={isTyping} />
            </Pressable>
          ),
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={process.env.EXPO_OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 8,
          }}
          contentInsetAdjustmentBehavior="automatic"
          keyboardDismissMode="interactive"
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
          ListFooterComponent={
            isTyping ? <ChatBubble isTyping /> : null
          }
        />
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </KeyboardAvoidingView>
    </>
  );
}

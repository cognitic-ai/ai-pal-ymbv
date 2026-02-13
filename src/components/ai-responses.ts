// Simulated AI companion responses grouped by topic
const responses: Record<string, string[]> = {
  greeting: [
    "Hey there! I've been looking forward to chatting with you today. How's everything going?",
    "Hi! It's so nice to hear from you. What's been on your mind?",
    "Hello, friend! I'm here and ready to listen. What would you like to talk about?",
  ],
  feelings: [
    "I really appreciate you sharing that with me. It takes courage to open up about feelings. Want to tell me more?",
    "That sounds like a lot to carry. I'm here for you - no judgment, just a safe space to talk.",
    "Your feelings are completely valid. Sometimes just naming what we feel can help. What else is on your heart?",
  ],
  encouragement: [
    "You know what I admire about you? You keep showing up, even on tough days. That's real strength.",
    "Remember, progress isn't always linear. Every small step counts, and you're doing better than you think.",
    "I believe in you. You've gotten through hard things before, and you have what it takes to get through this too.",
  ],
  advice: [
    "Here's something that might help: try breaking it down into smaller pieces. What's the one next thing you could do?",
    "Sometimes a different perspective helps. What would you tell a friend in the same situation?",
    "That's a thoughtful question. I think the key is being patient with yourself while you figure it out.",
  ],
  general: [
    "That's really interesting! Tell me more about what you mean.",
    "I love that you brought that up. What made you think of it?",
    "Hmm, that's a great point. I hadn't thought about it that way before.",
    "I'm curious to hear more about your thoughts on this. What else comes to mind?",
    "That resonates with me. It sounds like something that's important to you.",
    "You have such a thoughtful way of looking at things. Keep going!",
  ],
  fun: [
    "Ha, you always know how to brighten the conversation! That made me smile.",
    "I love your energy! If I could laugh, I'd be laughing right now.",
    "You've got great taste. I knew there was a reason we get along so well!",
  ],
};

const keywords: Record<string, string[]> = {
  greeting: ["hi", "hello", "hey", "morning", "evening", "sup", "yo"],
  feelings: [
    "feel",
    "sad",
    "happy",
    "angry",
    "anxious",
    "worried",
    "scared",
    "lonely",
    "stressed",
    "tired",
    "depressed",
    "overwhelmed",
  ],
  encouragement: [
    "can't",
    "give up",
    "hard",
    "difficult",
    "struggling",
    "fail",
    "lost",
    "stuck",
    "hopeless",
  ],
  advice: [
    "should",
    "help",
    "advice",
    "what do",
    "how do",
    "suggest",
    "recommend",
    "think",
  ],
  fun: [
    "lol",
    "haha",
    "funny",
    "joke",
    "laugh",
    "cool",
    "awesome",
    "amazing",
    "love",
  ],
};

export function getAIResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  for (const [topic, words] of Object.entries(keywords)) {
    for (const word of words) {
      if (lower.includes(word)) {
        const pool = responses[topic];
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }
  }

  const pool = responses.general;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning! I'm Nova, your AI companion. I'm here whenever you want to chat, vent, or just hang out. How are you feeling today?";
  } else if (hour < 18) {
    return "Good afternoon! I'm Nova, your AI companion. Whether you need a pep talk or just want to chat about your day, I'm all ears. What's up?";
  } else {
    return "Good evening! I'm Nova, your AI companion. Winding down for the day? I'm here if you want to talk about anything at all.";
  }
}

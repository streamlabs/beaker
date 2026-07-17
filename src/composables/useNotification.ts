import { ref } from "vue";

interface Notification {
  id: number;
  msg: string;
  status: "success" | "error";
  timerStarted: boolean;
}

// Module-level singleton — shared across all consumers
const messages = ref<Notification[]>([]);

export function useNotification() {
  function success(msg: string) {
    messages.value.push({
      id: Math.ceil(Math.random() * 10000),
      msg,
      status: "success",
      timerStarted: false
    });
  }

  function error(msg: string = "An error occurred") {
    messages.value.push({
      id: Math.ceil(Math.random() * 10000),
      msg,
      status: "error",
      timerStarted: false
    });
  }

  function remove(id: number) {
    const idx = messages.value.findIndex(m => m.id === id);
    if (idx !== -1) messages.value.splice(idx, 1);
  }

  return { messages, success, error, remove };
}

import { computed, ref } from "vue";

interface INotificationMsg {
  id: number;
  status: string;
  msg: string;
  timerStarted: boolean;
}

const messages = ref<INotificationMsg[]>([]);


export function useCopyNotification() {
  const visibleMessages = computed(() => {
    const msgs = messages.value.filter((msg, idx) => idx < 5);

    msgs.forEach((msg) => {
      if (!msg.timerStarted) {
        msg.timerStarted = true;
        setTimeout(() => {
          const idx = messages.value.findIndex(
            (message) => msg.id === message.id
          );
          messages.value.splice(idx, 1);
        }, 5000);
      }
    });

    return msgs;
  });

function setCopyMsgId() {
  return Math.ceil(Math.random() * 10000);
}

function setCopyMsg({ id, msg, status, timerStarted }) {
  const message: INotificationMsg = { id, msg, status, timerStarted };
  messages.value.push(message);
}

function onCopySuccess(e) {
  let msg: string = typeof e === "string" ? e : e.text;

  setCopyMsg({
    id: setCopyMsgId(),
    msg,
    status: "success",
    timerStarted: false,
  });
}

function onCopyError(e) {
  setCopyMsg({
    id: setCopyMsgId(),
    msg: "Failed to copy to clipboard",
    status: "error",
    timerStarted: false,
  });
}

// onBeforeMount(() => {
//   EventBus.$on("copy-success", onCopySuccess);
//   EventBus.$on("copy-error", onCopyError);
// });

// onUnmounted(() => {
//   EventBus.$off("copy-success");
//   EventBus.$off("copy-error");
// });

  return {
    visibleMessages,
    onCopySuccess,
    onCopyError
  }
}
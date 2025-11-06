import React, { useEffect, useMemo, useRef, useState } from "react";\nimport { createPortal } from "react-dom";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const AIAgentWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "AI가 대기 중입니다..." },
  ]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  const toggle = () => setOpen((v) => !v);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const onSend = async () => {
    if (!canSend) return;
    const userText = input.trim();
    setInput("");
    const next = [...messages.filter((m, i) => !(i === 0 && m.content.includes("대기"))), { role: "user", content: userText }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      if (!res.ok) throw new Error("bad status");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: String(data?.reply ?? "오류가 발생했습니다.") }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "오류가 발생했습니다." }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    {createPortal((<><div className="fixed inset-0 pointer-events-none z-[99998]"></div> */}
      <button
        aria-label="Open SULAB AI Agent"
        onClick={toggle}
        className="fixed bottom-6 right-6 z-[99999] h-14 w-14 rounded-full bg-[#00B6F0] text-2xl shadow-lg transition-transform hover:scale-[1.05] hover:shadow-cyan-500/30 focus:outline-none focus:ring-4 focus:ring-cyan-300 flex items-center justify-center select-none"
      >
        <span className="pointer-events-none">🤖</span>
      </button>

      {/* Chat Window */}
      <div
        ref={containerRef}
        className={`fixed bottom-24 right-6 z-[9999] w-[350px] max-w-[90vw] ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        } transition-all duration-200`}
      >
        <div className="bg-slate-950 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
            <div className="text-white font-semibold">SULAB AI Agent</div>
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="max-h-[60vh] overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`${
                    m.role === "user"
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-100"
                  } px-3 py-2 rounded-lg max-w-[85%] whitespace-pre-wrap break-words`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-sm text-slate-400">답변 생성 중...</div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-slate-800">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="무엇을 도와드릴까요?"
              className="flex-1 bg-slate-900 text-slate-100 placeholder-slate-500 rounded-md px-3 py-2 outline-none border border-slate-800 focus:border-cyan-500"
            />
            <button
              onClick={onSend}
              disabled={!canSend}
              className="shrink-0 px-3 py-2 rounded-md bg-cyan-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-500 transition-colors"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAgentWidget;

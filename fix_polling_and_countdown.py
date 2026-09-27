import re

def update_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fix the case sensitivity bug in polling
    content = content.replace(
        'if (data.status === "SUCCESSFUL" || data.status === "confirmed") {',
        'if (data.status?.toLowerCase() === "successful" || data.status?.toLowerCase() === "confirmed") {'
    )
    
    # 2. Inject timeLeft state and countdown effect
    new_state = '''  const [expiresAt, setExpiresAt] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!expiresAt) return;
    
    const updateTime = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const distance = expiry - now;
      
      if (distance < 0) {
        setTimeLeft("Expired");
        return;
      }
      
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);'''

    content = content.replace('const [expiresAt, setExpiresAt] = useState<string>("");', new_state)
    
    # 3. Add the countdown to the UI
    old_waiting = '''              <div className="inline-flex items-center gap-2 text-[var(--color-accent)] bg-[var(--color-accent-light)] px-4 py-2 rounded-full font-bold text-sm">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
                Waiting for transfer...
              </div>'''
              
    new_waiting = '''              <div className="flex flex-col items-center gap-3">
                <div className="inline-flex items-center gap-2 text-[var(--color-accent)] bg-[var(--color-accent-light)] px-4 py-2 rounded-full font-bold text-sm">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
                  Waiting for transfer...
                </div>
                {timeLeft && timeLeft !== "Expired" && (
                  <div className="text-gray-900 font-black text-2xl tabular-nums">
                    Expires in {timeLeft}
                  </div>
                )}
                {timeLeft === "Expired" && (
                  <div className="text-red-600 font-bold text-lg">
                    Account expired. Please refresh and try again.
                  </div>
                )}
              </div>'''
              
    content = content.replace(old_waiting, new_waiting)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

update_file('app/[slug]/page.tsx')
update_file('app/t/[slug]/page.tsx')

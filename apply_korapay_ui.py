import re

def update_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add new states
    state_injection = '''
  const [bankAccount, setBankAccount] = useState<any>(null);
  const [reference, setReference] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [isPolling, setIsPolling] = useState(false);
  
  // Polling effect
  useEffect(() => {
    let interval: any;
    if (isPolling && reference) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1"}/tips/status/${reference}`);
          const data = await res.json();
          if (data.status === "SUCCESSFUL" || data.status === "confirmed") {
            window.location.href = `/success?slug=${slug}&reference=${reference}`;
          }
        } catch(e) {}
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPolling, reference, slug]);
'''
    content = content.replace('const [error, setError] = useState("");', 'const [error, setError] = useState("");' + state_injection)
    
    # Update handleTip
    new_handleTip = '''
  const handleTip = async () => {
    const finalAmount = selectedTier ? selectedTier : parseInt(customAmount);
    if (!finalAmount || finalAmount < 1000) {
      setError("Please select or enter an amount of at least ₦1,000");
      return;
    }
    
    setIsPaying(true);
    setError("");
    
    try {
      const res = await fetch(API_ENDPOINTS.INITIALIZE_TIP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          link_slug: slug,
          amount_kobo: finalAmount * 100, // convert to kobo
          platform_attribution: platform || null,
          message: message || null,
          fan_name: fanName || null,
          fan_email: fanEmail || null,
          callback_url: `${window.location.origin}/success?slug=${slug}`
        })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to initialize payment");
      }
      
      if (data.data?.bank_account) {
        setBankAccount(data.data.bank_account);
        setReference(data.data.reference);
        setExpiresAt(data.data.expires_at);
        setIsPolling(true);
      } else {
        throw new Error("No bank account generated");
      }
    } catch (err: any) {
      setError(err.message);
      setIsPaying(false);
    }
  };
'''
    content = re.sub(r'const handleTip = async \(\) => \{.*?\n  \};\n', new_handleTip, content, flags=re.DOTALL)
    
    # Add UI for Bank Transfer
    bank_ui = '''
        {bankAccount ? (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Transfer to complete tip</h2>
            
            <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Bank Name</p>
                <p className="text-xl font-black text-gray-900">{bankAccount.bank_name}</p>
              </div>
              
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Account Number</p>
                <div className="flex items-center gap-3">
                  <p className="text-3xl font-black text-[var(--color-accent)] tracking-tight">{bankAccount.account_number}</p>
                  <button 
                    onClick={() => navigator.clipboard.writeText(bankAccount.account_number)}
                    className="p-2 bg-white rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 shadow-sm"
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Account Name</p>
                <p className="text-lg font-bold text-gray-900">{bankAccount.account_name}</p>
              </div>
              
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Amount</p>
                <p className="text-xl font-black text-gray-900">₦{selectedTier ? selectedTier.toLocaleString() : customAmount}</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 text-[var(--color-accent)] bg-[var(--color-accent-light)] px-4 py-2 rounded-full font-bold text-sm">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
                Waiting for transfer...
              </div>
              <p className="text-sm text-gray-500 font-medium mt-3">
                Make a transfer to the account above. This page will automatically update once received.
              </p>
            </div>
          </div>
        ) : (
'''
    
    # We need to wrap the existing payment form with `{bankAccount ? ... : ( ... )}`
    # The form starts at `<div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">`
    # Let's find that.
    content = content.replace('<div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">', bank_ui + '<div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">')
    
    # And close it right before `</main>`
    content = content.replace('</main>', ')}\n      </main>')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

update_file('app/[slug]/page.tsx')
update_file('app/t/[slug]/page.tsx')

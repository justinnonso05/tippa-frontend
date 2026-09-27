import re

def update_ui(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the Settled card
    settled_pattern = r'<p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Settled</p>.*?Sent to your bank</p>\s*</div>'
    
    new_available_card = '''<div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Available</p>
              <p className="text-4xl font-black text-gray-900 tracking-tight">₦{withdrawable}</p>
            </div>
            {(stats?.total_withdrawable_kobo || 0) > 0 ? (
              <button 
                onClick={async (e) => {
                  const btn = e.currentTarget;
                  btn.disabled = true;
                  btn.innerText = 'Processing...';
                  try {
                    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/tips/withdraw', { 
                        method: 'POST', 
                        headers: { Authorization: `Bearer ${localStorage.getItem('tippa_token')}` }
                    });
                    const data = await res.json();
                    if (!res.ok) alert(data.detail || 'Error withdrawing');
                    else { alert(data.message); window.location.reload(); }
                  } catch (e) { alert(e.message); }
                  finally { btn.disabled = false; btn.innerText = 'Withdraw to Bank'; }
                }}
                className="text-sm font-bold mt-4 text-white bg-green-600 hover:bg-green-700 w-full px-3 py-2 rounded-xl transition-colors shadow-sm"
              >
                Withdraw to Bank
              </button>
            ) : (
              <p className="text-sm font-medium mt-4 text-gray-500 bg-gray-50 w-fit px-3 py-1.5 rounded-lg border border-gray-200">No funds available</p>
            )}
          </div>'''
          
    content = re.sub(settled_pattern, new_available_card, content, flags=re.DOTALL)
    
    # Replace Processing payout with Clearing (24h)
    content = content.replace('Processing payout</p>', 'Clearing (24h)</p>')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

update_ui('app/dashboard/page.tsx')

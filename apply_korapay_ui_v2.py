import re

def update_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The exact div we need to replace
    target_div = '<div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">'
    
    if target_div not in content:
        print(f"Target div not found in {path}")
        return
        
    bank_ui = '''
        {bankAccount ? (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
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
    content = content.replace(target_div, bank_ui + target_div)
    
    # Close it right before Powered by Tippa wrapper
    footer_div = '<div className="mt-8 text-center">'
    content = content.replace(footer_div, ')}' + footer_div)
    
    # Change "Redirecting to Paystack" to "Generating Account..."
    content = content.replace('Redirecting to Paystack...', 'Generating Account...')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

update_file('app/[slug]/page.tsx')
update_file('app/t/[slug]/page.tsx')

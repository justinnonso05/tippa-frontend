import sys

with open('app/dashboard/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('uppercase tracking-wider mb-2">Withdrawable</p>', 'uppercase tracking-wider mb-2">Settled</p>')
content = content.replace('Available for payout', 'Sent to your bank')
content = content.replace('Awaiting settlement', 'Processing payout')

with open('app/dashboard/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

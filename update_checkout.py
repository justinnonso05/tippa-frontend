import os

def update_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add state
    content = content.replace(
        'const [message, setMessage] = useState<string>("");',
        'const [message, setMessage] = useState<string>("");\n  const [fanName, setFanName] = useState<string>("");\n  const [fanEmail, setFanEmail] = useState<string>("");'
    )

    # Pass in payload
    content = content.replace(
        'message: message || null,',
        'message: message || null,\n          fan_name: fanName || null,\n          fan_email: fanEmail || null,'
    )

    # Add UI inputs
    ui_inputs = '''
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Your Name <span className="text-gray-500 font-medium">(Optional - leave blank to remain anonymous)</span>
            </label>
            <input
              type="text"
              value={fanName}
              onChange={(e) => setFanName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-900 font-medium outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Your Email <span className="text-gray-500 font-medium">(Optional - for receipt)</span>
            </label>
            <input
              type="email"
              value={fanEmail}
              onChange={(e) => setFanEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-900 font-medium outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Message for the creator <span className="text-gray-500 font-medium">(Optional)</span>
'''
    
    content = content.replace(
        '''          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Message for the creator <span className="text-gray-500 font-medium">(Optional)</span>''',
        ui_inputs
    )

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

update_file('app/[slug]/page.tsx')
update_file('app/t/[slug]/page.tsx')

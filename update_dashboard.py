import re

def update_ui(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The string we want to replace in both files
    old_amount_html = '<div className="font-bold text-green-600">\n                        +₦{(tip.amount_kobo / 100).toLocaleString()}\n                      </div>'
    
    new_amount_html = '''<div className="text-right">
                        <div className="font-bold text-green-600">
                          +₦{(tip.creator_share_kobo / 100).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400 font-medium">
                          Net from ₦{(tip.amount_kobo / 100).toLocaleString()}
                        </div>
                      </div>'''
                      
    # Wait, the NGN sign might be causing issues with string replace, let's use regex based on tip.amount_kobo
    # Let's search for the line and replace the block
    
    # We can match: 
    # <div className="font-bold text-green-600">
    #   +₦{(tip.amount_kobo / 100).toLocaleString()}
    # </div>
    
    import re
    content = re.sub(
        r'<div className="font-bold text-green-600">\s*\+.*?\{\(tip\.amount_kobo / 100\)\.toLocaleString\(\)\}\s*</div>',
        new_amount_html,
        content
    )

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

update_ui('app/dashboard/page.tsx')
update_ui('app/dashboard/tips/page.tsx')

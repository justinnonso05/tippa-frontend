import re

def fix_page(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # The erroneous `)}<div className="mt-8 text-center">` inside bank_ui
    # Needs to be reverted to `<div className="mt-8 text-center">`
    # And then we place `)}` correctly before `<div className="mt-8 text-center">` that comes AFTER the tip card.
    
    # Actually, it's easier to find `)}<div className="mt-8 text-center">`
    content = content.replace(')}<div className="mt-8 text-center">', '<div className="mt-8 text-center">')
    
    # We still need to close the `) : (` block!
    # Where should it close? It should close right before `<div className="mt-8 text-center">` that contains "Powered by Tippa".
    # Let's search for the "Powered by Tippa" block.
    powered_by = '<div className="mt-8 text-center">\n          <Link href="/"'
    
    if powered_by in content:
        content = content.replace(powered_by, ')}\n        ' + powered_by)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_page('app/[slug]/page.tsx')
fix_page('app/t/[slug]/page.tsx')

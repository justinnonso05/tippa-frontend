with open('app/globals.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Soften card-bordered
content = content.replace(
'''.card-bordered {
  border: 2px solid var(--color-dark);
  border-radius: 12px;
  background: var(--color-white);
  /* Brutalist shadow */
  box-shadow: 4px 4px 0 0 rgba(20, 20, 20, 1);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.card-bordered:hover {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0 0 rgba(20, 20, 20, 1);
}''',
'''.card-bordered {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: var(--color-white);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.15s ease;
}
.card-bordered:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}'''
)

# Soften step-num
content = content.replace(
'''.step-num {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 9999px;
  border: 2px solid var(--color-dark);''',
'''.step-num {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;'''
)

# Soften compare-col
content = content.replace(
'''.compare-col {
  border-radius: 12px;
  padding: 1.6rem;
  flex: 1;
  border: 2px solid var(--color-dark);
}''',
'''.compare-col {
  border-radius: 16px;
  padding: 1.6rem;
  flex: 1;
  border: 1px solid #e5e7eb;
}'''
)

content = content.replace(
'''.compare-col.col-old { background: var(--color-section-bg); }
.compare-col.col-new {
  background: var(--color-dark);
  color: var(--color-text-on-dark);
  border-color: var(--color-dark);
}''',
'''.compare-col.col-old { background: #f9fafb; }
.compare-col.col-new {
  background: var(--color-dark);
  color: var(--color-text-on-dark);
  border-color: var(--color-dark);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}'''
)

# Soften tag-chip
content = content.replace(
'''  border: 1.5px solid var(--color-dark);''',
'''  border: 1px solid #e5e7eb;'''
)

# Soften faq-item
content = content.replace(
'''.faq-item {
  border: 2px solid var(--color-dark);
  border-radius: 12px;''',
'''.faq-item {
  border: 1px solid #e5e7eb;
  border-radius: 16px;'''
)

# Soften fee-row
content = content.replace(
'''.fee-row {
  border-top: 2px solid var(--color-dark);''',
'''.fee-row {
  border-top: 1px solid #e5e7eb;'''
)

with open('app/globals.css', 'w', encoding='utf-8') as f:
    f.write(content)

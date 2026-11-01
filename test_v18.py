from pathlib import Path
from html.parser import HTMLParser
import subprocess,re,sys
root=Path(__file__).parent
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.links=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='script' and a.get('src'):self.links.append(a['src'])
  if tag=='link' and a.get('href','').endswith('.css'):self.links.append(a['href'])
errors=[]
for f in root.glob('*.html'):
 p=Parser();p.feed(f.read_text(encoding='utf-8'))
 for ref in p.links:
  if not (root/ref).exists():errors.append(f'{f.name}: missing {ref}')
for f in root.glob('*.js'):
 r=subprocess.run(['node','--check',str(f)],capture_output=True,text=True)
 if r.returncode:errors.append(f'{f.name}: {r.stderr}')
for f in root.rglob('*'):
 if f.is_file() and f.suffix in ('.html','.js','.md','.txt'):
  if re.search(r'https://discord\.com/api/webhooks/\d+/[A-Za-z0-9_-]+',f.read_text(encoding='utf-8',errors='replace')):errors.append(f'{f.name}: EXPOSED WEBHOOK')
for name in ('dashboard.html','profil.html','vce-team-v18.js','vce-cloud-v18.js','backend/supabase_schema.sql'):
 if not (root/name).exists():errors.append('Missing '+name)
print('Pages:',len(list(root.glob('*.html'))),'JS:',len(list(root.glob('*.js'))),'Errors:',len(errors))
for e in errors:print('ERROR:',e)
sys.exit(bool(errors))

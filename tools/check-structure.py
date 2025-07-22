#!/usr/bin/env python3
"""
Vérifie que toute la structure est bien créée
"""
import os

def check_structure():
    required_files = [
        'data/config.json',
        'data/articles-fr.json', 
        'data/articles-es.json',
        'js/app.js',
        'js/utils.js',
        'css/components.css',
        'tools/build.py',
        'package.json'
    ]
    
    print("🔍 Vérification de la structure...")
    
    for file in required_files:
        if os.path.exists(file):
            print(f"✅ {file}")
        else:
            print(f"❌ {file} - MANQUANT")
    
    print("\n🎯 Dossiers créés:")
    for root, dirs, files in os.walk('.'):
        if '.git' not in root:
            level = root.replace('.', '').count(os.sep)
            indent = ' ' * 2 * level
            print(f"{indent}{os.path.basename(root)}/")

if __name__ == "__main__":
    check_structure()
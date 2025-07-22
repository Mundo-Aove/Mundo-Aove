#!/usr/bin/env python3
"""
Article Creator - Alejandra Galván
Interface interactive pour créer des articles bilingues pour le blog
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path
import subprocess

class ArticleCreator:
    def __init__(self):
        self.data_dir = Path("../data")
        self.articles_fr_file = self.data_dir / "articles-fr.json"
        self.articles_es_file = self.data_dir / "articles-es.json"
        
        # Vérifier que les fichiers existent
        self.ensure_data_files()
        
        print("✍️ Article Creator - Mundo AOVE")
        print("=" * 50)
    
    def ensure_data_files(self):
        """S'assure que les fichiers de données existent"""
        self.data_dir.mkdir(exist_ok=True)
        
        for file_path in [self.articles_fr_file, self.articles_es_file]:
            if not file_path.exists():
                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump([], f)
                print(f"📁 Fichier créé: {file_path}")
    
    def load_articles(self, lang):
        """Charge les articles existants"""
        file_path = self.articles_fr_file if lang == 'fr' else self.articles_es_file
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return []
    
    def get_next_id(self):
        """Génère le prochain ID disponible"""
        articles_fr = self.load_articles('fr')
        articles_es = self.load_articles('es')
        
        max_id = 0
        for articles in [articles_fr, articles_es]:
            for article in articles:
                max_id = max(max_id, article.get('id', 0))
        
        return max_id + 1
    
    def input_multiline(self, prompt):
        """Saisie multiligne (Ctrl+D ou ligne vide pour terminer)"""
        print(f"\n{prompt}")
        print("📝 (Ctrl+D ou ligne vide pour terminer)")
        print("-" * 40)
        
        lines = []
        try:
            while True:
                line = input()
                if line.strip() == "":
                    break
                lines.append(line)
        except EOFError:
            pass
        
        return "\n".join(lines)
    
    def format_content_to_markdown(self, content):
        """Formate le contenu en Markdown"""
        # Ici on peut ajouter des règles de formatage automatique
        # Pour l'instant, on suppose que l'utilisateur fournit déjà du Markdown
        
        # Ajouter des sauts de ligne pour les paragraphes si nécessaire
        paragraphs = content.split('\n\n')
        formatted_paragraphs = []
        
        for p in paragraphs:
            if p.strip():
                # Si le paragraphe ne commence pas par #, on l'entoure de <p>
                if not p.strip().startswith('#'):
                    formatted_paragraphs.append(p.strip())
                else:
                    formatted_paragraphs.append(p.strip())
        
        return '\n\n'.join(formatted_paragraphs)
    
    def create_article_interactive(self):
        """Interface interactive pour créer un article"""
        print("\n🆕 CRÉATION D'UN NOUVEL ARTICLE")
        print("=" * 50)
        
        # Génération de l'ID
        article_id = self.get_next_id()
        print(f"🆔 ID du nouvel article: {article_id}")
        
        # Date automatique
        date_str = datetime.now().strftime("%Y-%m-%d")
        print(f"📅 Date: {date_str}")
        
        # Saisie des données
        print("\n📝 SAISIE DES DONNÉES")
        print("-" * 30)
        
        # Version espagnole d'abord (langue native Alejandra)
        print("\n🇪🇸 VERSION ESPAGNOLE:")
        title_es = input("Título (ES): ").strip()
        excerpt_es = input("Resumen corto (ES): ").strip()
        content_es = self.input_multiline("📝 Contenido completo (ES):")
        
        print("\n🇫🇷 VERSION FRANÇAISE:")
        title_fr = input("Titre (FR): ").strip()
        excerpt_fr = input("Résumé court (FR): ").strip()  
        content_fr = self.input_multiline("📝 Contenu complet (FR):")
        
        # Image (optionnelle)
        print("\n🖼️ IMAGE:")
        image_url = input("URL de l'image (optionnel): ").strip()
        if not image_url:
            # Image par défaut selon le contenu
            if any(word in title_fr.lower() for word in ['olivier', 'olive', 'huile']):
                image_url = "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=300&fit=crop"
            else:
                image_url = "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=300&fit=crop"
        
        # Création des objets article
        article_fr = {
            "id": article_id,
            "title": title_fr,
            "date": date_str,
            "author": "Alejandra Galván Gómez",
            "excerpt": excerpt_fr,
            "content": self.format_content_to_markdown(content_fr),
            "image": image_url,
            "category": "oléiculture",
            "tags": self.extract_tags(title_fr + " " + content_fr)
        }
        
        article_es = {
            "id": article_id,
            "title": title_es,
            "date": date_str,
            "author": "Alejandra Galván Gómez", 
            "excerpt": excerpt_es,
            "content": self.format_content_to_markdown(content_es),
            "image": image_url,
            "category": "olivicultura",
            "tags": self.extract_tags(title_es + " " + content_es)
        }
        
        return article_fr, article_es
    
    def extract_tags(self, text):
        """Extrait des tags automatiquement"""
        text_lower = text.lower()
        possible_tags = [
            'oléiculture', 'olivicultura', 'olive', 'oliva', 
            'huile', 'aceite', 'pérou', 'peru', 'tacna', 'moquegua',
            'agriculture', 'agricultura', 'durable', 'sostenible',
            'récolte', 'cosecha', 'taille', 'poda', 'irrigation'
        ]
        
        tags = []
        for tag in possible_tags:
            if tag in text_lower and tag not in tags:
                tags.append(tag)
        
        return tags[:5]  # Max 5 tags
    
    def preview_article(self, article, lang):
        """Aperçu de l'article"""
        print(f"\n📖 APERÇU ARTICLE ({lang.upper()})")
        print("=" * 50)
        print(f"ID: {article['id']}")
        print(f"Titre: {article['title']}")
        print(f"Date: {article['date']}")
        print(f"Auteur: {article['author']}")
        print(f"Résumé: {article['excerpt']}")
        print(f"Image: {article['image']}")
        print(f"Tags: {', '.join(article['tags'])}")
        print("\nContenu:")
        print("-" * 30)
        print(article['content'][:300] + "..." if len(article['content']) > 300 else article['content'])
        print("=" * 50)
    
    def save_articles(self, article_fr, article_es):
        """Sauvegarde les articles dans les fichiers JSON"""
        # Charger articles existants
        articles_fr = self.load_articles('fr')
        articles_es = self.load_articles('es')
        
        # Ajouter les nouveaux
        articles_fr.append(article_fr)
        articles_es.append(article_es)
        
        # Sauvegarder
        with open(self.articles_fr_file, 'w', encoding='utf-8') as f:
            json.dump(articles_fr, f, indent=2, ensure_ascii=False)
            
        with open(self.articles_es_file, 'w', encoding='utf-8') as f:
            json.dump(articles_es, f, indent=2, ensure_ascii=False)
        
        print("💾 Articles sauvegardés!")
        print(f"📁 FR: {self.articles_fr_file}")
        print(f"📁 ES: {self.articles_es_file}")
    
    def test_local(self):
        """Lance le serveur local pour tester"""
        print("\n🧪 TEST LOCAL")
        print("-" * 20)
        
        os.chdir("..")  # Retour au dossier racine
        
        print("🚀 Lancement du serveur local...")
        print("📍 http://localhost:8000")
        print("⚠️ Ctrl+C pour arrêter")
        
        try:
            subprocess.run(["python3", "-m", "http.server", "8000"], check=True)
        except KeyboardInterrupt:
            print("\n🛑 Serveur arrêté")
        except subprocess.CalledProcessError:
            print("❌ Erreur lancement serveur")
    
    def deploy_github(self):
        """Deploy sur GitHub Pages"""
        print("\n🚀 DÉPLOIEMENT GITHUB")
        print("-" * 30)
        
        # Vérifier qu'on est dans le bon dossier
        os.chdir("..")
        
        try:
            # Git add
            print("📁 git add ...")
            subprocess.run(["git", "add", "."], check=True)
            
            # Git commit
            commit_msg = f"✨ Nouvel article: {datetime.now().strftime('%Y-%m-%d %H:%M')}"
            print(f"💬 git commit: {commit_msg}")
            subprocess.run(["git", "commit", "-m", commit_msg], check=True)
            
            # Git push
            print("🚀 git push...")
            subprocess.run(["git", "push", "origin", "main"], check=True)
            
            print("✅ Déploiement terminé!")
            print("🌐 Site mis à jour: https://mundo-aove.github.io/Mundo-Aove/")
            print("⏳ Délai d'apparition: 2-3 minutes")
            
        except subprocess.CalledProcessError as e:
            print(f"❌ Erreur Git: {e}")
    
    def run(self):
        """Lance le processus complet"""
        try:
            # 1. Création de l'article
            article_fr, article_es = self.create_article_interactive()
            
            # 2. Aperçu
            print("\n" + "="*60)
            print("📋 APERÇU DES ARTICLES CRÉÉS")
            print("="*60)
            self.preview_article(article_fr, 'fr')
            self.preview_article(article_es, 'es')
            
            # 3. Confirmation
            confirm = input("\n✅ Sauvegarder ces articles ? (y/N): ").strip().lower()
            if confirm != 'y':
                print("❌ Annulé")
                return
            
            # 4. Sauvegarde
            self.save_articles(article_fr, article_es)
            
            # 5. Test local
            test = input("\n🧪 Lancer test local ? (y/N): ").strip().lower()
            if test == 'y':
                self.test_local()
            
            # 6. Déploiement
            deploy = input("\n🚀 Déployer sur GitHub ? (y/N): ").strip().lower()
            if deploy == 'y':
                self.deploy_github()
            
            print("\n🎉 TERMINÉ! Article créé avec succès!")
            
        except KeyboardInterrupt:
            print("\n\n👋 Au revoir!")
            
        except Exception as e:
            print(f"\n❌ Erreur: {e}")

def main():
    creator = ArticleCreator()
    creator.run()

if __name__ == "__main__":
    main()
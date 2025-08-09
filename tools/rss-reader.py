#!/usr/bin/env python3
"""
RSS Reader Simple - Alejandra Galván
Affiche les flux RSS d'actualité oléicole/agricole pour sélection manuelle
"""

import feedparser
import requests
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
import sys

class SimpleRSSReader:
    def __init__(self):
        # Sources RSS ciblées oléiculture/agriculture
        self.sources = {
            "🫒 Olive Oil Times": "https://www.oliveoiltimes.com/feed",
            "🌱 Agriculture.com": "https://www.agriculture.com/feed",
        }
        
        self.articles = []
    
    def fetch_feeds(self):
        """Récupère tous les flux RSS"""
        print("🚀 Récupération des flux RSS en cours...\n")
        
        for source_name, url in self.sources.items():
            print(f"📡 {source_name}")
            try:
                feed = feedparser.parse(url)
                
                for entry in feed.entries[:5]:  # 5 derniers articles par source
                    article = {
                        'source': source_name,
                        'title': entry.get('title', 'Sans titre'),
                        'link': entry.get('link', ''),
                        'published': entry.get('published', ''),
                        'description': self.clean_description(entry.get('description', ''))
                    }
                    self.articles.append(article)
                    
                print(f"  ✅ {len(feed.entries[:5])} articles récupérés")
                
            except Exception as e:
                print(f"  ❌ Erreur: {e}")
        
        print(f"\n📊 Total: {len(self.articles)} articles disponibles")
    
    def clean_description(self, html_text):
        """Nettoie la description HTML"""
        if html_text:
            soup = BeautifulSoup(html_text, 'html.parser')
            text = soup.get_text().strip()
            # Limiter à 200 caractères
            return text[:200] + "..." if len(text) > 200 else text
        return ""
    
    def display_articles(self):
        """Affiche les articles avec numéros pour sélection"""
        print("\n" + "="*80)
        print("📰 ARTICLES DISPONIBLES")
        print("="*80)
        
        for i, article in enumerate(self.articles, 1):
            print(f"\n[{i:2d}] {article['source']}")
            print(f"     📰 {article['title']}")
            print(f"     📅 {article['published']}")
            print(f"     📝 {article['description']}")
            print(f"     🔗 {article['link']}")
            print("-" * 80)
    
    def show_article_details(self, index):
        """Affiche les détails complets d'un article"""
        if 0 <= index < len(self.articles):
            article = self.articles[index]
            
            print("\n" + "="*80)
            print("📄 DÉTAILS DE L'ARTICLE")
            print("="*80)
            print(f"Source: {article['source']}")
            print(f"Titre: {article['title']}")
            print(f"Date: {article['published']}")
            print(f"Lien: {article['link']}")
            print("\nDescription:")
            print(article['description'])
            print("="*80)
            
            return article
        return None
    
    def interactive_menu(self):
        """Menu interactif"""
        while True:
            print("\n🎯 OPTIONS:")
            print("1. Voir tous les articles")
            print("2. Voir détails d'un article (numéro)")
            print("3. Ouvrir un article dans le navigateur")
            print("4. Rafraîchir les flux")
            print("0. Quitter")
            
            choice = input("\n👉 Votre choix: ").strip()
            
            if choice == '0':
                print("👋 Au revoir!")
                break
            elif choice == '1':
                self.display_articles()
            elif choice == '2':
                try:
                    num = int(input("Numéro de l'article: ")) - 1
                    self.show_article_details(num)
                except ValueError:
                    print("❌ Numéro invalide")
            elif choice == '3':
                try:
                    num = int(input("Numéro de l'article: ")) - 1
                    if 0 <= num < len(self.articles):
                        url = self.articles[num]['link']
                        print(f"🌐 Ouverture: {url}")
                        import webbrowser
                        webbrowser.open(url)
                    else:
                        print("❌ Numéro invalide")
                except ValueError:
                    print("❌ Numéro invalide")
            elif choice == '4':
                self.articles = []
                self.fetch_feeds()
            else:
                print("❌ Option invalide")
    
    def run(self):
        """Lance le lecteur RSS"""
        print("🫒 RSS Reader - Mundo AOVE")
        print("Blog Alejandra Galván - Oléiculture Péruvienne")
        print("-" * 50)
        
        self.fetch_feeds()
        self.interactive_menu()

def main():
    reader = SimpleRSSReader()
    reader.run()

if __name__ == "__main__":
    main()
#!/usr/bin/env python3
"""
Image Processor - Oliviers Centenaires
Redimensionne et optimise les photos d'oliviers
"""

import os
import json
from PIL import Image, ImageOps
from pathlib import Path
import shutil

class ImageProcessor:
    def __init__(self):
        self.images_dir = Path("../images/oliviers")
        self.source_dir = None
        self.processed_count = 0
        
        # Tailles cibles
        self.thumb_size = (300, 200)  # Popup
        self.full_size = (800, 600)   # Modal
        
    def set_source_directory(self, source_path):
        """Définit le dossier source des photos"""
        self.source_dir = Path(source_path)
        if not self.source_dir.exists():
            print(f"❌ Dossier source non trouvé: {source_path}")
            return False
        print(f"📁 Dossier source: {self.source_dir}")
        return True
    
    def load_oliviers_data(self):
        """Charge les données des oliviers depuis le JSON"""
        json_file = Path("../data/oliviers-processed.json")
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            print(f"📊 {len(data['oliviers'])} oliviers chargés")
            return data['oliviers']
        except Exception as e:
            print(f"❌ Erreur chargement JSON: {e}")
            return []
    
    def find_photo_file(self, filename_pattern):
        """Trouve le fichier photo correspondant"""
        if not filename_pattern or not self.source_dir:
            return None
            
        # Nettoyer le nom de fichier
        clean_name = filename_pattern.replace('.jpg', '').replace('.jpeg', '')
        
        # Chercher avec différentes extensions
        for ext in ['.jpg', '.jpeg', '.JPG', '.JPEG']:
            photo_path = self.source_dir / f"{clean_name}{ext}"
            if photo_path.exists():
                return photo_path
                
        return None
    
    def process_image(self, source_path, output_name):
        """Traite une image (thumbnail + full)"""
        try:
            with Image.open(source_path) as img:
                # Corriger l'orientation EXIF
                img = ImageOps.exif_transpose(img)
                
                # Créer thumbnail
                thumb = img.copy()
                thumb.thumbnail(self.thumb_size, Image.Resampling.LANCZOS)
                thumb_path = self.images_dir / f"{output_name}_thumb.jpg"
                thumb.save(thumb_path, 'JPEG', quality=85, optimize=True)
                
                # Créer version complète
                full = img.copy()
                full.thumbnail(self.full_size, Image.Resampling.LANCZOS)
                full_path = self.images_dir / f"{output_name}_full.jpg"
                full.save(full_path, 'JPEG', quality=90, optimize=True)
                
                print(f"  ✅ {output_name}: {thumb.size} + {full.size}")
                return True
                
        except Exception as e:
            print(f"  ❌ Erreur {output_name}: {e}")
            return False
    
    def create_default_images(self):
        """Crée des images par défaut pour les oliviers sans photo"""
        # Image par défaut simple (olive verte)
        default_img = Image.new('RGB', (300, 200), color='#90C695')
        
        # Ajouter texte "Photo à venir"
        try:
            from PIL import ImageDraw, ImageFont
            draw = ImageDraw.Draw(default_img)
            
            # Texte centré
            text = "Photo à venir\n🫒"
            bbox = draw.textbbox((0, 0), text)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            
            x = (300 - text_width) // 2
            y = (200 - text_height) // 2
            
            draw.text((x, y), text, fill='white', anchor='mm')
        except:
            pass  # Pas grave si pas de font
        
        # Sauvegarder
        default_path = self.images_dir / "default.jpg"
        default_img.save(default_path, 'JPEG', quality=85)
        
        # Copier aussi en _thumb et _full
        shutil.copy(default_path, self.images_dir / "default_thumb.jpg")
        shutil.copy(default_path, self.images_dir / "default_full.jpg")
        
        print("🖼️ Images par défaut créées")
    
    def process_all_images(self):
        """Traite toutes les images des oliviers"""
        oliviers = self.load_oliviers_data()
        if not oliviers:
            return
        
        # Créer le dossier de destination
        self.images_dir.mkdir(parents=True, exist_ok=True)
        
        print(f"\n🖼️ TRAITEMENT DES IMAGES")
        print("=" * 50)
        
        processed = 0
        not_found = 0
        
        for olivier in oliviers:
            olivier_id = olivier['id']
            photo_info = olivier.get('photo', '')
            
            # Extraire le nom de fichier original
            if 'images/oliviers/' in photo_info:
                filename = photo_info.split('/')[-1].replace('_thumb.jpg', '.jpg')
            else:
                # Chercher dans les métadonnées
                filename = None
                
            print(f"🫒 {olivier_id}: ", end="")
            
            if filename:
                # Chercher le fichier source
                source_path = self.find_photo_file(filename.replace('.jpg', ''))
                
                if source_path:
                    if self.process_image(source_path, olivier_id):
                        processed += 1
                    else:
                        not_found += 1
                        print(f"  ⚠️ Erreur traitement")
                else:
                    not_found += 1
                    print(f"  ❌ Photo non trouvée: {filename}")
            else:
                not_found += 1
                print(f"  ⚠️ Pas de nom de photo")
        
        # Créer images par défaut
        self.create_default_images()
        
        print(f"\n📊 RÉSUMÉ:")
        print(f"✅ Images traitées: {processed}")
        print(f"❌ Non trouvées: {not_found}")
        print(f"🖼️ Total oliviers: {len(oliviers)}")
    
    def run(self, source_directory=None):
        """Lance le processus complet"""
        print("🖼️ IMAGE PROCESSOR - OLIVIERS CENTENAIRES")
        print("=" * 50)
        
        # Demander le dossier source si pas fourni
        if not source_directory:
            source_directory = input("📁 Dossier source des photos: ").strip()
            if not source_directory:
                print("❌ Dossier source requis")
                return
        
        # Configurer le dossier source
        if not self.set_source_directory(source_directory):
            return
        
        # Traiter toutes les images
        self.process_all_images()
        
        print("\n✅ TERMINÉ!")
        print(f"📁 Images dans: {self.images_dir}")

def main():
    processor = ImageProcessor()
    
    # Dossiers suggérés
    print("💡 Dossiers suggérés:")
    print("   ~/Bureau/photos_oliviers/")
    print("   ~/Downloads/")
    print("   /path/to/your/photos/")
    
    processor.run()

if __name__ == "__main__":
    main()
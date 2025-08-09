#!/usr/bin/env python3
"""
KML Parser - Oliviers Centenaires Alejandra Galván
Parse le fichier KML et génère les données JSON pour la carte interactive
"""

import xml.etree.ElementTree as ET
import json
import re
from datetime import datetime
from pathlib import Path
import os

class KMLParser:
    def __init__(self):
        self.oliviers = []
        self.stats = {
            'total': 0,
            'with_photos': 0,
            'zones': {}
        }
        
    def parse_kml_file(self, kml_file):
        """Parse le fichier KML principal"""
        print(f"🗺️ Parsing {kml_file}...")
        
        try:
            tree = ET.parse(kml_file)
            root = tree.getroot()
            
            # Namespace KML
            ns = {'kml': 'http://www.opengis.net/kml/2.2'}
            
            # Parcourir tous les Placemark
            for placemark in root.findall('.//kml:Placemark', ns):
                olivier_data = self.parse_placemark(placemark, ns)
                if olivier_data:
                    self.oliviers.append(olivier_data)
                    self.stats['total'] += 1
                    
            print(f"✅ {len(self.oliviers)} oliviers extraits")
            return True
            
        except Exception as e:
            print(f"❌ Erreur parsing KML: {e}")
            return False
    
    def parse_placemark(self, placemark, ns):
        """Parse un placemark individuel"""
        try:
            # Nom de l'olivier
            name_elem = placemark.find('kml:name', ns)
            name = name_elem.text if name_elem is not None else "Olivier inconnu"
            
            # Description avec métadonnées
            desc_elem = placemark.find('kml:description', ns)
            description = desc_elem.text if desc_elem is not None else ""
            
            # Coordonnées
            coords_elem = placemark.find('.//kml:coordinates', ns)
            if coords_elem is None:
                return None
                
            coords_text = coords_elem.text.strip()
            lon, lat, alt = map(float, coords_text.split(','))
            
            # Parser la description pour extraire métadonnées
            metadata = self.parse_description(description)
            
            # Générer un ID unique
            olivier_id = self.generate_id(name, lat, lon)
            
            # Déterminer la zone géographique
            zone = self.determine_zone(lat, lon)
            self.stats['zones'][zone] = self.stats['zones'].get(zone, 0) + 1
            
            olivier = {
                'id': olivier_id,
                'name_raw': name,
                'coordinates': [lat, lon],
                'altitude': alt,
                'zone': zone,
                'metadata_raw': metadata,
                'photo_filename': metadata.get('titulo', ''),
                'date_survey': metadata.get('fecha', ''),
                'needs_enrichment': True,
                # Champs à enrichir manuellement
                'age': None,
                'variety': None, 
                'health_score': None,
                'production': None,
                'owner': None,
                'description': {
                    'fr': f"Olivier {name.replace('Olivo ', '')} - Données à enrichir",
                    'es': f"Olivo {name.replace('Olivo ', '')} - Datos por enriquecer"
                }
            }
            
            # Vérifier si photo existe
            if olivier['photo_filename']:
                self.stats['with_photos'] += 1
                
            return olivier
            
        except Exception as e:
            print(f"⚠️ Erreur parsing placemark {name}: {e}")
            return None
    
    def parse_description(self, description):
        """Parse la description pour extraire les métadonnées"""
        metadata = {}
        
        if not description:
            return metadata
            
        # Patterns pour extraire les données
        patterns = {
            'titulo': r'📍 Título: ([^\n]+)',
            'olivo': r'🫒 Olivo: ([^\n]+)',
            'ubicacion': r'📍 Ubicación: ([^\n]+)',
            'altitud': r'⛰️ Altitud: ([^\n]+)',
            'fecha': r'📅 Fecha: ([^\n]+)'
        }
        
        for key, pattern in patterns.items():
            match = re.search(pattern, description)
            if match:
                metadata[key] = match.group(1).strip()
                
        return metadata
    
    def generate_id(self, name, lat, lon):
        """Génère un ID unique pour l'olivier"""
        # Nettoyer le nom
        clean_name = name.replace('Olivo ', '').replace(' ', '_').upper()
        
        # Utiliser coordonnées pour unicité
        coord_hash = f"{lat:.4f}_{lon:.4f}".replace('.', '').replace('-', 'N')
        
        return f"OLV_{clean_name}_{coord_hash[-6:]}"
    
    def determine_zone(self, lat, lon):
        """Détermine la zone géographique basée sur les coordonnées"""
        # Zones approximatives selon les coordonnées
        if lat > -18.1:
            return "Tacna_Norte"
        elif lat > -18.15:
            return "Tacna_Centro"  
        elif lat > -18.25:
            return "Tacna_Valle"
        else:
            return "Tacna_Sud"
    
    def enrich_data_interactive(self):
        """Interface interactive pour enrichir les données"""
        print(f"\n📝 ENRICHISSEMENT DES DONNÉES ({len(self.oliviers)} oliviers)")
        print("=" * 60)
        
        for i, olivier in enumerate(self.oliviers, 1):
            print(f"\n🫒 OLIVIER {i}/{len(self.oliviers)}")
            print(f"ID: {olivier['id']}")
            print(f"Nom: {olivier['name_raw']}")
            print(f"Zone: {olivier['zone']}")
            print(f"Coordonnées: {olivier['coordinates'][0]:.4f}, {olivier['coordinates'][1]:.4f}")
            print(f"Photo: {olivier['photo_filename']}")
            
            # Demander enrichissement
            enrich = input("\n💡 Enrichir cet olivier ? (y/n/q pour quitter): ").strip().lower()
            
            if enrich == 'q':
                break
            elif enrich == 'y':
                self.enrich_single_olivier(olivier)
            
        print("✅ Enrichissement terminé")
    
    def enrich_single_olivier(self, olivier):
        """Enrichit un olivier individuel"""
        print("\n📋 ENRICHISSEMENT:")
        
        # Âge estimé
        age = input("🕐 Âge estimé (années, ou Enter pour N/A): ").strip()
        olivier['age'] = int(age) if age.isdigit() else None
        
        # Variété
        variety = input("🌿 Variété (Sevillana, Manzanilla, etc.): ").strip()
        olivier['variety'] = variety if variety else None
        
        # État sanitaire (1-10)
        while True:
            health = input("💚 État sanitaire (1-10, ou Enter pour N/A): ").strip()
            if not health:
                olivier['health_score'] = None
                break
            elif health.isdigit() and 1 <= int(health) <= 10:
                olivier['health_score'] = int(health)
                break
            else:
                print("❌ Entrez un nombre entre 1 et 10")
        
        # Production
        production = input("🫒 Production (kg/an, ou Enter pour N/A): ").strip()
        olivier['production'] = production if production else None
        
        # Propriétaire
        owner = input("👤 Propriétaire (ou Enter pour N/A): ").strip()
        olivier['owner'] = owner if owner else None
        
        # Descriptions
        print("\n📝 DESCRIPTIONS:")
        desc_es = input("ES - Descripción: ").strip()
        desc_fr = input("FR - Description: ").strip()
        
        if desc_es:
            olivier['description']['es'] = desc_es
        if desc_fr:
            olivier['description']['fr'] = desc_fr
            
        olivier['needs_enrichment'] = False
        print("✅ Olivier enrichi!")
    
    def generate_json_output(self, output_file="oliviers-processed.json"):
        """Génère le fichier JSON final"""
        
        # Construire la structure JSON finale
        json_data = {
            "schema_version": "1.0",
            "last_update": datetime.now().isoformat(),
            "source": "kml_import",
            "stats": {
                "total_oliviers": len(self.oliviers),
                "with_photos": self.stats['with_photos'],
                "zones": self.stats['zones'],
                "enriched": sum(1 for o in self.oliviers if not o.get('needs_enrichment', True))
            },
            "oliviers": []
        }
        
        # Transformer chaque olivier au format final
        for olivier in self.oliviers:
            formatted_olivier = self.format_olivier_for_web(olivier)
            json_data["oliviers"].append(formatted_olivier)
        
        # Sauvegarder
        output_path = Path("../data") / output_file
        output_path.parent.mkdir(exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, indent=2, ensure_ascii=False)
            
        print(f"💾 JSON généré: {output_path}")
        return str(output_path)
    
    def format_olivier_for_web(self, olivier):
        """Formate un olivier pour la carte web"""
        
        # Déterminer l'état basé sur health_score
        if olivier['health_score']:
            if olivier['health_score'] >= 8:
                etat = 'excellent'
            elif olivier['health_score'] >= 6:
                etat = 'good'
            else:
                etat = 'poor'
        else:
            etat = 'good'  # Par défaut
        
        # Nom de la photo (avec fallback)
        photo_name = olivier['photo_filename'].replace('.jpg', '_thumb.jpg') if olivier['photo_filename'] else 'default.jpg'
        
        return {
            "id": olivier['id'],
            "lat": olivier['coordinates'][0],
            "lng": olivier['coordinates'][1],
            "region": olivier['zone'].replace('_', ' '),
            "secteur": f"Zone {olivier['zone'].split('_')[1]}",
            "age": olivier.get('age') or 0,
            "variete": olivier.get('variety') or 'N/A',
            "etat": etat,
            "note": olivier.get('health_score') or 5,
            "proprietaire": olivier.get('owner') or 'N/A',
            "production": olivier.get('production') or 'N/A',
            "photo": f"images/oliviers/{photo_name}",
            "details": {
                "fr": {
                    "nom": olivier['name_raw'].replace('Olivo ', 'Olivier '),
                    "description": olivier['description']['fr'],
                    "localisation": f"{olivier['zone'].replace('_', ' ')}, Tacna",
                    "caracteristiques": f"Alt: {olivier['altitude']:.1f}m",
                    "sante": f"Score: {olivier.get('health_score', 'N/A')}/10"
                },
                "es": {
                    "nom": olivier['name_raw'],
                    "description": olivier['description']['es'],
                    "localisation": f"{olivier['zone'].replace('_', ' ')}, Tacna",
                    "caracteristiques": f"Alt: {olivier['altitude']:.1f}m",
                    "sante": f"Puntaje: {olivier.get('health_score', 'N/A')}/10"
                }
            }
        }
    
    def show_summary(self):
        """Affiche un résumé des données"""
        print("\n📊 RÉSUMÉ DES DONNÉES")
        print("=" * 50)
        print(f"🫒 Total oliviers: {self.stats['total']}")
        print(f"📸 Avec photos: {self.stats['with_photos']}")
        print(f"🗺️ Zones géographiques:")
        for zone, count in self.stats['zones'].items():
            print(f"   • {zone}: {count} oliviers")
        
        enriched = sum(1 for o in self.oliviers if not o.get('needs_enrichment', True))
        print(f"✅ Enrichis: {enriched}/{len(self.oliviers)}")
        
    def run(self, kml_file, enrich=True):
        """Lance le processus complet"""
        print("🗺️ KML PARSER - OLIVIERS CENTENAIRES")
        print("=" * 50)
        
        # 1. Parser KML
        if not self.parse_kml_file(kml_file):
            return False
            
        # 2. Afficher résumé
        self.show_summary()
        
        # 3. Enrichissement optionnel
        if enrich:
            proceed = input("\n💡 Procéder à l'enrichissement interactif ? (y/N): ").strip().lower()
            if proceed == 'y':
                self.enrich_data_interactive()
        
        # 4. Génération JSON
        json_file = self.generate_json_output()
        
        print(f"\n✅ TERMINÉ!")
        print(f"📁 JSON: {json_file}")
        print(f"📊 {len(self.oliviers)} oliviers traités")
        
        return json_file

def main():
    parser = KMLParser()
    
    # Fichier KML source
    kml_file = "../data/mapa_01_Olivos_Centenarios.kml"
    
    if not os.path.exists(kml_file):
        print(f"❌ Fichier KML non trouvé: {kml_file}")
        print("💡 Placez le fichier KML dans le dossier data/")
        return
    
    # Lancer le parsing
    result = parser.run(kml_file, enrich=True)
    
    if result:
        print(f"\n🚀 Prochaines étapes:")
        print("1. Copier les photos dans images/oliviers/")
        print("2. Redimensionner en vignettes (_thumb.jpg)")  
        print("3. Mettre à jour carte-oliviers.js")
        print("4. Tester en local")

if __name__ == "__main__":
    main()
try:
    import google.generativeai as genai
except ImportError:
    genai = None

import sys
import os

# Paberlennukite klassifitseerija prototüüp (Gemini API baasil)
# Süsteem koosneb 3-astmelisest valideerimisest ja juhendamisest.

def configure_api():
    # Tõelises rakenduses kasutaksime keskkonnamuutujaid
    # api_key = os.environ.get("GEMINI_API_KEY", "SINU_API_VÕTI_SIIA")
    # genai.configure(api_key=api_key)
    pass

def classify_and_instruct(image_path_or_url):
    print(f"[*] Analüüsin pilti: {image_path_or_url}")
    
    # Valime mudeli (Gemini 1.5 Pro või Flash)
    # model = genai.GenerativeModel('gemini-1.5-flash')
    
    # Prompti koostamine - implementeerime 3-astmelise loogika ühes päringus, 
    # et säästa API kulusid ja kiirendada vastust (Agiilne XP printsiip "Simple Design")
    prompt = """
    Oled tarkvaraline paberlennukite süsteem, millel on range 3-astmeline töövoog. 
    Analüüsi antud pilti ja tagasta vastus JÄRGMISE JSON struktuurina:
    {
        "is_airplane_like": boolean,
        "is_paper_airplane": boolean,
        "airplane_type": string or null,
        "error_message": string or null,
        "folding_instructions": string or null
    }

    Reeglid:
    Samm A: Kas pildil on lennuk või lennukitaoline objekt? Kui EI (nt on kass), siis "is_airplane_like": false ja lisa humoorikas "error_message" (nt "See on ju kass, mitte lennuk!").
    Samm B: Kui ON lennukitaoline, kas see on PABERLENNUK? Kui pildil on päris lennuk (nt Boeing 737), siis "is_paper_airplane": false ja lisa humoorikas "error_message" (nt "Seda sa klassiruumis ei lennuta, see on päris lennuk!").
    Samm 3: Kui ON paberlennuk ("is_paper_airplane": true), siis tuvasta mudel ("airplane_type": nt "purilennuk" või "klassikaline nool") ning "error_message": null.
    Juhendamine: Kui tüüp on tuvastatud, anna "folding_instructions" väljal lühike samm-sammuline õpetus ja link YouTube'i, kuidas seda voltida.
    """
    
    # (Siin laeksime tegelikkuses pildi alla/loeksime sisse ja annaksime Gemini API-le)
    # Prototüübi demonstreerimiseks prindime välja eeldatava andmevoo arhitektuuri.
    print("[*] Saadan palve Gemini Vision mudelile...")
    print("[*] (Simuleeritud väljund)\n")
    
    # Simuleerime vastuseid testpiltide põhjal:
    if "boeng" in image_path_or_url.lower():
        print("""{
  "is_airplane_like": true,
  "is_paper_airplane": false,
  "airplane_type": null,
  "error_message": "Vau, võta hoogu maha piloot! See on Boeing 737, mitte paberist käsitöö. Pealegi ei mahu see aknast välja.",
  "folding_instructions": null
}""")
    elif "kass" in image_path_or_url.lower():
        print("""{
  "is_airplane_like": false,
  "is_paper_airplane": false,
  "airplane_type": null,
  "error_message": "Mjäu! Oled kindel, et tahad seda lennutada? See ei ole lennuk.",
  "folding_instructions": null
}""")
    else:
        print("""{
  "is_airplane_like": true,
  "is_paper_airplane": true,
  "airplane_type": "purilennuk",
  "error_message": null,
  "folding_instructions": "1. Võta A4 paber. 2. Murra pooleks. 3. Voldi nurgad keskele... Vaata videot: https://www.youtube.com/watch?v=3BNg4fDJC8A"
}""")

if __name__ == "__main__":
    test_images = [
        "https://cyberplanet.tech/tthk/agile/pics/boeng737.jpg",
        "https://cyberplanet.tech/tthk/agile/pics/purilennuk.jpg",
        "https://cyberplanet.tech/tthk/agile/pics/kass.jpg"
    ]
    
    for img in test_images:
        classify_and_instruct(img)
        print("-" * 50)
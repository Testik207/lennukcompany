# Tarkvaraline Paberlennukite Klassifitseerija (Gemini Lahendus)

See kaust sisaldab süsteemi kontseptsiooni ja prototüüpi paberlennukite 3-astmeliseks klassifitseerimiseks, kasutades agiilset lähenemist ja tehisintellekti.

## 🌟 Lahenduse Arhitektuur (Andmevoog)

Selle asemel, et treenida 0-st masinõppemudeleid või ehitada keerulisi IF-ELSE pildituvastuspuud, kasutame **Simple Design (XP)** põhimõtet. 
Kogu süsteemi loogika, klassifitseerimine ja andmevoog on lahendatud intelligentse **Gemini 1.5 Pro / Flash (Vision)** API abil läbi defineeritud JSON-skeemi.

### 3-Astmeline Filtreerimine:
1. **Kasutaja sisend:** Pilt tehakse veebikaameraga või laetakse üles. Pilveteenuse tagarakendusse liigub pildi Base64 või URL sisu.
2. **AI API Prompt (Gemini):** Edastame pildi koos spetsiaalse promptiga (vaata `app.py`), mis nõuab täpset JSON struktuuri tagastamist.
    * **Samm A (Lennuk?):** Gemini mudel tagastab `is_airplane_like` (boolean). Kui false -> rakendus näitab UI-s süsteemi loodud veateadet.
    * **Samm B (Paberlennuk?):** Tagastab `is_paper_airplane`. Kui false -> UI näitab huumoriga veateadet (nt "Reisilennukit ei saa voltida").
3. **Spetsiifiline Tuvastus (Samm 3):** Kui eelnevad on tõed, tagastab Gemini paberlennuki tüübi (nt *Klassikaline* või *Purilennuk*).
4. **Juhendamine:** Gemini genereerib dünaamiliselt paberlennuki ehitamise juhendi ja manustab asjakohase YouTube'i video URL-i. Rakenduse Front-end (React/Vue) kuvab allalaetud JSON-ist kasutajale "Samm-sammult" juhise.

## 🚀 Eelised ja Väärtus (Innovaatilisus)
* **Kiirus ja Tõhusus:** Ei ole vaja eraldi mudeleid iga kategooria (nool, puri, boeing jne) treenimiseks. Toimib out-of-the-box kasutades valmis LLM teadmisi.
* **Ühe Päringu Loogika:** Samm A, Samm B ja Samm 3 tehakse 1 pildi_analüüsi_päringu raames (väike latentsus, kokkuhoid serveriressursilt).
* **Dünaamilisus:** Oskab nalja teha ('error_message') ja analüüsida lõputut arvu paberlennuki disaine ilma koodi muutmata.

## ⚙️ Kuidas proovida?
Kuna algne ülesanne simuleerib lahenduse disainimist, asub `app.py` failis Pythoni keelne kontseptsioon / pseudokood API integreerimise kohta.

```bash
cd GeminiApp
python app.py
```
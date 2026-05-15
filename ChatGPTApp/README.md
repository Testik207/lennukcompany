# Paberlennukite klassifitseerija

Agile praktikumi prototüüp, mis näitab kolmeastmelist pildipõhist töövoogu:

1. kas pildil on lennuk;
2. kas lennuk on paberlennuk;
3. milline paberlennuki tüüp on pildil.

Rakendus on tehtud staatilise HTML/CSS/JS prototüübina, et seda saaks praktikumis kohe avada ja kasutada.

## Käivitamine

Ava brauseris:

```text
ChatGPTApp/index.html
```

## Testpildid

- `https://cyberplanet.tech/tthk/agile/pics/purilennuk.jpg` - päris purilennuk, peatub sammus B.
- `https://cyberplanet.tech/tthk/agile/pics/paberlennuk.jpg` - paberlennuk, jõuab voltimisjuhiseni.
- `https://cyberplanet.tech/tthk/agile/pics/boeng737.jpg` - päris reisilennuk, peatub sammus B.

## MVP loogika

Praegune demo kasutab näidiskaartide puhul testpildi ID põhist reegliadapterit. Üleslaetud piltide jaoks laeb brauser TensorFlow.js COCO-SSD mudeli ja kontrollib päriselt, kas pildil on `airplane` klass. Kuna COCO-SSD ei tunne paberlennukit eraldi klassina, töötab selle järel konservatiivne paberkuju analüüs: suur hele, nurgeline ja kitsenev objekt liigub klassikalise paberlennuki juhiseni. Tootelahenduses võiks sama liidese taga töötada OpenAI Vision API, Claude Vision või eraldi treenitud Teachable Machine mudel kategooriatega `muu`, `päris lennuk`, `klassikaline paberlennuk`, `paberist purilennuk`.

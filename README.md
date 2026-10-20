# ATLAS — Tavolozza viva 0.1

**Autore e direzione:** Dasion  
**Collaborazione editoriale:** Dasion in dialogo con ChatGPT  
**Data della prima tavolozza:** 20 ottobre 2026  
**Stato:** Contenuti bilingui preparati su `feature/atlas-living-wall-0.1`; le impostazioni e la pubblicazione GitHub Pages sono gestite dal proprietario del repository.

## Che cos'è

ATLAS non è più soltanto un indice statico: è un **quadro narrativo interattivo**
costruito un aggiornamento alla volta. Ogni capitolo può rimandare a un altro,
senza pretendere che la ricerca abbia già un esito o un unico percorso.

Il nuovo ingresso è `index.html`. Il vecchio Open Observatory è stato
preservato in `observatory.html` con ancore `#A01` … `#A08`.

## Funzioni del Muro

- **Novità**: cronologia, ricerca testuale, filtro categoria e capitoli espandibili.
- **Percorsi**: tre itinerari navigabili con rimandi alle pubblicazioni e alle
  otto schede originali.
- **Archivio**: ingresso alla versione originaria.
- **Aggiorna**: ricarica `wall.json` senza aggiornare l'intera pagina.
- Nessuna piattaforma esterna per i commenti, nessun account pubblico,
  nessuna spesa API o backend necessario per consultare il quadro.

## Contenuti e privacy

- `wall.json`: testi e collegamenti del diario in italiano.
- `wall.en.json`: traduzione inglese completa degli stessi capitoli e percorsi.
- `wall.js`: interfaccia IT/EN e selezione del file di lingua tramite `?lang=it` o `?lang=en`.
- `wall.js`: legge il JSON e crea il feed in modo sicuro con `textContent`.
- `wall.css`: stile responsive.
- `index.html`: nuovo portale.
- `observatory.html`: archivio originale, con filtro delle otto schede.
- `analytics-config.js` / `analytics.js`: contatore GoatCounter **spento**
  finché non è configurato un codice pubblico.
- `admin/index.html`: **solo un mockup pubblico, non un'area privata**.
  Non inserire password, credenziali o dati privati nel repository.

Il quadro può essere letto da **chiunque** se pubblicato. Le statistiche
aggregate non identificano una specifica persona, e nessun contenuto è
rappresentato come messaggio di/verso una persona determinata.

## Come aggiungere un capitolo

Vedi [docs/QUADRO_VIVO.md](docs/QUADRO_VIVO.md). In sintesi:
1. Scriviamo il capitolo, decidiamo insieme se è adatto alla pubblicazione.
2. Aggiungiamo un oggetto a `posts` in `wall.json` usando un nuovo ID (es. `n004`).
3. Aggiorniamo il campo `updated` e, se utile, colleghiamo il capitolo a
   un percorso in `trails`.
4. Verifichiamo che il JSON sia valido; quando il sito verrà pubblicato,
   il feed mostrerà il testo all'aggiornamento della pagina.
5. Nessun post appare in automatico da questa chat: ogni modifica
   richiede un aggiornamento esplicito dei contenuti del repository.

## Anteprima e futura pubblicazione gratuita

Senza toccare `main`, si può testare il sito con un piccolo server HTTP
locale dalla cartella del repository (`python -m http.server 8000`) e aprendo
`http://localhost:8000/`. Questo serve perché `fetch` legge `wall.json`.

Per avere un sito pubblico gratuito con GitHub Pages, configurare
**Settings → Pages → Deploy from a branch** sul ramo voluto e su `/(root)`.
La pubblicazione è un'azione distinta dai commit di sviluppo; richiede la
scelta esplicita del titolare del repository. Non attiviamo il sito né
cambiamo la visibilità del repository con questa versione.

## Confini tra scienza, interpretazione e narrativa

Le schede distinguono nozioni consolidate, questioni aperte, ipotesi non
verificate e analogie letterarie. Questo archivio **non** dimostra una
teoria fisica universale né costituisce prova della partecipazione,
lettura o approvazione di una figura pubblica.

## Contatore futuro

[docs/ADMIN_VISITS.md](docs/ADMIN_VISITS.md) descrive il setup GoatCounter e
la futura area amministrativa sicura. Per ora il contatore resta disabilitato.

## Italiano / English

L'ingresso alla Tavolozza usa l'italiano di default:
- Italiano: `https://dasionlabaj.github.io/atlas-open-observatory/?lang=it`
- English: `https://dasionlabaj.github.io/atlas-open-observatory/?lang=en`

Il selettore **IT / EN** è nella barra superiore. Cambia testi della pagina,
capitoli, categorie, ricerca, percorsi e formati delle date. I link al diario
conservano gli identificatori `#n001`, `#n002` ecc. in entrambe le lingue.
La vecchia pagina `observatory.html` contiene già le otto schede **in inglese**
e offre link di ritorno a entrambe le lingue della Tavolozza.

Ogni aggiornamento deve essere pubblicato in **entrambi** i file
`wall.json` e `wall.en.json`, mantenendo identici `id`, `date`,
`tag` (chiavi canoniche italiane), e destinazioni `href`.
I testi visibili devono essere tradotti e revisionati; nessuna traduzione
automatica viene eseguita dal browser o da servizi di terze parti.

Le visite rimangono aggregate e non consentono di identificare chi legge.

# ATLAS — Protocollo editoriale della Tavolozza viva

## Obiettivo

Una pagina su cui tornare per leggere aggiornamenti come in un feed, aprire
capitoli e attraversare i bivi. **Non** è un social network: non ha account
dei lettori, notifiche push, commenti o pubblicazione dalla pagina.

## Struttura dei post

Ogni elemento di `posts` in `wall.json` contiene:

```json
{
  "id": "n004",
  "date": "2026-10-21",
  "tag": "Diario",
  "title": "Titolo del capitolo",
  "lead": "Una frase d'introduzione",
  "paragraphs": ["Primo paragrafo.", "Secondo paragrafo."],
  "links": [
    {"text": "Una delle otto idee", "href": "observatory.html#A01"},
    {"text": "Un'altra pubblicazione", "href": "#n001"}
  ]
}
```

- Usa un ID nuovo e stabile per ogni articolo.
- L'ordine nell'array è quello della pubblicazione (più recenti per primi).
- Le categorie attualmente disponibili nell'interfaccia sono:
  `Diario`, `Metodo`, `Archivio`.
- In `trails` collega gli articoli e le voci precedenti per costruire
  percorsi; ciascun collegamento deve puntare a `observatory.html#A01` …
  `#A08`, `observatory.html` o a un ID `#nNNN`.
- Per nuovi tipi, categorie o destinazioni aggiorna insieme `wall.js`
  e `index.html`, che filtrano i link con una lista di pattern ammessi.
- Aggiorna `updated` alla data dell'ultima edizione.
- Prima di pubblicare, ricontrolla grammatica, attribuzioni,
  accuratezza, confini tra ipotesi e osservazioni, e dati personali.

## Flusso minimo di pubblicazione

1. Scrivere e revisionare il prossimo post con Dasion.
2. Salvare `wall.json` con un commit su ramo di lavoro.
3. Controllare in anteprima il feed, l'espansione, i filtri e i link.
4. Solo dopo approvazione, pubblicare il commit sulla sorgente
   configurata per il sito.
5. Aprire il portale, premere **Aggiorna** e verificare il post.

**Attenzione:** il browser non invia nuovi post da sé e una chat ChatGPT
non aggiorna automaticamente il sito. Gli inserimenti avvengono tramite
commit verificabili. In futuro un CMS autenticato potrà consentire l'editing
direttamente dall'area admin, con protezione lato server.

## Cosa conta come pubblico

Un articolo inserito in un repository pubblico è visibile anche se non è
ancora distribuito tramite GitHub Pages. Non pubblicare contatti privati,
messaggi riservati, credenziali, questioni mediche o informazioni personali
di terzi. Non usare i dati di traffico per dedurre l'identità del lettore.

## Controlli manuali

- Caricamento di `wall.json` tramite HTTP e senza JavaScript errors.
- Nessuna interpolazione HTML proveniente dal JSON (si usa `textContent`).
- Le sezioni Novità, Percorsi e Archivio sono apribili.
- Ricerca, filtro e pulsante **Aggiorna** funzionano.
- I rimandi `#n001` e `observatory.html#A01` aprono le voci corrette.
- Su viewport piccoli le schede e la navigazione restano leggibili.
- L'account amministratore reale non è ancora implementato.

# ATLAS Control Room 0.1 — Visite (preparazione, senza costi)

## Stato

La branch `feature/admin-visits-0.1` prepara il portale al monitoraggio di semplici visite.
Non pubblica il sito, non crea utenti e non attiva analytics finché il codice GoatCounter è vuoto.
`admin/index.html` è una **anteprima pubblicamente leggibile**, non un login e non un'area protetta.
I numeri nella preview sono volutamente mostrati come `—`: non inventare statistiche.

## Attivazione futura (solo dopo autorizzazione alla pubblicazione)

1. Il titolare registra **manualmente** un account gratuito su https://www.goatcounter.com/signup .
   Usare una password sicura e non comunicarla, né scriverla nel repository.
2. L'account ha un nome/codice *pubblico* (per esempio `atlasdaxs`, se disponibile):
   la dashboard è `https://CODICE.goatcounter.com/`.
3. Nel pannello GoatCounter, lasciare la dashboard visibile solo agli utenti autenticati.
   Le impostazioni per mostrare il contatore al pubblico possono rimanere disattivate.
4. Inserire **solo il codice pubblico** tra le virgolette in `analytics-config.js`.
   Non inserire email, password, chiavi API, o token segreti.
5. Verificare localmente markup e accessibilità; quando autorizzato, pubblicare il sito.
   Visitare il sito realmente pubblico e controllare dal proprio login GoatCounter
   che il conteggio sia aggiornato. Il conteggio non parte prima della pubblicazione.
6. Per non contare le visite dell'amministratore, usare la funzione GoatCounter
   documentata come “Prevent tracking my own pageviews”.

## Privacy e metriche

- Lo script `analytics.js` carica il contatore solo quando c'è un codice valido
  e la pagina è su HTTP(S) fuori dal localhost; con codice vuoto non fa richieste esterne.
- Nessun cookie di tracciamento è aggiunto dal codice Atlas; consultare la privacy
  aggiornata di GoatCounter. La pagina cambia il badge “No tracking” in
  “Cookie-free visit statistics” quando la funzione è configurata.
- GoatCounter conta in genere *visite per sessione/percorso*, non persone identificabili
  né un contatore indiscriminato di ogni refresh.
- La dashboard GoatCounter gestisce le credenziali. Il nostro HTML non gestisce login.
- Non esporre endpoint dell'API GoatCounter con bearer token sul frontend.

## Evoluzione

Quando il gateway Atlas funzionerà e ci sarà un dominio:
realizzare un vero `/admin` protetto lato server, sessioni sicure e autorizzazioni,
poi integrare i dati aggregati con un endpoint autenticato nel backend.
La pagina `admin/index.html` resta soltanto una *anteprima* finché ciò non avviene.

Documentazione ufficiale:
- https://www.goatcounter.com/help/start
- https://www.goatcounter.com/help/sessions
- https://www.goatcounter.com/help/api
- https://www.goatcounter.com/help/skip-dev

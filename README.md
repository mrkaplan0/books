# Leseklub – Bücher entdecken

Eine Vue-Anwendung zum Entdecken und Durchsuchen von Büchern. Buchdaten werden über die Google Books API geladen und als Übersicht, animierter Slider und Detailansicht dargestellt. Das Projekt befindet sich in Entwicklung.

## Funktionen

- Startseite mit Buchübersicht und animiertem Slider.
- Buchsuche über die Google Books API.
- Bücherregal mit einer vordefinierten Auswahl aus `src/config/books.js`.
- Buchkarten mit einer flächendeckenden Detailvorschau beim Hover und einem Link zur Detailseite.
- Detailseite mit Beschreibung, Autor, Verlag, Sprache, Erscheinungsdatum, Seitenzahl und Verfügbarkeit von EPUB und PDF.
- Bücher zum Warenkorb hinzufügen und wieder entfernen; die Anzahl erscheint als Badge im Header.
- Responsiver Header mit einblendbarer Suche auf kleinen Bildschirmen.

## Technischer Aufbau

| Bereich                 | Technologien                                   |
| ----------------------- | ---------------------------------------------- |
| Oberfläche              | Vue 3, Composition API, Single File Components |
| Navigation              | Vue Router                                     |
| Zustandsverwaltung      | Pinia                                          |
| API-Anbindung           | Axios, Google Books API                        |
| Animationen und Symbole | GSAP, Swiper, Lucide                           |
| Entwicklung und Build   | Vite                                           |
| Tests                   | Vitest, Vue Test Utils, jsdom                  |
| Codequalität            | ESLint, Oxlint, Prettier                       |

## Lokal starten

### Voraussetzungen

- Node.js gemäß `package.json`: `^22.18.0 || >=24.12.0`.
- npm.
- Internetzugang für Buchdaten und externe Bilder.

### Installation

Im Projektverzeichnis die Abhängigkeiten installieren:

```sh
npm ci
```

### Konfiguration

Im Projektverzeichnis eine Datei `.env.local` erstellen:

```dotenv
VITE_API_BASE_URL=https://www.googleapis.com/books/v1
VITE_GOOGLE_BOOKS_API_KEY=DEIN_GOOGLE_BOOKS_API_SCHLUESSEL
```

Den Platzhalter durch den eigenen API-Schlüssel ersetzen. Die Konfiguration wird über `src/config/apiConfig.js` eingelesen. Nach Änderungen an den Umgebungsvariablen den Entwicklungsserver neu starten.

Dateien mit lokalen Umgebungsvariablen werden von Git ignoriert. Vite-Variablen mit dem Präfix `VITE_` sind im Browser sichtbar.

### Entwicklungsserver

```sh
npm run dev
```

Die im Terminal angezeigte lokale Adresse im Browser öffnen.

## Verfügbare Befehle

| Befehl                       | Beschreibung                                                           |
| ---------------------------- | ---------------------------------------------------------------------- |
| `npm run dev`                | Entwicklungsserver mit automatischer Aktualisierung starten.           |
| `npm run build`              | Produktionsversion im Verzeichnis `dist/` erstellen.                   |
| `npm run preview`            | Den erstellten Build lokal ansehen.                                    |
| `npm run test:unit`          | Unit-Tests im Watch-Modus ausführen.                                   |
| `npm run test:unit -- --run` | Unit-Tests einmalig ausführen.                                         |
| `npm run lint`               | Oxlint und ESLint ausführen, einschließlich automatischer Korrekturen. |
| `npm run format`             | Dateien unter `src/` mit Prettier formatieren.                         |

Unter Windows können die Befehle bei einer PowerShell-Ausführungsrichtlinie, die `npm.ps1` blockiert, mit `npm.cmd` statt `npm` ausgeführt werden.

## Projektstruktur

```text
src/
├── assets/         # Globale Styles und lokale Bilder
├── components/     # Header, Suche, Buchkarten, Slider und weitere UI-Bausteine
├── config/         # API-Konfiguration und vordefinierte Buch-IDs
├── router/         # Routen der Anwendung
├── services/       # Axios-Client und Zugriff auf die Google Books API
├── stores/         # Pinia-Stores für Bücher und Warenkorb
├── utils/          # Hilfsfunktionen für Datum, Sprache und Texte
├── views/          # Startseite, Bücherübersicht und Buchdetails
├── __tests__/      # Anwendungstests
├── App.vue         # Hauptkomponente
└── main.js         # Einstiegspunkt
```

Komponententests liegen zusätzlich unter `src/components/__tests__/`.

## Routen

| Pfad         | Ansicht                                                |
| ------------ | ------------------------------------------------------ |
| `/`          | Startseite                                             |
| `/books`     | Bücherübersicht                                        |
| `/books/:id` | Detailseite eines Buches anhand seiner Google-Books-ID |
| `/about`     | Einfache Informationsseite                             |

Beim Bereitstellen auf einem Webserver müssen direkte Aufrufe der Anwendungsrouten auf `index.html` zurückfallen, da Vue Router die History-API verwendet.

## Aktueller Entwicklungsstand

Der Warenkorb wird derzeit nur im Pinia-State gehalten und beim Neuladen der Seite zurückgesetzt. Für die Header-Links `/cart` und `/profile` sind noch keine Routen eingerichtet. Eine Bestellabwicklung oder Benutzeranmeldung ist noch nicht implementiert.

Die Suche bietet eine Auswahl zwischen Büchern und ISBN an; aktuell wird diese Auswahl noch nicht in der Suchanfrage berücksichtigt. Die Detailvorschau der Buchkarten wird per Hover eingeblendet.

# AP2 FISI Trainer

Eine mobile, offlinefähige Lern-App (PWA) für die schriftliche AP2 von Fachinformatiker/-in Systemintegration nach AO 2020 und der zweiten Katalogauflage, die in AP2 seit Sommer 2025 gilt.

## Enthalten

- umfangreiche, neu formulierte und katalognahe Übungsaufgaben für Konzeption & Administration, Netzwerke und WiSo
- eigener Lernmodus **Katalog-2025-Aufgaben**: RAID, SQL, UML/BPMN, KI sowie Belegsätze
- zusätzliche, neu formulierte Aufgaben zu weiterhin relevanten Altprüfungs-Themen wie IPv4/IPv6, DNS, VPN, Backup, Speicher, Virtualisierung, PKI, Cloud, Segmentierung und Wirtschaftlichkeit
- Freitextantworten mit transparenter Kriterienkorrektur, Punkten und Mustererklärung
- lokale Speicherung des Lernstands im Browser
- JSON-Import eigener, rechtmäßig verfügbarer Aufgaben und Musterlösungen
- Offline-Nutzung nach dem ersten Aufruf

## Auf dem iPhone verwenden

Die App muss über HTTPS bereitgestellt werden (zum Beispiel GitHub Pages, Netlify oder einen eigenen Webserver). Anschließend die Seite in Safari öffnen, **Teilen** wählen und **Zum Home-Bildschirm** auswählen. Danach startet sie wie eine App.

## Eigene Aufgaben importieren

Nutze `beispiel-import.json` als Vorlage. Jedes Bewertungskriterium braucht alternative Schlüsselbegriffe unter `terms`. Der Abgleich ist bewusst nachvollziehbar und regelbasiert: Er erkennt die hinterlegten Inhalte, ersetzt aber keine fachliche Bewertung gleichwertiger, anders formulierter Antworten.

## Prüfungsrahmen

Die App bildet die drei schriftlichen AP2-Bereiche ab: Konzeption und Administration von IT-Systemen, Analyse und Entwicklung von Netzwerken sowie Wirtschafts- und Sozialkunde. Kataloganpassungen 2025: SQL und RAID gehören in AP2; UML/BPMN und KI wurden aufgenommen; PAP und Struktogramme sind nicht mehr als Lernziele enthalten. Für die konkrete Auswahl von Originalaufgaben gelten die Nutzungsrechte der jeweiligen Prüfungssätze.

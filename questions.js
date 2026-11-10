/* Eigene Übungsaufgaben. Die App enthält bewusst keine vervielfältigten IHK-Aufgabensätze. */
window.AP2_TRAINER_QUESTIONS = [
  {
    id: "net-vlan-routing", area: "netzwerk", title: "VLANs sicher verbinden", points: 6,
    prompt: "Ein Unternehmen trennt Verwaltung (VLAN 10) und Entwicklung (VLAN 20). Beide VLANs sollen über ein Layer-3-Gerät miteinander kommunizieren können. Nenne drei notwendige Konfigurations- bzw. Planungsschritte und erläutere kurz, weshalb sie erforderlich sind.",
    hint: "Denke an Segmentierung, Gateway und an die Verbindung zwischen Switch und Layer-3-Gerät.",
    model: "- VLAN 10 und VLAN 20 auf dem Switch anlegen und die Endgeräteports passend als Access-Ports zuordnen.\n- Eine Trunk-Verbindung zum Layer-3-Switch bzw. Router konfigurieren, damit beide VLANs über die Verbindung transportiert werden.\n- Für jedes VLAN ein Layer-3-Interface (SVI/Subinterface) mit einer IP-Adresse als Default Gateway einrichten und Inter-VLAN-Routing aktivieren.\n- Bei Bedarf ACLs/Firewall-Regeln festlegen, damit nur erlaubter Verkehr zwischen den Netzen läuft.",
    criteria: [
      { label: "VLANs und Portzuordnung", terms: ["vlan 10", "vlan 20", "access", "port zuord", "endgerät"] },
      { label: "Trunk-Verbindung", terms: ["trunk", "802.1q", "tag", "vlan transport"] },
      { label: "Gateway und Routing", terms: ["gateway", "svi", "subinterface", "inter-vlan", "layer 3", "routing"] },
      { label: "Zugriff absichern", terms: ["acl", "firewall", "regel", "berecht", "zugriff"] }
    ]
  },
  {
    id: "admin-backup", area: "administration", title: "Backup-Konzept bewerten", points: 6,
    prompt: "Ein Dateiserver wird täglich inkrementell und jeden Sonntag vollständig gesichert. Die Sicherungen liegen ausschließlich im selben Serverraum. Nenne drei Risiken bzw. Verbesserungen für ein belastbares Backup-Konzept.",
    hint: "Betrachte Wiederherstellbarkeit, Schutz vor Schadensereignissen und die Sicherungsstrategie.",
    model: "- Eine Kopie räumlich getrennt speichern, zum Beispiel in einem zweiten Standort oder einem geeigneten Cloud-/Offsite-Speicher; ein Brand oder Diebstahl darf nicht alle Kopien treffen.\n- Das 3-2-1-Prinzip nutzen: mindestens drei Kopien auf zwei unterschiedlichen Medien, davon eine extern.\n- Regelmäßig Restore-Tests durchführen und Wiederherstellungszeiten dokumentieren.\n- Schutz vor Ransomware berücksichtigen, etwa durch unveränderbare/offline Sicherungen und getrennte Berechtigungen.\n- Aufbewahrungsfristen, Verantwortlichkeiten sowie RPO und RTO festlegen.",
    criteria: [
      { label: "Räumlich getrennte Sicherung", terms: ["offsite", "zweiter standort", "räumlich", "cloud", "extern"] },
      { label: "3-2-1-Prinzip", terms: ["3-2-1", "drei kopien", "zwei medien"] },
      { label: "Wiederherstellung testen", terms: ["restore", "wiederherstell", "test", "rücksicher"] },
      { label: "Schutz gegen Ransomware", terms: ["ransomware", "immutable", "unveränder", "offline", "air gap"] }
    ]
  },
  {
    id: "admin-dhcp", area: "administration", title: "DHCP-Ausfall eingrenzen", points: 5,
    prompt: "Nach einem Switch-Tausch erhalten Clients eines VLANs keine IPv4-Adressen mehr. Andere VLANs funktionieren. Beschreibe eine sinnvolle, schrittweise Fehlereingrenzung.",
    hint: "Arbeite von der lokalen VLAN-Zuordnung zum DHCP-Server vor.",
    model: "- Prüfen, ob der Clientport im richtigen VLAN liegt und Link/Port-Status stimmen.\n- Kontrollieren, ob der Uplink als Trunk konfiguriert ist und das betroffene VLAN erlaubt.\n- Den DHCP-Scope prüfen: aktiv, freie Adressen vorhanden, korrekter Bereich/Optionen.\n- Bei einem DHCP-Server in anderem Netz DHCP-Relay/IP-Helper auf dem Layer-3-Gateway prüfen.\n- Mit ipconfig/Packet Capture/Server-Logs feststellen, ob Discover, Offer, Request und ACK stattfinden.",
    criteria: [
      { label: "VLAN am Clientport prüfen", terms: ["vlan", "clientport", "access", "port"] },
      { label: "Trunk/Uplink prüfen", terms: ["trunk", "uplink", "allowed", "tag"] },
      { label: "DHCP-Scope prüfen", terms: ["scope", "pool", "freie adresse", "bereich"] },
      { label: "Relay oder DHCP-Ablauf analysieren", terms: ["relay", "ip helper", "discover", "offer", "packet", "log"] }
    ]
  },
  {
    id: "net-wlan-security", area: "netzwerk", title: "WLAN für Gäste absichern", points: 5,
    prompt: "Plane ein Gäste-WLAN in einem Büro. Nenne vier Maßnahmen, die Gästezugang ermöglichen, aber Unternehmenssysteme schützen.",
    hint: "Trennung, Verschlüsselung, Zugriffskontrolle und Betrieb sind gute Blickwinkel.",
    model: "- Gäste in ein eigenes VLAN/Subnetz mit getrenntem IP-Adressbereich segmentieren.\n- Firewall-Regeln so setzen, dass nur Internetzugriff erlaubt ist und interne Netze gesperrt bleiben.\n- WPA3 oder mindestens WPA2-AES mit einem getrennten, regelmäßig geänderten Zugang verwenden; alternativ Captive Portal.\n- Client-Isolation aktivieren, damit Gäste sich nicht gegenseitig erreichen.\n- Bandbreite und Nutzungsdauer begrenzen sowie Zugriffe protokollieren, soweit rechtlich zulässig.",
    criteria: [
      { label: "Netzsegmentierung", terms: ["vlan", "subnetz", "segment", "getrennt"] },
      { label: "Firewall-Isolation", terms: ["firewall", "regel", "interne netze", "sperr", "nur internet"] },
      { label: "Sichere WLAN-Authentifizierung", terms: ["wpa3", "wpa2", "aes", "passwort", "captive"] },
      { label: "Gäste voneinander trennen", terms: ["client isolation", "ap isolation", "gegenseitig", "isolation"] }
    ]
  },
  {
    id: "wiso-contract", area: "wiso", title: "Arbeitsvertrag prüfen", points: 5,
    prompt: "Eine Auszubildende erhält einen Arbeitsvertrag. Nenne vier wesentliche Inhalte, die sie vor der Unterschrift prüfen sollte.",
    hint: "Orientiere dich an Tätigkeit, Zeit, Geld und Beendigung des Arbeitsverhältnisses.",
    model: "Zu prüfen sind insbesondere: Vertragsparteien und Tätigkeit/Arbeitsort, Beginn und gegebenenfalls Befristung, Arbeitszeit und Pausen, Vergütung einschließlich Zuschlägen, Urlaub, Probezeit, Kündigungsfristen sowie Regelungen zu Überstunden und Tarifvertrag. Unklare Punkte sollten vor der Unterschrift geklärt werden.",
    criteria: [
      { label: "Tätigkeit oder Arbeitsort", terms: ["tätigkeit", "arbeitsort", "aufgabe"] },
      { label: "Arbeitszeit oder Pausen", terms: ["arbeitszeit", "pause", "stunden"] },
      { label: "Vergütung", terms: ["vergütung", "gehalt", "lohn", "zuschlag"] },
      { label: "Urlaub, Probezeit oder Kündigung", terms: ["urlaub", "probezeit", "kündigung", "frist"] }
    ]
  },
  {
    id: "admin-monitoring", area: "administration", title: "Monitoring planen", points: 5,
    prompt: "Ein zentraler Dienst wird als geschäftskritisch eingestuft. Welche Messwerte und Alarmierungsregeln würdest du für ein sinnvolles Monitoring festlegen? Nenne mindestens vier Punkte.",
    hint: "Verfügbarkeit, Ressourcen, Dienstfunktion und Reaktionsweg gehören zusammen.",
    model: "- Erreichbarkeit und Dienststatus überwachen, zum Beispiel Ping zusätzlich mit einem passenden Dienstcheck wie HTTPS, DNS oder Datenbankabfrage.\n- CPU, RAM, Datenträgerauslastung und gegebenenfalls I/O beobachten.\n- Schwellwerte und Eskalationsstufen definieren, damit nicht jede kurze Lastspitze sofort einen Alarm auslöst.\n- Alarmwege, Verantwortlichkeiten und Bereitschaft festlegen.\n- Messwerte historisch speichern, um Trends und Kapazitätsengpässe zu erkennen.",
    criteria: [
      { label: "Erreichbarkeit und Dienstcheck", terms: ["ping", "erreichbar", "https", "dns", "dienst", "status"] },
      { label: "Ressourcen überwachen", terms: ["cpu", "ram", "speicher", "festplatte", "i/o"] },
      { label: "Schwellwerte/Eskalation", terms: ["schwell", "threshold", "eskalation", "alarm"] },
      { label: "Verantwortung oder Trendanalyse", terms: ["bereitschaft", "verantwort", "histor", "trend", "kapazität"] }
    ]
  },
  {
    id: "2025-raid-capacity", area: "administration", focus2025: true, title: "RAID 6 korrekt dimensionieren", points: 6,
    prompt: "Ein Server soll sechs gleich große Festplatten mit jeweils 4 TiB in RAID 6 nutzen. Berechne die nutzbare Kapazität und nenne zwei Eigenschaften von RAID 6, die für die Entscheidung relevant sind.",
    hint: "Bei RAID 6 stehen zwei Festplattenkapazitäten für Parität zur Verfügung. Verwende bei Datenmengen die Binärpräfixe.",
    model: "Nutzkapazität: (6 - 2) × 4 TiB = 16 TiB. RAID 6 verteilt doppelte Paritätsinformationen und verkraftet dadurch gleichzeitig den Ausfall von zwei Festplatten. Gegenüber RAID 5 ist die Schreibperformance wegen der zusätzlichen Paritätsberechnung typischerweise geringer. RAID ersetzt kein Backup.",
    criteria: [
      { label: "Kapazität korrekt berechnet", terms: ["16 tib", "16 ti", "16 tebibyte"] },
      { label: "Binärpräfix richtig verwendet", terms: ["tib", "tebibyte", "binär"] },
      { label: "Zwei Plattenausfälle erkannt", terms: ["zwei festplatten", "2 festplatten", "zwei ausf", "2 ausf", "doppelte parität"] },
      { label: "Leistungs- oder Backup-Aspekt erläutert", terms: ["schreib", "performance", "parität", "backup", "sicherung"] }
    ]
  },
  {
    id: "2025-sql-data", area: "administration", focus2025: true, title: "SQL-Daten gezielt auswerten", points: 5,
    prompt: "Eine Tabelle tickets enthält die Spalten id, status, prioritaet und erstellt_am. Formuliere in Worten, welche Bestandteile eine SQL-Abfrage braucht, um alle offenen Tickets nach Priorität absteigend auszugeben. Ergänze, weshalb ein Index sinnvoll sein kann.",
    hint: "Denke an SELECT, FROM, WHERE und ORDER BY. Ein Index hilft nicht pauschal bei jeder Spalte.",
    model: "Die Abfrage wählt die gewünschten Spalten mit SELECT aus der Tabelle tickets (FROM). Mit WHERE wird auf den Status „offen“ eingeschränkt. ORDER BY prioritaet DESC sortiert die Ausgabe absteigend nach Priorität. Ein Index auf häufig gefilterten oder für Joins verwendeten Spalten kann Abfragen beschleunigen, verursacht aber zusätzlichen Speicher- und Pflegeaufwand beim Schreiben.",
    criteria: [
      { label: "Auswahl und Tabelle genannt", terms: ["select", "from", "tickets"] },
      { label: "Offene Tickets gefiltert", terms: ["where", "status", "offen"] },
      { label: "Priorität absteigend sortiert", terms: ["order by", "priorität", "prioritaet", "desc", "absteigend"] },
      { label: "Nutzen eines Index erklärt", terms: ["index", "beschleun", "schneller", "performance", "abfrage"] }
    ]
  },
  {
    id: "2025-uml-bpmn", area: "administration", focus2025: true, title: "Passende Modellierung auswählen", points: 5,
    prompt: "Ein Team will den Ablauf eines Störungsprozesses vom Ticket-Eingang bis zum Abschluss mit Rollen, Entscheidungen und Übergaben dokumentieren. Entscheide dich für BPMN oder ein UML-Klassendiagramm und begründe die Wahl. Nenne außerdem zwei Informationen, die im Modell sichtbar sein sollten.",
    hint: "BPMN beschreibt Geschäfts- bzw. Ablaufprozesse; Klassendiagramme zeigen Strukturen von Klassen und Beziehungen.",
    model: "BPMN ist geeignet, weil ein Ablauf mit Ereignissen, Aufgaben, Entscheidungen und Verantwortlichkeiten dargestellt werden soll. Sichtbar sein sollten zum Beispiel Start- und Endereignis, Aufgaben wie Analyse und Lösung, Gateways für Entscheidungen, Übergaben bzw. Pools/Lanes für Rollen sowie Eskalationspfade. Ein UML-Klassendiagramm wäre dagegen für Daten- bzw. Objektstrukturen passend.",
    criteria: [
      { label: "BPMN als passende Notation gewählt", terms: ["bpmn"] },
      { label: "Ablaufprozess begründet", terms: ["prozess", "ablauf", "workflow", "schritt"] },
      { label: "Rollen oder Übergaben berücksichtigt", terms: ["rolle", "lane", "pool", "übergabe", "verantwort"] },
      { label: "Ereignis, Aufgabe oder Entscheidung genannt", terms: ["ereignis", "aufgabe", "gateway", "entscheidung", "eskalation"] }
    ]
  },
  {
    id: "2025-ki-operations", area: "administration", focus2025: true, title: "KI im IT-Betrieb verantwortungsvoll einsetzen", points: 5,
    prompt: "Ein IT-Team möchte eine KI zur Vorpriorisierung eingehender Störungstickets einsetzen. Nenne vier Maßnahmen oder Prüfungen, die vor bzw. während des Einsatzes notwendig sind.",
    hint: "Betrachte Daten, menschliche Verantwortung, Qualität und Sicherheit.",
    model: "- Nur erforderliche und möglichst anonymisierte Ticketdaten verwenden; Datenschutz und Berechtigungen prüfen.\n- Ergebnisse durch Mitarbeitende plausibilisieren lassen und einen klaren Eskalationsweg vorsehen; die KI trifft keine unkontrollierten Entscheidungen.\n- Qualität regelmäßig anhand repräsentativer Testfälle messen, Fehlklassifikationen dokumentieren und nachsteuern.\n- Zugriffe, Protokollierung, Anbieter-/Modellrisiken und den Schutz vertraulicher Informationen bewerten.\n- Transparenz schaffen: Zweck, Grenzen und Verantwortlichkeiten dokumentieren.",
    criteria: [
      { label: "Datenschutz oder Datenminimierung", terms: ["datenschutz", "anonym", "personenbezogen", "datenminim", "berechtigung"] },
      { label: "Menschliche Kontrolle", terms: ["mensch", "plausibil", "freigabe", "eskalation", "kontrolle"] },
      { label: "Qualität testen und überwachen", terms: ["test", "qualität", "fehler", "mess", "monitor"] },
      { label: "Sicherheits- oder Transparenzaspekt", terms: ["sicher", "protokoll", "vertraulich", "dokument", "transparen"] }
    ]
  },
  {
    id: "2025-belegsätze", area: "netzwerk", focus2025: true, title: "Belegsätze systematisch auswerten", points: 5,
    prompt: "Du erhältst zu einer Beschaffungsentscheidung Datenblätter, ein Angebot und eine Anforderungsliste. Beschreibe eine strukturierte Vorgehensweise, um eine begründete Empfehlung zu erstellen.",
    hint: "Anforderungen sind der Maßstab; Datenblätter und Angebot liefern die belegbaren Fakten.",
    model: "- Muss- und Kann-Anforderungen aus der Anforderungsliste in einer Vergleichstabelle festhalten.\n- Technische Daten aus Datenblättern nachvollziehbar den Anforderungen zuordnen; fehlende oder widersprüchliche Angaben markieren.\n- Kosten aus dem Angebot vollständig vergleichen, zum Beispiel Anschaffung, Lizenzen, Wartung und gegebenenfalls Betrieb.\n- Risiken, Kompatibilität, Service und Lieferzeit bewerten.\n- Eine Empfehlung mit Quellenverweis auf die jeweiligen Belegsätze formulieren und offene Punkte transparent benennen.",
    criteria: [
      { label: "Anforderungen als Maßstab", terms: ["muss", "kann", "anforder", "vergleichstabelle"] },
      { label: "Technische Daten belegen", terms: ["datenblatt", "technisch", "spezifikation", "beleg"] },
      { label: "Gesamtkosten vergleichen", terms: ["kosten", "lizenz", "wartung", "betrieb", "angebot"] },
      { label: "Begründete Empfehlung erstellen", terms: ["empfehl", "risiko", "kompatib", "lieferzeit", "quelle"] }
    ]
  }
];

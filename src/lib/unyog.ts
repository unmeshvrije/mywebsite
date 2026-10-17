/*
 * UnYog page (/unyog): contact details and bilingual copy.
 *
 * Setting the contact details
 *   Edit UNYOG_CONTACT below. The email is shown as plain text with a copy
 *   button, never as a mailto link.
 *
 * Photos
 *   public/images/unyog/. Resized, WebP, with all metadata (including GPS)
 *   stripped. Alt texts are in the copy below, per language.
 *
 * Joint ranges for the Body Game
 *   src/components/unyog/jointRanges.ts
 *
 * QR code for the pamphlet
 *   Point the QR code at https://unme.sh/unyog (English). For a Dutch
 *   pamphlet use https://unme.sh/unyog?lang=nl, which opens the page in
 *   Dutch. Visitors can switch language with the EN/NL toggle either way.
 */

export const UNYOG_CONTACT = {
  email: "me@unme.sh",
};

export const UNYOG_PHOTOS = {
  hero: { src: "/images/unyog/hero-sunset.webp", width: 1000, height: 1333 },
  teamReset: { src: "/images/unyog/team-reset.webp", width: 1200, height: 902 },
  droga: { src: "/images/unyog/droga-festival.webp", width: 1200, height: 900 },
  couples: { src: "/images/unyog/couples.webp", width: 1400, height: 1050 },
  about: { src: "/images/unyog/about-unmesh.webp", width: 900, height: 1197 },
};

export const UNYOG_URL = "https://unme.sh/unyog";

export type Lang = "en" | "nl";

export const unyogCopy = {
  en: {
    nav: {
      companies: "Companies",
      couples: "Couples",
      about: "About",
      game: "Body Game",
      contact: "Contact",
    },
    hero: {
      title: "UnYog",
      subtitle: "Authentic Yog, taught in Amsterdam",
      body: "We say Yog: the original word, and the original intent. Twenty years of practice and study at the source, brought into a room near you. No chanting you do not follow, no postures that hurt. Just the real thing, made practical.",
      primaryCta: "Get in touch",
      secondaryCta: "Play the Body Game",
      photoAlt:
        "Downward-facing dog on a beach at sunset, with the sun shining through",
    },
    companies: {
      heading: "For Companies",
      cta: "Ask about this session",
      lead: "Give your team something that actually resets them.",
      offers: [
        {
          title: "UnYog Team Reset",
          body: "A guided, playful group flow for energy, focus and trust. On site at your office, no experience and no kit needed. Everyone can take part, whatever their shape or fitness.",
          details: ["90 minutes, up to 15 people", "500 euro, at your location"],
          photoAlt: "A large group in tree pose together on a beach",
        },
        {
          title: "Droga Team Flow",
          body: "Our festival format, brought to the office. A playful, themed session in pairs, with costumes and props, that breaks the usual hierarchy and gets a team laughing and moving together. The one people talk about afterwards.",
          details: ["90 minutes, up to 15 people", "650 euro, at your location"],
          photoAlt: "A festival session on the sand, with costumes and colourful props",
        },
      ],
    },
    couples: {
      heading: "For Couples",
      lead: "Slow down and move together.",
      body: "A private session for the two of you. Grounded, connective, no audience and no acrobatics. Just breathing and moving as a pair, guided from start to finish.",
      details: [
        "45 minutes, one couple at a time",
        "59 euro",
        "Sunday mornings and afternoons, in Amsterdam Zuid",
      ],
      cta: "Ask about a couples session",
      photoAlt: "Two people in a partner squat, facing each other on the beach",
    },
    about: {
      heading: "Meet your teacher",
      paragraphs: [
        "Hi, I am Unmesh. I have practised and studied Yog for twenty years, at the source.",
        "I teach the way I teach everything: simply, practically and with a sense of play. You will move, breathe and probably laugh. You will also leave knowing something useful about how your own body works.",
        "I have led sessions on beaches, at festivals and in offices. Now I bring them to Amsterdam.",
      ],
      photoAlt: "Unmesh in camel pose on a beach",
    },
    game: {
      heading: "The Body Game",
      body: "Drag the arms and legs and see what the body allows, and what makes it say ouch. A playful way to get curious about how you move.",
      disclaimer:
        "This is a game, for fun only. It is not medical or health advice.",
    },
    contact: {
      heading: "Contact",
      lead: "Questions, or ready to pick a date? Send me an email.",
      emailLabel: "Email",
      copy: "Copy",
      copied: "Copied",
    },
  },
  nl: {
    nav: {
      companies: "Bedrijven",
      couples: "Koppels",
      about: "Over mij",
      game: "Lichaamsspel",
      contact: "Contact",
    },
    hero: {
      title: "UnYog",
      subtitle: "Authentieke Yog, gegeven in Amsterdam",
      body: "Wij zeggen Yog: het oorspronkelijke woord, en de oorspronkelijke bedoeling. Twintig jaar beoefening en studie bij de bron, naar een ruimte bij jou in de buurt. Geen onbegrijpelijk gezang, geen houdingen die pijn doen. Gewoon het echte werk, praktisch gemaakt.",
      primaryCta: "Neem contact op",
      secondaryCta: "Speel het Lichaamsspel",
      photoAlt:
        "Neerwaartse hond op het strand bij zonsondergang, met de zon er dwars doorheen",
    },
    companies: {
      heading: "Voor bedrijven",
      cta: "Vraag naar deze sessie",
      lead: "Geef je team iets dat echt rust geeft.",
      offers: [
        {
          title: "UnYog Team Reset",
          body: "Een begeleide, speelse groepsflow voor energie, focus en vertrouwen. Op locatie bij jullie op kantoor, geen ervaring en geen spullen nodig. Iedereen kan meedoen, ongeacht vorm of conditie.",
          details: [
            "90 minuten, tot 15 personen",
            "500 euro, op jullie locatie",
          ],
          photoAlt: "Een grote groep samen in boomhouding op het strand",
        },
        {
          title: "Droga Team Flow",
          body: "Ons festivalformat, naar kantoor gebracht. Een speelse sessie in tweetallen, met een thema, kostuums en props, die de gebruikelijke hierarchie doorbreekt en een team samen laat lachen en bewegen. Waar men het daarna nog over heeft.",
          details: [
            "90 minuten, tot 15 personen",
            "650 euro, op jullie locatie",
          ],
          photoAlt: "Een festivalsessie op het zand, met kostuums en kleurrijke props",
        },
      ],
    },
    couples: {
      heading: "Voor koppels",
      lead: "Vertraag en beweeg samen.",
      body: "Een privesessie voor jullie tweeen. Geaard, verbindend, geen publiek en geen acrobatiek. Gewoon samen ademen en bewegen, van begin tot eind begeleid.",
      details: [
        "45 minuten, een koppel per keer",
        "59 euro",
        "Zondagochtend en zondagmiddag, in Amsterdam Zuid",
      ],
      cta: "Vraag naar een koppelsessie",
      photoAlt: "Twee mensen in een squat met partner, tegenover elkaar op het strand",
    },
    about: {
      heading: "Maak kennis met je docent",
      paragraphs: [
        "Hoi, ik ben Unmesh. Ik beoefen en bestudeer Yog al twintig jaar, bij de bron.",
        "Ik geef les zoals ik altijd lesgeef: eenvoudig, praktisch en speels. Je beweegt, je ademt en je lacht waarschijnlijk ook. En je gaat naar huis met iets nuttigs over hoe je eigen lichaam werkt.",
        "Ik heb sessies gegeven op stranden, op festivals en op kantoren. Nu breng ik ze naar Amsterdam.",
      ],
      photoAlt: "Unmesh in kameelhouding op het strand",
    },
    game: {
      heading: "Het Lichaamsspel",
      body: "Sleep aan de armen en benen en ontdek wat het lichaam toelaat, en waarvan het “au” zegt. Een speelse manier om nieuwsgierig te worden naar hoe je beweegt.",
      disclaimer:
        "Dit is een spel, alleen voor de lol. Het is geen medisch of gezondheidsadvies.",
    },
    contact: {
      heading: "Contact",
      lead: "Vragen, of een datum prikken? Stuur me een e-mail.",
      emailLabel: "E-mail",
      copy: "Kopieer",
      copied: "Gekopieerd",
    },
  },
};

export type UnYogCopy = (typeof unyogCopy)["en"];

// Short interface labels for the Body Game. Not part of the marketing copy.
export const bodyGameCopy = {
  en: {
    hint: "Grab an arm, a leg or the head and drag. Drag the background to turn.",
    shiftHint: "Hold Shift while dragging the head to tilt it.",
    ok: "All good",
    wrongWay: "Ouch! It does not bend that way.",
    tooFar: "Ouch! That is past its range.",
    soundOn: "Sound on",
    soundOff: "Sound off",
    reset: "Reset pose",
    turnLeft: "Turn left",
    turnRight: "Turn right",
    loading: "Warming up the body...",
    canvasLabel:
      "Interactive 3D figure. Drag its arms, legs and head to pose it.",
    fallbackTitle: "The 3D body needs WebGL",
    fallbackBody:
      "Your browser cannot show the 3D game right now. Try another browser or device. The rest of the page works as normal.",
    fallbackAlt: "A simple drawing of a stretching figure",
    joints: {
      shoulder: "Shoulder",
      elbow: "Elbow",
      hip: "Hip",
      knee: "Knee",
      neck: "Neck",
    },
  },
  nl: {
    hint: "Pak een arm, een been of het hoofd en sleep. Sleep de achtergrond om te draaien.",
    shiftHint: "Houd Shift ingedrukt bij het hoofd om het te kantelen.",
    ok: "Helemaal goed",
    wrongWay: "Au! Die kant buigt het niet op.",
    tooFar: "Au! Dat is verder dan het kan.",
    soundOn: "Geluid aan",
    soundOff: "Geluid uit",
    reset: "Houding resetten",
    turnLeft: "Draai naar links",
    turnRight: "Draai naar rechts",
    loading: "Het lichaam warmt op...",
    canvasLabel:
      "Interactief 3D-figuur. Sleep aan de armen, benen en het hoofd om het te poseren.",
    fallbackTitle: "Het 3D-lichaam heeft WebGL nodig",
    fallbackBody:
      "Je browser kan het 3D-spel nu niet tonen. Probeer een andere browser of een ander apparaat. De rest van de pagina werkt gewoon.",
    fallbackAlt: "Een eenvoudige tekening van een figuur dat strekt",
    joints: {
      shoulder: "Schouder",
      elbow: "Elleboog",
      hip: "Heup",
      knee: "Knie",
      neck: "Nek",
    },
  },
};

export interface Activity {
  id: string;
  time: string;
  text: string;
}

export interface DayPlan {
  id: string;
  date: string;
  weekday: string;
  title: string;
  subtitle?: string;
  howToGetThere?: string;
  activities: Activity[];
  longNote?: string;
  eating?: string;
  ticketsNote: string;
}

export const trip = {
  title: "Nueva York 2026",
  subtitle: "Itinerario familiar",
  dateRange: "Sábado 3 al sábado 10 de octubre de 2026",
  party: "2 adultos + 1 niña de 12 años · Hotel LIC, Long Island City, Queens",
  broadway:
    "Entradas de El Rey León ya compradas: miércoles 7, 19:00, Minskoff Theatre.",
};

export const budget = {
  rows: [
    {
      concept: "Tope disponible",
      total: "USD 3.150",
      detail: "USD 350 por día, del 3 al 11 de octubre",
      note: "Para los tres, sin contar el hotel.",
    },
    {
      concept: "Atracciones pagas",
      total: "USD 555 aprox.",
      detail:
        "One World 135, Mercer Labs 160, SUMMIT 140, The Met 60, gospel a confirmar",
      note: "Broadway ya está pago.",
    },
    {
      concept: "Transporte",
      total: "USD 205 aprox.",
      detail: "OMNY con tope de USD 35 por persona, más el traslado a JFK",
      note: "Más algún taxi de noche.",
    },
    {
      concept: "Queda para comer y extras",
      total: "USD 2.390 aprox.",
      detail: "Unos USD 265 por día para los tres",
      note: "Cerca de USD 88 por persona por día.",
    },
  ],
  footnote:
    "Cómo leer este presupuesto: los USD 350 funcionan como promedio, no como tope diario. El lunes 5 se va a ir a unos USD 450 porque concentra One World y Mercer Labs; el jueves 8 y el sábado 10 no tienen ninguna entrada paga y van a cerrar cerca de USD 250. Lo que importa es el total de la semana. Este cálculo asume que el hotel ya está pago aparte: si los USD 350 tuvieran que incluirlo, habría que rehacer todo el esquema.",
};

export const transport = {
  fixedRules: [
    "El hotel está en 39-05 29th Street, Long Island City. Tres estaciones a mano: 39th Av–Dutch Kills (N, W) a una cuadra; Queensboro Plaza (N, W, 7) a 6 minutos; Queens Plaza (E, M, R) a 8 minutos.",
    "Entre 39th Av y Queensboro Plaza hay una sola parada en la N o la W, y el pase al 7 es dentro de la misma estación, sin pagar de nuevo.",
    "Pasaje USD 3,00. Los sábados y domingos es cuando más cambian los recorridos: revisar la app antes de salir el sábado 3, el domingo 4 y el sábado 10.",
    "Pagar siempre con la misma tarjeta contactless o el mismo teléfono: después de 12 viajes en 7 días, el resto de la semana no se cobra. Tope de USD 35 por persona.",
    "No comprar MetroCard. Cada uno usa su propia tarjeta, porque el tope es individual.",
    "Revisar la app de la MTA cada mañana: los fines de semana suele haber desvíos.",
    "De noche, si están cansados, subte hasta Manhattan y taxi o aplicación hasta el hotel.",
    "Al pagar con tarjeta, elegir siempre dólares. Nunca pesos ni euros.",
  ],
  specialSegments:
    "Lo único que no es subte: los recorridos diarios desde el hotel son todos en subte, pero el plan tiene tres tramos en otro medio. El Staten Island Ferry del lunes 5 es gratis y no se paga nada. El teleférico a Roosevelt Island del viernes 9 cuesta lo mismo que un viaje de subte, se paga con OMNY y suma para el tope semanal, aunque la vuelta se paga aparte: son dos viajes por persona. Y el NYC Ferry del jueves 8, para volver de DUMBO a Long Island City, es un sistema distinto: cuesta USD 4,50 por persona, no funciona con OMNY y no suma para el tope. Para los tres son USD 13,50, y la alternativa en subte ya está contemplada en el plan de ese día.",
};

function acts(dayId: string, list: [string, string][]): Activity[] {
  return list.map(([time, text], i) => ({ id: `${dayId}-a${i + 1}`, time, text }));
}

export const days: DayPlan[] = [
  {
    id: "2026-10-03",
    date: "Sábado 3 de octubre",
    weekday: "Sábado 3",
    title: "Llegada y Times Square",
    subtitle: "Día suave, sin museos ni miradores",
    howToGetThere:
      "Desde el hotel: caminar 6 minutos hasta Queensboro Plaza y tomar el 7 hacia Manhattan hasta 5 Av–Bryant Park. Unos 15 minutos y salís en la esquina del parque. Alternativa: Queens Plaza y la E o la M hasta 42 St–Port Authority, que deja en Times Square.",
    activities: acts("2026-10-03", [
      ["12:00–15:30", "Traslado al hotel, dejar valijas y almorzar cerca."],
      ["16:30–18:00", "Bryant Park y Biblioteca Pública por fuera."],
      ["18:00–21:00", "Times Square de día y de noche. Tiendas temáticas."],
    ]),
    eating:
      "Ellen's Stardust Diner, con los mozos que cantan, es el lugar del viaje pensado para la nena. Alternativa: Carmine's, italiano para compartir. De postre, Black Tap por los milkshakes.",
    ticketsNote: "Sin entradas pagas.",
  },
  {
    id: "2026-10-04",
    date: "Domingo 4 de octubre",
    weekday: "Domingo 4",
    title: "Gospel, Harlem y Central Park",
    subtitle: "Tres opciones de gospel, según cuánto quieran quedarse",
    howToGetThere:
      "Desde el hotel: para Mount Zion, la N o la W desde 39th Av hasta Lexington Av–59 St, y ahí el 6 hacia el norte hasta 116 St. Después dos cuadras al oeste hasta Madison. Unos 35 minutos. Si eligen Abyssinian, es la N o la W hasta Times Sq y el 2 o el 3 hasta 135 St. Si eligen White Rock, el 2 o el 3 hasta 125 St.",
    activities: acts("2026-10-04", [
      [
        "09:30–11:15",
        "Gospel, opción corta. Mount Zion AME, Madison Avenue y calle 116. Servicio 10:00, suele terminar 11:15.",
      ],
      [
        "09:30–11:30",
        "Gospel, opción con salida asegurada. Tour organizado: unas 2 horas en total, con cerca de 1 hora adentro de la iglesia.",
      ],
      [
        "09:15–12:30",
        "Gospel, opción completa. Abyssinian Baptist, 132 West 138th Street. Servicio 10:00, dura cerca de 2 horas y media.",
      ],
      ["11:30–13:30", "Calle 125 y Apollo Theater por fuera. Almuerzo en Harlem."],
      [
        "14:00–18:00",
        "Central Park: The Mall, Bethesda Terrace, Bow Bridge, Strawberry Fields. Salida por Columbus Circle.",
      ],
    ]),
    longNote:
      "Gospel, cómo entrar un rato: en una iglesia común no se puede entrar y salir: irse en medio del servicio se toma como una falta de respeto. Así que hay dos maneras de que sea corto. La primera es elegir una congregación chica: Mount Zion AME, en Madison Avenue y la calle 116, empieza a las 10:00 y termina alrededor de las 11:15, poco más de una hora; White Rock Baptist, en 152 West 127th Street, arranca 9:30 y es la otra breve, con menos turistas. La segunda es el tour organizado: el grupo entra y se va junto, con una hora adentro y horario de salida garantizado. En todos los casos, llegar 20 o 30 minutos antes, ropa prolija, nada de fotos durante el culto y dejar una contribución en la colecta. Mount Zion queda en East Harlem, así que quedan a nueve cuadras de la calle 125 y ganan media hora respecto del plan anterior.",
    eating:
      "Bajando por el Upper West Side: Levain Bakery por las cookies y Jacob's Pickles por los biscuits. TAP NYC si quieren algo liviano. Pretzel en el parque, que está en la lista.",
    ticketsNote: "Gospel a confirmar. El bote en el lago son unos USD 25 la hora.",
  },
  {
    id: "2026-10-05",
    date: "Lunes 5 de octubre",
    weekday: "Lunes 5",
    title: "Ferry, Downtown y dos entradas",
    subtitle: "El día más caro del viaje",
    howToGetThere:
      "Desde el hotel: caminar 8 minutos hasta Queens Plaza y tomar la R hacia Manhattan hasta el final, Whitehall St–South Ferry. Son unos 35 minutos pero sin ningún transbordo, y la salida da contra la terminal del ferry. Alternativa más rápida: el 7 hasta Times Sq y el 1 hasta South Ferry.",
    activities: acts("2026-10-05", [
      ["09:15–11:00", "Staten Island Ferry ida y vuelta. Gratis. A la ida, del lado derecho mirando adelante."],
      [
        "11:00–14:15",
        "Battery Park, Charging Bull, Fearless Girl, Wall Street, Trinity Church, Memorial del 11-S y Oculus.",
      ],
      ["14:30–15:15", "One World Observatory. Está a metros de Mercer Labs."],
      ["15:30–17:00", "Mercer Labs, 21 Dey Street. Llegar dentro de la ventana del ticket."],
      [
        "17:30–19:00",
        "Museo del 11-S. Los lunes la entrada es gratuita de 17:30 a 19:00, con reserva previa. La visita lleva entre 45 y 90 minutos y la última admisión es a las 18:00.",
      ],
      ["19:00–20:00", "Stone Street para cenar, o Pier 17 si les queda energía."],
    ]),
    longNote:
      "Reservar apenas se pueda: la entrada gratuita de los lunes se agota rápido y hay que sacarla con anticipación en la web del museo. Si no consiguen lugar, la entrada normal cuesta entre USD 24 y 36 por persona, o hay un pase familiar de USD 106 a 125. El museo queda a metros de Mercer Labs y de One World, así que el día cierra sin moverse de la zona.",
    eating:
      "Bluestone Lane para el avocado toast al mediodía. A la noche, Stone Street: calle adoquinada llena de mesas afuera, y además está en la lista de lugares para conocer.",
    ticketsNote: "One World USD 135 y Mercer Labs USD 160 aprox. Total del día cerca de USD 295.",
  },
  {
    id: "2026-10-06",
    date: "Martes 6 de octubre",
    weekday: "Martes 6",
    title: "Midtown East, Quinta Avenida y SUMMIT",
    subtitle: "Reservar SUMMIT al atardecer",
    howToGetThere:
      "Desde el hotel: el día más fácil. Queensboro Plaza y el 7 hacia Manhattan hasta Grand Central–42 St. Doce minutos, sin transbordo, y se sale adentro de la terminal.",
    activities: acts("2026-10-06", [
      ["09:30–11:00", "Grand Central: Main Concourse, el reloj y la Whispering Gallery. Chrysler por fuera."],
      ["11:15–13:00", "Bryant Park y entrar a la Biblioteca Pública."],
      ["13:15–14:30", "Bajar a Flatiron: el edificio, Madison Square Park y almuerzo."],
      ["15:00–17:00", "Quinta Avenida, St. Patrick's, Rockefeller Plaza y Radio City."],
      ["17:30–19:00", "SUMMIT One Vanderbilt. Confirmado."],
    ]),
    eating:
      "Almuerzo en Flatiron: Shake Shack en su local original de Madison Square Park, o Madison Square Eats si está armado. Maman Nomad para el café. Magnolia Bakery en Rockefeller por el banana pudding.",
    ticketsNote: "SUMMIT USD 140 aprox. para los tres.",
  },
  {
    id: "2026-10-07",
    date: "Miércoles 7 de octubre",
    weekday: "Miércoles 7",
    title: "High Line, Chelsea y Broadway",
    subtitle: "Día con horario fijo a la noche",
    howToGetThere:
      "Desde el hotel: Queensboro Plaza y el 7 hasta el final, 34 St–Hudson Yards. Veinte minutos, sin transbordo, y el Vessel queda al salir. A la vuelta del teatro, el 7 desde Times Sq–42 St hasta Queensboro Plaza, y de ahí una parada en la N o la W.",
    activities: acts("2026-10-07", [
      ["09:30–10:15", "Hudson Yards y el Vessel por fuera."],
      ["10:15–12:15", "High Line hasta Chelsea."],
      ["12:15–14:15", "Chelsea Market y Little Island."],
      ["14:30–17:15", "Volver al hotel, cambiarse y descansar."],
      ["17:45–18:25", "Cena temprana cerca del teatro."],
      ["18:30", "Entrar al Minskoff Theatre. El Rey León, 19:00 a 21:30."],
    ]),
    eating:
      "Chelsea Market resuelve el almuerzo: los tacos y los mini donuts calientes. The Donut Pub queda a pocas cuadras. Para la cena, algo rápido cerca del teatro, sin experimentar.",
    ticketsNote: "Sin gasto en entradas: Broadway ya está pago.",
  },
  {
    id: "2026-10-08",
    date: "Jueves 8 de octubre",
    weekday: "Jueves 8",
    title: "Brooklyn Bridge, DUMBO y Long Island City",
    subtitle: "Decidir a qué hora pasan por DUMBO",
    howToGetThere:
      "Desde el hotel: Queens Plaza y la R hasta City Hall, que deja a cinco minutos de la entrada peatonal del puente. Alternativa más rápida: el 7 hasta Grand Central y el 6 hacia el sur hasta Brooklyn Bridge–City Hall. Al final del día vuelven desde Gantry Plaza, que está a una parada del 7 desde Vernon Blvd–Jackson Av.",
    activities: acts("2026-10-08", [
      ["09:30–11:00", "Cruzar el Brooklyn Bridge a pie desde Manhattan."],
      [
        "11:00–14:00",
        "DUMBO: Washington Street para la foto, Jane's Carousel y Brooklyn Bridge Park. Almuerzo con vista.",
      ],
      ["14:00–16:00", "Brooklyn Heights Promenade."],
      [
        "16:00–17:00",
        "Volver hacia Long Island City. En subte, o en NYC Ferry si el horario ayuda: son USD 4,50 por persona aparte.",
      ],
      ["17:00–19:00", "Gantry Plaza State Park: el cartel de Pepsi y el atardecer frente a Midtown."],
    ]),
    eating:
      "En tu lista no hay nada de Brooklyn, así que este día queda abierto: se resuelve con lo que encuentren en Brooklyn Bridge Park, que tiene varias opciones con vista al skyline.",
    ticketsNote: "Sin entradas pagas.",
  },
  {
    id: "2026-10-09",
    date: "Viernes 9 de octubre",
    weekday: "Viernes 9",
    title: "The Met y Central Park Este",
    subtitle: "La nena entra gratis al museo",
    howToGetThere:
      "Desde el hotel: la N o la W desde 39th Av hasta Lexington Av–59 St, y ahí el 6 hacia el norte hasta 77 St. Después cinco cuadras al norte y tres al oeste hasta la entrada del museo. Unos 30 minutos.",
    activities: acts("2026-10-09", [
      ["09:45–10:00", "Llegada a The Met, 1000 Fifth Avenue."],
      [
        "10:00–14:00",
        "Templo de Dendur, armas y armaduras, arte griego y romano, pintura europea. Elegir cinco sectores y no más.",
      ],
      ["14:00–15:00", "Almuerzo en el Upper East Side."],
      ["15:00–17:30", "Central Park Este: Conservatory Water y Alice in Wonderland."],
      ["18:00–19:00", "Teleférico a Roosevelt Island y Four Freedoms Park."],
    ]),
    eating:
      "Serendipity 3, por el frozen hot chocolate, queda en el Upper East Side, a pocas cuadras del teleférico: encaja mejor acá que el domingo. The Loeb Boathouse, si quieren el almuerzo elegante dentro del parque.",
    ticketsNote: "The Met USD 60: dos adultos a 30, la nena gratis.",
  },
  {
    id: "2026-10-10",
    date: "Sábado 10 de octubre",
    weekday: "Sábado 10",
    title: "Village, SoHo, Tribeca y Chinatown",
    subtitle: "Último día completo. Ya no hay que salir corriendo: el vuelo es el domingo",
    howToGetThere:
      "Desde el hotel: Queens Plaza y la E hasta West 4 St–Washington Square. Veinticinco minutos, sin transbordo, y se sale en el parque. A la vuelta, desde Chinatown la N o la W desde Canal St llega directo a 39th Av, a una cuadra del hotel.",
    activities: acts("2026-10-10", [
      ["09:30–11:15", "Greenwich Village: Washington Square Park y Bleecker Street."],
      ["11:15–12:45", "SoHo: Greene Street y arquitectura de hierro fundido."],
      [
        "12:45–13:45",
        "Tribeca, bajando por West Broadway: el skybridge de Staple Street, las casas federales de Harrison Street, el 2 de White Street y el cuartel de bomberos de Ghostbusters en North Moore.",
      ],
      ["13:45–15:30", "Chinatown y Little Italy. Almuerzo."],
      [
        "15:45–18:00",
        "Lower East Side: Katz's, Russ & Daughters para los bagels, que están en la lista, y Supermoon Bakehouse. Está pegado a Chinatown.",
      ],
      ["18:30–20:00", "Vuelta al hotel y armar las valijas con tiempo."],
      ["20:00–21:30", "Cena de despedida en Gantry Plaza State Park, con Manhattan enfrente. A diez minutos del hotel y sin trasnochar."],
    ]),
    longNote:
      "Por qué Tribeca entra bien acá: está pegado a SoHo, apenas cruzando Canal Street, y queda de paso entre SoHo y Chinatown, así que no obliga a desviarse. El circuito a pie es de una hora. El cambio es de vereda: SoHo es hierro fundido y locales de marca, Tribeca es adoquín, depósitos reciclados y calles vacías un sábado. Para la nena, el cuartel de Hook and Ladder 8, en el 14 de North Moore, es el de la película de Ghostbusters. Si el vuelo es temprano, este es el bloque que se saca primero.",
    eating:
      "El día más fuerte de tu lista. Dominique Ansel temprano, porque los cronuts se agotan. Amorino o Hu Kitchen en el Village. Rubirosa en Nolita o Joe's Shanghai en Chinatown. Si el vuelo es tarde, Katz's y Russ & Daughters están a diez minutos, en el Lower East Side.",
    ticketsNote: "Sin entradas pagas.",
  },
  {
    id: "2026-10-11",
    date: "Domingo 11 de octubre",
    weekday: "Domingo 11",
    title: "Vuelta a Miami",
    subtitle: "Vuelo a MIA desde JFK, 10:00",
    howToGetThere:
      "Desde el hotel: con tres personas, valijas y un domingo a las seis de la mañana, conviene taxi o aplicación: son 30 a 40 minutos sin tránsito y cuesta alrededor de USD 70 más peajes y propina, porque desde Queens la tarifa es por reloj y no aplica la plana de Manhattan. La opción barata es caminar hasta Queens Plaza y tomar la E hasta Sutphin Blvd–Archer Av–JFK, y ahí el AirTrain: USD 3,00 de subte más USD 8,75 de AirTrain por persona, unos USD 35 los tres, pero son 70 minutos puerta a puerta cargando equipaje. Ojo que los domingos temprano la E suele tener desvíos.",
    activities: acts("2026-10-11", [
      ["05:45", "Despertarse. Las valijas ya quedaron armadas anoche."],
      ["06:30", "Salir del hotel."],
      ["07:10", "Llegada a JFK. Son casi tres horas antes del vuelo, que para un vuelo de cabotaje con valijas despachadas es cómodo."],
      ["10:00", "Vuelo a Miami. Confirmar la terminal según la aerolínea: el AirTrain para en todas."],
    ]),
    ticketsNote: "Solo el traslado, unos USD 85 en taxi o USD 35 en subte más AirTrain.",
  },
];

export const mealsByDay = [
  {
    day: "Sábado 3",
    neighborhood: "Theater District",
    places: "Ellen's Stardust Diner, Carmine's, Black Tap",
    moment: "Cena y postre",
  },
  {
    day: "Domingo 4",
    neighborhood: "Upper West Side",
    places: "Levain Bakery, Jacob's Pickles, TAP NYC",
    moment: "Merienda al salir del parque",
  },
  {
    day: "Lunes 5",
    neighborhood: "Financial District",
    places: "Bluestone Lane, Stone Street, Nobu",
    moment: "Almuerzo y cena",
  },
  {
    day: "Martes 6",
    neighborhood: "Flatiron y Midtown",
    places: "Shake Shack original, Madison Square Eats, Maman Nomad, Magnolia",
    moment: "Almuerzo y café",
  },
  {
    day: "Miércoles 7",
    neighborhood: "Meatpacking y Chelsea",
    places: "Chelsea Market, The Donut Pub, Bubby's",
    moment: "Almuerzo",
  },
  {
    day: "Jueves 8",
    neighborhood: "Brooklyn",
    places: "Sin opciones en tu lista",
    moment: "A resolver en Brooklyn Bridge Park",
  },
  {
    day: "Viernes 9",
    neighborhood: "Upper East Side y Central Park",
    places: "Serendipity 3, The Loeb Boathouse",
    moment: "Merienda o almuerzo",
  },
  {
    day: "Sábado 10",
    neighborhood: "Village, SoHo, Chinatown",
    places:
      "Dominique Ansel, Amorino, Hu Kitchen, Rubirosa, Joe's Shanghai, Katz's, Russ & Daughters",
    moment: "Desayuno y almuerzo",
  },
];

export const mealsFootnote =
  "Dos avisos sobre la lista: Serendipity 3 figura en el Upper East Side, no en el Upper West, así que conviene dejarlo para el viernes. Y los lugares de precio alto de la lista, Nobu, Gramercy Tavern, Catch, Beauty & Essex y Park Avenue, se comen entre un tercio y la mitad del presupuesto de comida de un día entero: entran, pero uno solo en toda la semana.";

export const bucketList = {
  alreadyPlanned: [
    { item: "Grand Central, Biblioteca Pública, Chrysler", day: "Martes 6" },
    { item: "Rockefeller Plaza, Times Square, 5.ª Avenida", day: "Sáb 3 y martes 6" },
    { item: "The Oculus, 9/11 Memorial, Charging Bull, Battery Park", day: "Lunes 5" },
    { item: "Estatua de la Libertad desde el ferry, Stone Street", day: "Lunes 5" },
    { item: "Vessel, High Line, Chelsea Market", day: "Miércoles 7" },
    { item: "Brooklyn Bridge, Central Park, Bryant Park", day: "Jue 8, dom 4, sáb 3" },
    { item: "The Met, teleférico a Roosevelt Island", day: "Viernes 9" },
    { item: "Broadway, Washington Square, pretzel, taxi amarillo", day: "Varios días" },
  ],
  easyToAdd: [
    { id: "bl-flatiron", item: "Flatiron Building, ya sumado al martes" },
    { id: "bl-moma", item: "MoMA, a dos cuadras del Rockefeller" },
    { id: "bl-fearless-girl", item: "Fearless Girl, ya sumada al lunes" },
    { id: "bl-nmai", item: "Museo del Indígena Americano, gratis y sobre el recorrido" },
    { id: "bl-msg", item: "Madison Square Garden por fuera, cerca de Penn Station" },
    { id: "bl-guggenheim", item: "Guggenheim, lunes y sábados de 16 a 17:30 a voluntad" },
    { id: "bl-bagels", item: "Bagels en Russ & Daughters, sábado 10" },
    { id: "bl-waterfall", item: "Waterfall Tunnel: decime a cuál te referís y lo ubico" },
  ],
  notFitting: [
    "Empire State, Top of the Rock y The Edge: con SUMMIT y One World ya hechos, serían repetir",
    "The Met Cloisters: son medio día entero, en Washington Heights",
    "Ya nada queda afuera por plata: el museo del 11-S entra gratis el lunes",
    "Isla de la Estatua y Ellis: medio día y no está en el plan",
    "Museo de Historia Natural: es medio día, choca con el MET",
    "Frick, Cooper Hewitt, FIT y Museo de la Ciudad: no hay día libre",
    "Ballet: habría que sacar entrada y sacrificar una noche",
  ],
};

export const rules = [
  "Entradas: solo en TKTS, en la boletería del teatro o en la web oficial. Nunca en la calle.",
  "Taxi: solo desde la fila oficial del aeropuerto. Los que se ofrecen adentro de la terminal cobran el triple.",
  "Nadie ayuda gratis con las valijas, y nadie regala un CD. Los dos terminan en un cobro.",
  "Antes de sacar fotos con personajes disfrazados, preguntar el precio.",
  "No conectarse a wifi abierto con nombre de tienda.",
  "Baños: los lobbies de los hoteles grandes y el Oculus. Son gratis y están siempre abiertos.",
];

export const rulesFootnote =
  "Verificar precios y horarios antes de salir. El chequeo automático de los miércoles y sábados llega por correo.";

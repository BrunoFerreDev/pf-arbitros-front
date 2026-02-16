interface Jugador {
    id: number;
    nombre: string;
    // ... otros campos del jugador
}

interface ClubData {
    idClub: number;
    nombreClub: string; // Tu API devuelve nombreClub, no nombre
    jugadores: Jugador[];
}

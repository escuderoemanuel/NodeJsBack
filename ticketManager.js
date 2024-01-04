class TicketManager {
  #precioBaseDeGanancia = 0.15;
  #id = 1;


  constructor() {
    this.eventos = [];
  }

  getEventos() {
    return this.eventos;
  }
  agregarEvento(nombre, lugar, precio, capacidad, fecha) {
    let evento = {
    }
    evento.id = this.#id++;
    evento.nombre = nombre;
    evento.lugar = lugar;
    evento.precio = precio + this.#precioBaseDeGanancia;
    evento.capacidad = capacidad ?? 50;
    evento.fecha = fecha ?? new Date().toLocaleDateString();
    evento.participantes = [];
    this.eventos.push(evento);
  }
}

const manager = new TicketManager();
manager.agregarEvento("evento 1", "lugar 1", 1000);
manager.agregarEvento("evento 2", "lugar 2", 454, 500, '3/2/2024');
console.log(manager.getEventos());

const localTypes = [
  {
    name: 'Estádio',
  },
  {
    name: 'Clube',
  },
];

const locals = {
  name: 'Estádio Cícero Pompeu de Toledo',
  nickname: 'Morumbis',
  ein: '12345678000112',
  email: 'estadio.morumbi@email.com',
  phone: '11912344321',
  localType: {
    connect: {
      id: 1,
    },
  },
  localInformation: {
    create: {
      zipCode: '05653070',
      city: 'São Paulo',
      state: 'SP',
      address: 'Praça Roberto Gomes Pedrosa, 1',
    },
  },
  gates: {
    createMany: {
      data: [
        {
          name: 'A',
          isTicketGate: false,
        },
        {
          name: 'B',
          isTicketGate: false,
        },
      ],
    },
  },
};

const eventTypes = [
  {
    name: 'Futebol',
  },
  {
    name: 'Show',
  },
];

const events = {
  name: 'Final Copa América',
  eventDate: new Date('2023-10-05'),
  eventTime: '2000',
  email: 'administrador@morumbi.com.br',
  local: {
    connect: {
      id: 1,
    },
  },
  eventType: {
    connect: {
      id: 1,
    },
  },
};

module.exports = {
  localTypes,
  locals,
  eventTypes,
  events,
};

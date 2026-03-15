import type { TouristSpot, AccommodationDetail, RestaurantDetail, StateData } from '@/types/travel';

export const statesByCountry: Record<string, StateData[]> = {
  BR: [
    { id: 'RJ', name: 'Rio de Janeiro', country: 'BR', demand: 'high', demandLabel: 'Alta procura', description: 'Praias, cultura e paisagens icônicas.' },
    { id: 'BA', name: 'Bahia', country: 'BR', demand: 'high', demandLabel: 'Alta procura', description: 'Praias paradisíacas e cultura afro-brasileira.' },
    { id: 'CE', name: 'Ceará', country: 'BR', demand: 'moderate', demandLabel: 'Moderada', description: 'Sol constante e praias selvagens.' },
    { id: 'SC', name: 'Santa Catarina', country: 'BR', demand: 'moderate', demandLabel: 'Moderada', description: 'Praias e trilhas ecológicas.' },
    { id: 'SP', name: 'São Paulo', country: 'BR', demand: 'high', demandLabel: 'Alta procura', description: 'Gastronomia, arte e vida noturna.' },
    { id: 'RS', name: 'Rio Grande do Sul', country: 'BR', demand: 'low', demandLabel: 'Baixa procura', description: 'Vinícolas e cultura gaúcha.' },
    { id: 'MG', name: 'Minas Gerais', country: 'BR', demand: 'moderate', demandLabel: 'Moderada', description: 'Cidades históricas e queijos artesanais.' },
    { id: 'AM', name: 'Amazonas', country: 'BR', demand: 'low', demandLabel: 'Baixa procura', description: 'Floresta amazônica e ecoturismo.' },
    { id: 'PE', name: 'Pernambuco', country: 'BR', demand: 'moderate', demandLabel: 'Moderada', description: 'Recife Antigo e praias de Porto de Galinhas.' },
    { id: 'PR', name: 'Paraná', country: 'BR', demand: 'moderate', demandLabel: 'Moderada', description: 'Cataratas do Iguaçu e natureza exuberante.' },
  ],
  US: [
    { id: 'FL', name: 'Flórida', country: 'US', demand: 'high', demandLabel: 'Alta procura', description: 'Parques temáticos e praias.' },
    { id: 'NY', name: 'Nova York', country: 'US', demand: 'high', demandLabel: 'Alta procura', description: 'A cidade que nunca dorme.' },
    { id: 'CA', name: 'Califórnia', country: 'US', demand: 'moderate', demandLabel: 'Moderada', description: 'Hollywood, praias e Silicon Valley.' },
    { id: 'NV', name: 'Nevada', country: 'US', demand: 'moderate', demandLabel: 'Moderada', description: 'Las Vegas e desertos espetaculares.' },
  ],
  FR: [
    { id: 'IDF', name: 'Île-de-France (Paris)', country: 'FR', demand: 'high', demandLabel: 'Alta procura', description: 'A cidade luz.' },
    { id: 'PAC', name: 'Provence', country: 'FR', demand: 'moderate', demandLabel: 'Moderada', description: 'Lavanda e vilarejos charmosos.' },
    { id: 'CDA', name: "Côte d'Azur", country: 'FR', demand: 'high', demandLabel: 'Alta procura', description: 'Riviera Francesa e glamour.' },
  ],
  IT: [
    { id: 'LAZ', name: 'Lácio (Roma)', country: 'IT', demand: 'high', demandLabel: 'Alta procura', description: 'Coliseu, Vaticano e história.' },
    { id: 'TOS', name: 'Toscana', country: 'IT', demand: 'moderate', demandLabel: 'Moderada', description: 'Vinhedos e arte renascentista.' },
    { id: 'VEN', name: 'Vêneto (Veneza)', country: 'IT', demand: 'high', demandLabel: 'Alta procura', description: 'Canais e arquitetura única.' },
  ],
  JP: [
    { id: 'TKY', name: 'Tóquio', country: 'JP', demand: 'high', demandLabel: 'Alta procura', description: 'Tradição e tecnologia.' },
    { id: 'KYT', name: 'Quioto', country: 'JP', demand: 'moderate', demandLabel: 'Moderada', description: 'Templos e jardins zen.' },
    { id: 'OSK', name: 'Osaka', country: 'JP', demand: 'moderate', demandLabel: 'Moderada', description: 'Street food e vida noturna.' },
  ],
  PT: [
    { id: 'LIS', name: 'Lisboa', country: 'PT', demand: 'high', demandLabel: 'Alta procura', description: 'Pastéis de nata e história.' },
    { id: 'ALG', name: 'Algarve', country: 'PT', demand: 'moderate', demandLabel: 'Moderada', description: 'Praias douradas e falésias.' },
    { id: 'PRT', name: 'Porto', country: 'PT', demand: 'moderate', demandLabel: 'Moderada', description: 'Vinho do Porto e Ribeira.' },
  ],
  ES: [
    { id: 'CAT', name: 'Catalunha (Barcelona)', country: 'ES', demand: 'high', demandLabel: 'Alta procura', description: 'Gaudí, tapas e mar.' },
    { id: 'MAD', name: 'Madri', country: 'ES', demand: 'moderate', demandLabel: 'Moderada', description: 'Museus e vida noturna.' },
  ],
  AR: [
    { id: 'BAS', name: 'Buenos Aires', country: 'AR', demand: 'moderate', demandLabel: 'Moderada', description: 'Tango, carne e cultura.' },
    { id: 'PAT', name: 'Patagônia', country: 'AR', demand: 'low', demandLabel: 'Baixa procura', description: 'Geleiras e natureza selvagem.' },
  ],
  MX: [
    { id: 'QR', name: 'Quintana Roo (Cancún)', country: 'MX', demand: 'high', demandLabel: 'Alta procura', description: 'Riviera Maya e ruínas maias.' },
    { id: 'CDM', name: 'Cidade do México', country: 'MX', demand: 'moderate', demandLabel: 'Moderada', description: 'Gastronomia e história asteca.' },
  ],
  GR: [
    { id: 'SAN', name: 'Santorini', country: 'GR', demand: 'high', demandLabel: 'Alta procura', description: 'Pôr do sol e casas brancas.' },
    { id: 'ATH', name: 'Atenas', country: 'GR', demand: 'moderate', demandLabel: 'Moderada', description: 'Acrópole e história antiga.' },
  ],
  CO: [
    { id: 'BOG', name: 'Bogotá', country: 'CO', demand: 'moderate', demandLabel: 'Moderada', description: 'Arte, história e café.' },
    { id: 'CTG', name: 'Cartagena', country: 'CO', demand: 'high', demandLabel: 'Alta procura', description: 'Cidade murada e praias caribenhas.' },
  ],
  TH: [
    { id: 'BKK', name: 'Bangkok', country: 'TH', demand: 'high', demandLabel: 'Alta procura', description: 'Templos dourados e street food.' },
    { id: 'PHK', name: 'Phuket', country: 'TH', demand: 'moderate', demandLabel: 'Moderada', description: 'Praias paradisíacas e mergulho.' },
  ],
};

export const touristSpotsByState: Record<string, TouristSpot[]> = {
  RJ: [
    { id: 'cristo', name: 'Cristo Redentor', description: 'Uma das 7 Maravilhas do Mundo Moderno no topo do Corcovado.', peakMonths: [6, 7, 8, 12], rating: 4.8, lat: -22.9519, lng: -43.2105, imageEmoji: '⛪' },
    { id: 'pao-acucar', name: 'Pão de Açúcar', description: 'Bondinho com vista panorâmica da Baía de Guanabara.', peakMonths: [5, 6, 7, 8], rating: 4.7, lat: -22.9492, lng: -43.1545, imageEmoji: '🏔️' },
    { id: 'copacabana', name: 'Praia de Copacabana', description: 'A praia mais famosa do mundo com calçadão icônico.', peakMonths: [12, 1, 2, 3], rating: 4.5, lat: -22.9711, lng: -43.1823, imageEmoji: '🏖️' },
    { id: 'lapa', name: 'Arcos da Lapa', description: 'Vida noturna, samba e cultura boêmia.', peakMonths: [2, 3, 6, 7], rating: 4.3, lat: -22.9133, lng: -43.1799, imageEmoji: '🎵' },
  ],
  BA: [
    { id: 'pelourinho', name: 'Pelourinho', description: 'Centro histórico com arquitetura colonial colorida.', peakMonths: [2, 6, 7, 12], rating: 4.6, lat: -12.9714, lng: -38.5124, imageEmoji: '🏛️' },
    { id: 'praia-forte', name: 'Praia do Forte', description: 'Vila charmosa com projeto Tamar e piscinas naturais.', peakMonths: [12, 1, 2, 7], rating: 4.5, lat: -12.5730, lng: -38.0003, imageEmoji: '🐢' },
    { id: 'chapada', name: 'Chapada Diamantina', description: 'Trilhas, cachoeiras e grutas deslumbrantes.', peakMonths: [5, 6, 7, 8, 9], rating: 4.9, lat: -12.4253, lng: -41.3610, imageEmoji: '🌄' },
  ],
  CE: [
    { id: 'jeri', name: 'Jericoacoara', description: 'Dunas, lagoas e pôr do sol na Duna do Pôr do Sol.', peakMonths: [7, 8, 9, 10, 11], rating: 4.9, lat: -2.7963, lng: -40.5114, imageEmoji: '🏜️' },
    { id: 'canoa', name: 'Canoa Quebrada', description: 'Falésias coloridas e vida noturna na Broadway.', peakMonths: [8, 9, 10, 11], rating: 4.4, lat: -4.4298, lng: -37.4741, imageEmoji: '🌅' },
    { id: 'beach-park', name: 'Beach Park', description: 'Maior parque aquático da América Latina.', peakMonths: [1, 7, 12], rating: 4.6, lat: -3.8411, lng: -38.4085, imageEmoji: '🎢' },
  ],
  SC: [
    { id: 'floripa', name: 'Florianópolis', description: 'Ilha da Magia com 42 praias.', peakMonths: [12, 1, 2, 3], rating: 4.7, lat: -27.5954, lng: -48.5480, imageEmoji: '🏝️' },
    { id: 'bc', name: 'Balneário Camboriú', description: 'Roda gigante, teleférico e vida noturna.', peakMonths: [12, 1, 2], rating: 4.5, lat: -26.9906, lng: -48.6348, imageEmoji: '🎡' },
  ],
  SP: [
    { id: 'paulista', name: 'Avenida Paulista', description: 'Coração cultural e financeiro de São Paulo.', peakMonths: [3, 4, 5, 6, 7, 8, 9, 10], rating: 4.5, lat: -23.5613, lng: -46.6560, imageEmoji: '🏙️' },
    { id: 'ibirapuera', name: 'Parque Ibirapuera', description: 'Maior parque urbano da cidade.', peakMonths: [4, 5, 6, 7, 8, 9], rating: 4.7, lat: -23.5874, lng: -46.6576, imageEmoji: '🌳' },
  ],
  FL: [
    { id: 'disney', name: 'Walt Disney World', description: 'O parque temático mais famoso do mundo.', peakMonths: [3, 6, 7, 11, 12], rating: 4.8, lat: 28.3852, lng: -81.5639, imageEmoji: '🏰' },
    { id: 'miami-beach', name: 'Miami Beach', description: 'Art Deco, praias e vida noturna.', peakMonths: [11, 12, 1, 2, 3], rating: 4.6, lat: 25.7907, lng: -80.1300, imageEmoji: '🌴' },
    { id: 'universal', name: 'Universal Studios', description: 'Harry Potter e atrações de cinema.', peakMonths: [3, 6, 7, 12], rating: 4.7, lat: 28.4722, lng: -81.4676, imageEmoji: '🎬' },
  ],
  NY: [
    { id: 'times-square', name: 'Times Square', description: 'O cruzamento mais famoso do mundo.', peakMonths: [6, 7, 12], rating: 4.4, lat: 40.7580, lng: -73.9855, imageEmoji: '🗽' },
    { id: 'central-park', name: 'Central Park', description: '341 hectares de natureza no coração de Manhattan.', peakMonths: [4, 5, 9, 10], rating: 4.8, lat: 40.7829, lng: -73.9654, imageEmoji: '🌳' },
    { id: 'statue-liberty', name: 'Estátua da Liberdade', description: 'Símbolo de liberdade e democracia.', peakMonths: [5, 6, 7, 8, 9], rating: 4.7, lat: 40.6892, lng: -74.0445, imageEmoji: '🗽' },
  ],
  IDF: [
    { id: 'eiffel', name: 'Torre Eiffel', description: 'O monumento mais visitado do mundo.', peakMonths: [4, 5, 6, 9], rating: 4.7, lat: 48.8584, lng: 2.2945, imageEmoji: '🗼' },
    { id: 'louvre', name: 'Museu do Louvre', description: 'Maior museu de arte do mundo com a Mona Lisa.', peakMonths: [3, 4, 5, 10], rating: 4.8, lat: 48.8606, lng: 2.3376, imageEmoji: '🎨' },
  ],
  LAZ: [
    { id: 'coliseu', name: 'Coliseu', description: 'O anfiteatro mais famoso do Império Romano.', peakMonths: [4, 5, 9, 10], rating: 4.8, lat: 41.8902, lng: 12.4922, imageEmoji: '🏛️' },
    { id: 'vaticano', name: 'Vaticano', description: 'Basílica de São Pedro e Capela Sistina.', peakMonths: [3, 4, 5, 10], rating: 4.9, lat: 41.9029, lng: 12.4534, imageEmoji: '⛪' },
  ],
  SAN: [
    { id: 'oia', name: 'Oia', description: 'Pôr do sol mais famoso do mundo sobre as casas brancas.', peakMonths: [5, 6, 7, 8, 9], rating: 4.9, lat: 36.4618, lng: 25.3753, imageEmoji: '🌅' },
    { id: 'fira', name: 'Fira', description: 'Capital de Santorini com vista para a caldeira.', peakMonths: [5, 6, 7, 8, 9], rating: 4.6, lat: 36.4167, lng: 25.4315, imageEmoji: '🏘️' },
  ],
  TKY: [
    { id: 'shibuya', name: 'Cruzamento de Shibuya', description: 'O cruzamento mais movimentado do mundo.', peakMonths: [3, 4, 10, 11], rating: 4.5, lat: 35.6595, lng: 139.7004, imageEmoji: '🚶' },
    { id: 'senso-ji', name: 'Templo Senso-ji', description: 'O templo mais antigo de Tóquio em Asakusa.', peakMonths: [3, 4, 5, 10, 11], rating: 4.7, lat: 35.7148, lng: 139.7967, imageEmoji: '⛩️' },
  ],
  LIS: [
    { id: 'belem', name: 'Torre de Belém', description: 'Patrimônio Mundial da UNESCO à beira do Tejo.', peakMonths: [4, 5, 6, 9, 10], rating: 4.6, lat: 38.6916, lng: -9.2159, imageEmoji: '🏰' },
    { id: 'alfama', name: 'Alfama', description: 'Bairro mais antigo de Lisboa com fado e vielas.', peakMonths: [5, 6, 9, 10], rating: 4.7, lat: 38.7118, lng: -9.1301, imageEmoji: '🎶' },
  ],
  QR: [
    { id: 'chichen', name: 'Chichén Itzá', description: 'Pirâmide maia e uma das 7 Maravilhas.', peakMonths: [11, 12, 1, 2, 3], rating: 4.8, lat: 20.6843, lng: -88.5678, imageEmoji: '🏛️' },
    { id: 'tulum', name: 'Ruínas de Tulum', description: 'Ruínas maias sobre o mar do Caribe.', peakMonths: [11, 12, 1, 2], rating: 4.6, lat: 20.2145, lng: -87.4291, imageEmoji: '🏖️' },
  ],
};

export const accommodationsByState: Record<string, AccommodationDetail[]> = {
  RJ: [
    { id: 'copacabana-palace', name: 'Copacabana Palace', address: 'Av. Atlântica, 1702 - Copacabana', rating: 4.8, pricePerNight: 1200, safetyScore: 4.5, distanceToSpots: 1.2, lat: -22.9666, lng: -43.1784, type: 'Hotel 5★' },
    { id: 'ibis-centro', name: 'Ibis Rio Centro', address: 'R. Silva Jardim, 32 - Centro', rating: 3.9, pricePerNight: 280, safetyScore: 3.2, distanceToSpots: 2.5, lat: -22.9068, lng: -43.1790, type: 'Hotel 3★' },
    { id: 'selina-lapa', name: 'Selina Lapa', address: 'R. Joaquim Silva, 56 - Lapa', rating: 4.3, pricePerNight: 150, safetyScore: 3.5, distanceToSpots: 0.8, lat: -22.9126, lng: -43.1808, type: 'Hostel' },
    { id: 'hilton-copacabana', name: 'Hilton Copacabana', address: 'Av. Atlântica, 1020 - Copacabana', rating: 4.7, pricePerNight: 950, safetyScore: 4.8, distanceToSpots: 1.0, lat: -22.9686, lng: -43.1820, type: 'Hotel 5★' },
  ],
  BA: [
    { id: 'fasano-salvador', name: 'Hotel Fasano Salvador', address: 'R. Borges dos Reis, 45 - Rio Vermelho', rating: 4.7, pricePerNight: 890, safetyScore: 4.3, distanceToSpots: 3.0, lat: -13.0115, lng: -38.4841, type: 'Hotel 5★' },
    { id: 'hostel-pelourinho', name: 'Hostel Pelourinho', address: 'Largo do Pelourinho, 12', rating: 4.1, pricePerNight: 90, safetyScore: 3.0, distanceToSpots: 0.3, lat: -12.9720, lng: -38.5110, type: 'Hostel' },
  ],
  FL: [
    { id: 'disney-resort', name: 'Disney Contemporary Resort', address: '4600 World Dr, Orlando', rating: 4.7, pricePerNight: 450, safetyScore: 5.0, distanceToSpots: 0.5, lat: 28.4150, lng: -81.5748, type: 'Resort' },
    { id: 'marriott-miami', name: 'Marriott Miami Beach', address: '4525 Collins Ave, Miami Beach', rating: 4.5, pricePerNight: 380, safetyScore: 4.5, distanceToSpots: 1.5, lat: 25.8187, lng: -80.1226, type: 'Hotel 4★' },
  ],
  IDF: [
    { id: 'hotel-plaza', name: 'Hôtel Plaza Athénée', address: '25 Av. Montaigne, Paris', rating: 4.9, pricePerNight: 1500, safetyScore: 5.0, distanceToSpots: 1.8, lat: 48.8667, lng: 2.3050, type: 'Hotel 5★' },
    { id: 'generator-paris', name: 'Generator Paris', address: '9-11 Pl. du Colonel Fabien', rating: 4.2, pricePerNight: 120, safetyScore: 4.0, distanceToSpots: 3.5, lat: 48.8785, lng: 2.3702, type: 'Hostel' },
  ],
  SAN: [
    { id: 'canaves-oia', name: 'Canaves Oia Suites', address: 'Oia, Santorini', rating: 4.9, pricePerNight: 800, safetyScore: 5.0, distanceToSpots: 0.3, lat: 36.4620, lng: 25.3755, type: 'Hotel Boutique' },
  ],
};

export const restaurantsByState: Record<string, RestaurantDetail[]> = {
  RJ: [
    { id: 'confeitaria-colombo', name: 'Confeitaria Colombo', cuisine: 'Café & Doces', rating: 4.6, priceRange: '$$', address: 'R. Gonçalves Dias, 32 - Centro', lat: -22.9065, lng: -43.1762 },
    { id: 'churrascaria-palace', name: 'Churrascaria Palace', cuisine: 'Churrasco', rating: 4.5, priceRange: '$$$', address: 'R. Rodolfo Dantas, 16 - Copacabana', lat: -22.9668, lng: -43.1785 },
    { id: 'boteco-belmonte', name: 'Boteco Belmonte', cuisine: 'Petiscos & Cervejas', rating: 4.4, priceRange: '$', address: 'R. Domingos Ferreira, 521 - Copacabana', lat: -22.9684, lng: -43.1855 },
    { id: 'ct-boucherie', name: 'CT Boucherie', cuisine: 'Francesa', rating: 4.7, priceRange: '$$$$', address: 'R. Dias Ferreira, 636 - Leblon', lat: -22.9833, lng: -43.2233 },
    { id: 'sushi-leblon', name: 'Sushi Leblon', cuisine: 'Japonesa', rating: 4.5, priceRange: '$$$', address: 'R. Dias Ferreira, 256 - Leblon', lat: -22.9837, lng: -43.2230 },
  ],
  BA: [
    { id: 'acaraje-regina', name: 'Acarajé da Regina', cuisine: 'Comida Baiana', rating: 4.8, priceRange: '$', address: 'Largo de Santana - Rio Vermelho', lat: -13.0122, lng: -38.4841 },
    { id: 'dona-mariquita', name: 'Dona Mariquita', cuisine: 'Nordestina', rating: 4.6, priceRange: '$$', address: 'R. do Meio, 24 - Rio Vermelho', lat: -13.0100, lng: -38.4855 },
    { id: 'paraiso-tropical', name: 'Paraíso Tropical', cuisine: 'Frutos do Mar', rating: 4.5, priceRange: '$$$', address: 'Av. Contorno, 1010 - Bahia Marina', lat: -12.9740, lng: -38.5155 },
  ],
  FL: [
    { id: 'joes-stone', name: "Joe's Stone Crab", cuisine: 'Frutos do Mar', rating: 4.7, priceRange: '$$$$', address: '11 Washington Ave, Miami Beach', lat: 25.7682, lng: -80.1342 },
    { id: 'shake-shack-orlando', name: 'Shake Shack Orlando', cuisine: 'Hambúrguer', rating: 4.4, priceRange: '$$', address: '8001 S Orange Blossom Trl', lat: 28.4276, lng: -81.4691 },
  ],
  IDF: [
    { id: 'le-bouillon', name: 'Le Bouillon Chartier', cuisine: 'Francesa Clássica', rating: 4.5, priceRange: '$$', address: '7 Rue du Faubourg Montmartre, Paris', lat: 48.8727, lng: 2.3442 },
    { id: 'chez-janou', name: 'Chez Janou', cuisine: 'Francesa', rating: 4.6, priceRange: '$$$', address: '2 Rue Roger Verlomme, Paris', lat: 48.8554, lng: 2.3655 },
  ],
  SAN: [
    { id: 'ammoudi-fish', name: 'Ammoudi Fish Tavern', cuisine: 'Frutos do Mar', rating: 4.7, priceRange: '$$$', address: 'Ammoudi Bay, Oia', lat: 36.4650, lng: 25.3713 },
  ],
};

export const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const monthEmojis = ['☀️', '🎭', '🌧️', '🍂', '🌸', '❄️', '🎿', '🌾', '🍁', '🎃', '🌤️', '🎄'];

export const transportOptions = [
  { id: 'aviao', label: 'Avião', emoji: '✈️', desc: 'Mais rápido, ideal para longas distâncias' },
  { id: 'onibus', label: 'Ônibus', emoji: '🚌', desc: 'Econômico e com diversas rotas' },
  { id: 'carro', label: 'Carro', emoji: '🚗', desc: 'Flexibilidade total no trajeto' },
  { id: 'navio', label: 'Navio / Cruzeiro', emoji: '🚢', desc: 'Experiência única pelo mar' },
  { id: 'trem', label: 'Trem', emoji: '🚆', desc: 'Confortável e cênico' },
];

export const localTransportOptions = [
  { id: 'publico', label: 'Transporte Público', emoji: '🚇', desc: 'Metrô e ônibus locais', avgCost: 'R$ 5-15/viagem', avgTime: '30-60 min' },
  { id: 'taxi', label: 'Táxi / Uber', emoji: '🚕', desc: 'Conforto porta a porta', avgCost: 'R$ 20-80/viagem', avgTime: '15-40 min' },
  { id: 'aluguel', label: 'Aluguel de Carro', emoji: '🚗', desc: 'Liberdade total', avgCost: 'R$ 150-300/dia', avgTime: '10-30 min' },
  { id: 'bicicleta', label: 'Bicicleta', emoji: '🚲', desc: 'Ecológico e saudável', avgCost: 'R$ 10-30/dia', avgTime: '15-45 min' },
  { id: 'a-pe', label: 'A pé', emoji: '🚶', desc: 'Explore cada canto', avgCost: 'Grátis', avgTime: '20-60 min' },
];

export const cuisineTypes = [
  { id: 'local', label: 'Comida Local', emoji: '🍲' },
  { id: 'churrasco', label: 'Churrasco', emoji: '🥩' },
  { id: 'frutos-mar', label: 'Frutos do Mar', emoji: '🦐' },
  { id: 'italiana', label: 'Italiana', emoji: '🍝' },
  { id: 'japonesa', label: 'Japonesa', emoji: '🍣' },
  { id: 'fast-food', label: 'Fast Food', emoji: '🍔' },
  { id: 'vegana', label: 'Vegana', emoji: '🥗' },
  { id: 'cafe', label: 'Cafés & Doces', emoji: '☕' },
  { id: 'francesa', label: 'Francesa', emoji: '🥐' },
  { id: 'mexicana', label: 'Mexicana', emoji: '🌮' },
];

import type { TouristSpot, AccommodationDetail, RestaurantDetail, CityData } from '@/types/travel';

export const pernambucoImages: Record<string, string> = {
  recife: 'https://images.unsplash.com/photo-1598443926757-02b7a41d2513?w=400',
  olinda: 'https://images.unsplash.com/photo-1624638331590-e7e4e5e10024?w=400',
  noronha: 'https://images.unsplash.com/photo-1580060195710-6ea6d306aa36?w=400',
  'porto-galinhas': 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?w=400',
  caruaru: 'https://images.unsplash.com/photo-1604868432396-e4b94c0c01e3?w=400',
  gravata: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
  petrolina: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
  garanhuns: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400',
};

export const pernambucoCities: CityData[] = [
  { id: 'recife', name: 'Recife', description: 'Capital com praias urbanas, Marco Zero e cultura vibrante.', imageEmoji: '🏙️', lat: -8.0476, lng: -34.8770, imageUrl: pernambucoImages.recife },
  { id: 'olinda', name: 'Olinda', description: 'Patrimônio da UNESCO, ladeiras históricas e o melhor carnaval de rua.', imageEmoji: '🎭', lat: -8.0089, lng: -34.8553, imageUrl: pernambucoImages.olinda },
  { id: 'noronha', name: 'Fernando de Noronha', description: 'Arquipélago paradisíaco com as praias mais bonitas do Brasil.', imageEmoji: '🐢', lat: -3.8547, lng: -32.4247, imageUrl: pernambucoImages.noronha },
  { id: 'porto-galinhas', name: 'Porto de Galinhas', description: 'Piscinas naturais, jangadas e praias de águas mornas.', imageEmoji: '🏖️', lat: -8.5028, lng: -35.0056, imageUrl: pernambucoImages['porto-galinhas'] },
  { id: 'caruaru', name: 'Caruaru', description: 'Capital do forró, Feira de Caruaru e Alto do Moura.', imageEmoji: '🎶', lat: -8.2840, lng: -35.9761, imageUrl: pernambucoImages.caruaru },
  { id: 'gravata', name: 'Gravatá', description: 'Serra pernambucana com clima ameno, trilhas e gastronomia.', imageEmoji: '🌄', lat: -8.2006, lng: -35.5647, imageUrl: pernambucoImages.gravata },
  { id: 'petrolina', name: 'Petrolina', description: 'Vinícolas do Vale do São Francisco e enoturismo.', imageEmoji: '🍷', lat: -9.3891, lng: -40.5028, imageUrl: pernambucoImages.petrolina },
  { id: 'garanhuns', name: 'Garanhuns', description: 'Festival de Inverno, clima frio e natureza exuberante.', imageEmoji: '❄️', lat: -8.8828, lng: -36.4964, imageUrl: pernambucoImages.garanhuns },
  { id: 'serra-talhada', name: 'Serra Talhada', description: 'Terra de Lampião, cultura sertaneja e trilhas.', imageEmoji: '🤠', lat: -7.9861, lng: -38.2956 },
  { id: 'goiana', name: 'Goiana', description: 'Igrejas barrocas, praias e mangues preservados.', imageEmoji: '⛪', lat: -7.5603, lng: -35.0025 },
  { id: 'cabo-santo-agostinho', name: 'Cabo de Santo Agostinho', description: 'Praias selvagens, falésias e a histórica Suape.', imageEmoji: '🌊', lat: -8.2833, lng: -35.0300 },
  { id: 'tamandare', name: 'Tamandaré', description: 'Praia dos Carneiros e águas cristalinas.', imageEmoji: '🏝️', lat: -8.7588, lng: -35.1042 },
];

export const spotsByCity: Record<string, TouristSpot[]> = {
  recife: [
    { id: 'marco-zero', name: 'Marco Zero', description: 'Praça principal do Recife Antigo com esculturas e eventos culturais.', peakMonths: [2, 6, 7, 12], rating: 4.5, lat: -8.0631, lng: -34.8711, imageEmoji: '🏛️', avgCostPerPerson: 0, category: 'cultura', imageUrl: 'https://images.unsplash.com/photo-1598443926757-02b7a41d2513?w=400' },
    { id: 'praia-boa-viagem', name: 'Praia de Boa Viagem', description: 'Praia urbana mais famosa do Recife com recifes naturais.', peakMonths: [10, 11, 12, 1, 2], rating: 4.3, lat: -8.1186, lng: -34.8953, imageEmoji: '🏖️', avgCostPerPerson: 0, category: 'praia' },
    { id: 'instituto-brennand', name: 'Instituto Ricardo Brennand', description: 'Castelo medieval com acervo de armas e obras de arte.', peakMonths: [3, 4, 5, 6, 7, 8, 9, 10, 11], rating: 4.8, lat: -8.0647, lng: -34.9728, imageEmoji: '🏰', avgCostPerPerson: 30, category: 'cultura', imageUrl: 'https://images.unsplash.com/photo-1580923368248-877f237696cd?w=400' },
    { id: 'oficina-ceramica-brennand', name: 'Oficina Cerâmica F. Brennand', description: 'Parque de esculturas cerâmicas a céu aberto.', peakMonths: [3, 4, 5, 6, 7, 8, 9, 10, 11], rating: 4.7, lat: -8.0511, lng: -34.9819, imageEmoji: '🎨', avgCostPerPerson: 30, category: 'cultura' },
    { id: 'parque-jaqueira', name: 'Parque da Jaqueira', description: 'Área verde com trilhas, playground e espaço fitness.', peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], rating: 4.4, lat: -8.0367, lng: -34.8989, imageEmoji: '🌳', avgCostPerPerson: 0, category: 'natureza' },
    { id: 'paintball-recife', name: 'Arena Paintball Recife', description: 'Campo de paintball com cenários variados e equipamento completo.', peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], rating: 4.5, lat: -8.0500, lng: -34.9400, imageEmoji: '🎯', avgCostPerPerson: 80, category: 'entretenimento' },
    { id: 'passeio-catamara', name: 'Passeio de Catamarã', description: 'Navegação pelos rios e pontes do Recife com guia turístico.', peakMonths: [10, 11, 12, 1, 2, 3], rating: 4.6, lat: -8.0620, lng: -34.8715, imageEmoji: '⛵', avgCostPerPerson: 60, category: 'turismo' },
    { id: 'rua-bom-jesus', name: 'Rua do Bom Jesus', description: 'Primeira sinagoga das Américas e casario colonial.', peakMonths: [2, 6, 7, 12], rating: 4.4, lat: -8.0614, lng: -34.8722, imageEmoji: '🕍', avgCostPerPerson: 0, category: 'cultura' },
  ],
  olinda: [
    { id: 'se-olinda', name: 'Alto da Sé', description: 'Mirante com vista panorâmica de Olinda e Recife.', peakMonths: [2, 6, 7, 12], rating: 4.6, lat: -8.0136, lng: -34.8556, imageEmoji: '⛪', avgCostPerPerson: 0, category: 'turismo', imageUrl: 'https://images.unsplash.com/photo-1624638331590-e7e4e5e10024?w=400' },
    { id: 'carnaval-olinda', name: 'Ladeiras do Carnaval', description: 'Percurso dos bonecos gigantes e frevos.', peakMonths: [2, 3], rating: 4.9, lat: -8.0100, lng: -34.8500, imageEmoji: '🎭', avgCostPerPerson: 0, category: 'cultura' },
    { id: 'quatro-cantos', name: 'Quatro Cantos', description: 'Cruzamento histórico com casarões coloniais e artesanato.', peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], rating: 4.3, lat: -8.0095, lng: -34.8510, imageEmoji: '🏘️', avgCostPerPerson: 0, category: 'cultura' },
    { id: 'mercado-ribeira', name: 'Mercado da Ribeira', description: 'Mercado de artesanato e arte local.', peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], rating: 4.2, lat: -8.0115, lng: -34.8535, imageEmoji: '🛍️', avgCostPerPerson: 0, category: 'cultura' },
    { id: 'trilha-olinda', name: 'Trilha Ecológica de Olinda', description: 'Caminhada por mata atlântica com fauna nativa.', peakMonths: [5, 6, 7, 8, 9], rating: 4.3, lat: -8.0050, lng: -34.8480, imageEmoji: '🥾', avgCostPerPerson: 15, category: 'trilha' },
  ],
  noronha: [
    { id: 'baia-sancho', name: 'Baía do Sancho', description: 'Eleita a praia mais bonita do mundo várias vezes.', peakMonths: [8, 9, 10, 11, 12], rating: 5.0, lat: -3.8547, lng: -32.4400, imageEmoji: '🏖️', avgCostPerPerson: 0, category: 'praia', imageUrl: 'https://images.unsplash.com/photo-1580060195710-6ea6d306aa36?w=400' },
    { id: 'baia-porcos', name: 'Baía dos Porcos', description: 'Paisagem paradisíaca com formações rochosas.', peakMonths: [8, 9, 10, 11], rating: 4.9, lat: -3.8530, lng: -32.4380, imageEmoji: '🌊', avgCostPerPerson: 0, category: 'praia' },
    { id: 'mergulho-noronha', name: 'Mergulho em Noronha', description: 'Águas cristalinas com tartarugas, tubarões e corais.', peakMonths: [9, 10, 11], rating: 4.9, lat: -3.8500, lng: -32.4300, imageEmoji: '🤿', avgCostPerPerson: 350, category: 'entretenimento' },
    { id: 'trilha-atalaia', name: 'Trilha do Atalaia', description: 'Trilha com piscinas naturais e vida marinha.', peakMonths: [8, 9, 10, 11, 12], rating: 4.8, lat: -3.8690, lng: -32.4150, imageEmoji: '🥾', avgCostPerPerson: 0, category: 'trilha' },
    { id: 'morro-pico', name: 'Morro do Pico', description: 'Cartão-postal do arquipélago com 323m de altura.', peakMonths: [8, 9, 10, 11, 12], rating: 4.7, lat: -3.8410, lng: -32.4080, imageEmoji: '🏔️', avgCostPerPerson: 0, category: 'turismo' },
    { id: 'surf-noronha', name: 'Surf na Cacimba do Padre', description: 'Ondas tubulares famosas mundialmente.', peakMonths: [12, 1, 2, 3], rating: 4.6, lat: -3.8550, lng: -32.4350, imageEmoji: '🏄', avgCostPerPerson: 100, category: 'entretenimento' },
    { id: 'forte-remedios', name: 'Forte dos Remédios', description: 'Ruínas históricas com vista deslumbrante do pôr do sol.', peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], rating: 4.7, lat: -3.8390, lng: -32.4110, imageEmoji: '🏰', avgCostPerPerson: 0, category: 'turismo' },
  ],
  'porto-galinhas': [
    { id: 'piscinas-naturais-pg', name: 'Piscinas Naturais', description: 'Piscinas formadas por recifes com peixes coloridos.', peakMonths: [10, 11, 12, 1, 2], rating: 4.8, lat: -8.5010, lng: -35.0020, imageEmoji: '🐠', avgCostPerPerson: 40, category: 'praia', imageUrl: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?w=400' },
    { id: 'praia-muro-alto', name: 'Praia de Muro Alto', description: 'Praia com piscina natural de 2,5km e águas calmas.', peakMonths: [10, 11, 12, 1, 2, 3], rating: 4.6, lat: -8.4250, lng: -34.9800, imageEmoji: '🏖️', avgCostPerPerson: 0, category: 'praia' },
    { id: 'jangada-pg', name: 'Passeio de Jangada', description: 'Jangada até as piscinas naturais com guia.', peakMonths: [10, 11, 12, 1, 2], rating: 4.7, lat: -8.5015, lng: -35.0030, imageEmoji: '⛵', avgCostPerPerson: 30, category: 'turismo' },
    { id: 'buggy-pg', name: 'Passeio de Buggy', description: 'Tour pelas praias do litoral sul em buggy.', peakMonths: [10, 11, 12, 1, 2, 3], rating: 4.5, lat: -8.5050, lng: -35.0050, imageEmoji: '🚗', avgCostPerPerson: 80, category: 'entretenimento' },
    { id: 'trilha-cupe', name: 'Trilha de Cupe', description: 'Caminhada pela mata até praias desertas.', peakMonths: [4, 5, 6, 7, 8, 9], rating: 4.3, lat: -8.4600, lng: -34.9900, imageEmoji: '🥾', avgCostPerPerson: 0, category: 'trilha' },
  ],
  caruaru: [
    { id: 'feira-caruaru', name: 'Feira de Caruaru', description: 'Patrimônio imaterial da humanidade pela UNESCO.', peakMonths: [6], rating: 4.6, lat: -8.2820, lng: -35.9750, imageEmoji: '🛍️', avgCostPerPerson: 0, category: 'cultura' },
    { id: 'alto-moura', name: 'Alto do Moura', description: 'Maior centro de artes figurativas das Américas.', peakMonths: [6, 7], rating: 4.5, lat: -8.2470, lng: -35.9580, imageEmoji: '🎨', avgCostPerPerson: 10, category: 'cultura' },
    { id: 'sao-joao-caruaru', name: 'São João de Caruaru', description: 'Maior São João do mundo com shows e quadrilhas.', peakMonths: [6], rating: 4.9, lat: -8.2800, lng: -35.9760, imageEmoji: '🎶', avgCostPerPerson: 0, category: 'entretenimento' },
    { id: 'museu-barro', name: 'Museu do Barro', description: 'Acervo de cerâmicas e arte popular nordestina.', peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], rating: 4.3, lat: -8.2780, lng: -35.9730, imageEmoji: '🏺', avgCostPerPerson: 5, category: 'cultura' },
    { id: 'paintball-caruaru', name: 'Paintball Agreste', description: 'Campo temático no agreste com cenários de sítio.', peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], rating: 4.2, lat: -8.2900, lng: -35.9800, imageEmoji: '🎯', avgCostPerPerson: 70, category: 'entretenimento' },
  ],
  gravata: [
    { id: 'pedra-comprida', name: 'Pedra Comprida', description: 'Trilha até ponto panorâmico com vista do agreste.', peakMonths: [6, 7, 8], rating: 4.5, lat: -8.2100, lng: -35.5700, imageEmoji: '🏔️', avgCostPerPerson: 0, category: 'trilha' },
    { id: 'trilha-russinha', name: 'Trilha da Russinha', description: 'Caminhada por mata atlântica com cachoeiras.', peakMonths: [5, 6, 7, 8, 9], rating: 4.4, lat: -8.2050, lng: -35.5650, imageEmoji: '🥾', avgCostPerPerson: 20, category: 'trilha' },
    { id: 'rota-gastronomica', name: 'Rota Gastronômica', description: 'Restaurantes de comida regional na serra.', peakMonths: [6, 7, 8, 12], rating: 4.6, lat: -8.2010, lng: -35.5640, imageEmoji: '🍽️', avgCostPerPerson: 60, category: 'turismo' },
    { id: 'aventura-gravata', name: 'Rapel e Tirolesa', description: 'Aventuras radicais nas serras do agreste.', peakMonths: [4, 5, 6, 7, 8, 9, 10], rating: 4.4, lat: -8.2080, lng: -35.5680, imageEmoji: '🧗', avgCostPerPerson: 100, category: 'entretenimento' },
  ],
  petrolina: [
    { id: 'vinhos-vale', name: 'Vinícolas do Vale do São Francisco', description: 'Degustação de vinhos tropicais únicos no mundo.', peakMonths: [7, 8, 9], rating: 4.7, lat: -9.3500, lng: -40.5000, imageEmoji: '🍷', avgCostPerPerson: 80, category: 'turismo' },
    { id: 'ilha-massangano', name: 'Ilha de Massangano', description: 'Ilha fluvial com comunidade quilombola e história.', peakMonths: [5, 6, 7, 8, 9, 10], rating: 4.3, lat: -9.3600, lng: -40.4900, imageEmoji: '🏝️', avgCostPerPerson: 30, category: 'cultura' },
    { id: 'catamara-sf', name: 'Catamarã pelo Rio São Francisco', description: 'Passeio de barco pelo Velho Chico ao pôr do sol.', peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], rating: 4.6, lat: -9.3880, lng: -40.5020, imageEmoji: '⛵', avgCostPerPerson: 50, category: 'turismo' },
  ],
  garanhuns: [
    { id: 'festival-inverno', name: 'Festival de Inverno', description: 'Maior festival de inverno do Nordeste com shows e cultura.', peakMonths: [7], rating: 4.8, lat: -8.8830, lng: -36.4960, imageEmoji: '🎵', avgCostPerPerson: 0, category: 'entretenimento' },
    { id: 'mundau', name: 'Serra de Mundaú', description: 'Trilhas com mata atlântica e mirantes naturais.', peakMonths: [5, 6, 7, 8, 9], rating: 4.4, lat: -8.8900, lng: -36.5000, imageEmoji: '🌿', avgCostPerPerson: 0, category: 'trilha' },
    { id: 'parque-ruber-van-der-linden', name: 'Parque Ruber van der Linden', description: 'Área verde no centro com lago e trilhas.', peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], rating: 4.2, lat: -8.8820, lng: -36.4950, imageEmoji: '🌳', avgCostPerPerson: 0, category: 'natureza' },
  ],
  'serra-talhada': [
    { id: 'museu-lampiao', name: 'Museu do Cangaço', description: 'Acervo sobre Lampião e a história do cangaço.', peakMonths: [6, 7, 8], rating: 4.3, lat: -7.9860, lng: -38.2950, imageEmoji: '🤠', avgCostPerPerson: 10, category: 'cultura' },
    { id: 'serra-talhada-trilha', name: 'Trilha da Serra', description: 'Caminhada com vegetação de caatinga e mirantes.', peakMonths: [5, 6, 7, 8], rating: 4.1, lat: -7.9900, lng: -38.3000, imageEmoji: '🥾', avgCostPerPerson: 0, category: 'trilha' },
  ],
  'cabo-santo-agostinho': [
    { id: 'praia-calhetas', name: 'Praia de Calhetas', description: 'Praia paradisíaca entre falésias com piscinas naturais.', peakMonths: [10, 11, 12, 1, 2, 3], rating: 4.7, lat: -8.2900, lng: -34.9500, imageEmoji: '🏖️', avgCostPerPerson: 0, category: 'praia' },
    { id: 'trilha-cabo', name: 'Trilha das Falésias', description: 'Caminhada pelas falésias com vista para o mar.', peakMonths: [8, 9, 10, 11, 12], rating: 4.5, lat: -8.2850, lng: -34.9550, imageEmoji: '🥾', avgCostPerPerson: 0, category: 'trilha' },
    { id: 'forte-nazare', name: 'Forte de Nazaré', description: 'Fortaleza histórica com vista panorâmica do litoral.', peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], rating: 4.3, lat: -8.2870, lng: -34.9520, imageEmoji: '🏰', avgCostPerPerson: 0, category: 'turismo' },
  ],
  tamandare: [
    { id: 'praia-carneiros', name: 'Praia dos Carneiros', description: 'Uma das praias mais bonitas do Brasil com igrejinha à beira-mar.', peakMonths: [10, 11, 12, 1, 2, 3], rating: 4.9, lat: -8.7200, lng: -35.0800, imageEmoji: '⛪', avgCostPerPerson: 20, category: 'praia' },
    { id: 'catamara-carneiros', name: 'Catamarã em Carneiros', description: 'Passeio de catamarã pelos manguezais e praias.', peakMonths: [10, 11, 12, 1, 2], rating: 4.6, lat: -8.7250, lng: -35.0850, imageEmoji: '⛵', avgCostPerPerson: 60, category: 'turismo' },
  ],
  goiana: [
    { id: 'igreja-goiana', name: 'Igrejas Barrocas de Goiana', description: 'Conjunto de igrejas históricas do período colonial.', peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], rating: 4.2, lat: -7.5600, lng: -35.0020, imageEmoji: '⛪', avgCostPerPerson: 0, category: 'cultura' },
    { id: 'praia-carne-vaca', name: 'Praia de Carne de Vaca', description: 'Praia tranquila com piscinas naturais no litoral norte.', peakMonths: [10, 11, 12, 1, 2], rating: 4.3, lat: -7.5100, lng: -34.8400, imageEmoji: '🏖️', avgCostPerPerson: 0, category: 'praia' },
  ],
};

export const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const monthEmojis = ['☀️', '🎭', '🌧️', '🍂', '🌸', '❄️', '🎿', '🌾', '🍁', '🎃', '🌤️', '🎄'];

export const transportOptions = [
  { id: 'onibus', label: 'Ônibus', emoji: '🚌', desc: 'Econômico e com diversas rotas' },
  { id: 'carro', label: 'Carro', emoji: '🚗', desc: 'Flexibilidade total no trajeto' },
  { id: 'moto', label: 'Moto', emoji: '🏍️', desc: 'Agilidade e economia no deslocamento' },
  { id: 'bicicleta', label: 'Bicicleta', emoji: '🚲', desc: 'Ecológico e aventureiro' },
];

export const localTransportOptions = [
  { id: 'publico', label: 'Transporte Público', emoji: '🚇', desc: 'Metrô e ônibus locais', avgCost: 'R$ 5-15/viagem', avgTime: '30-60 min' },
  { id: 'taxi', label: 'Táxi / Uber', emoji: '🚕', desc: 'Conforto porta a porta', avgCost: 'R$ 20-80/viagem', avgTime: '15-40 min' },
  { id: 'aluguel', label: 'Aluguel de Carro', emoji: '🚗', desc: 'Liberdade total', avgCost: 'R$ 150-300/dia', avgTime: '10-30 min' },
  { id: 'bicicleta', label: 'Bicicleta', emoji: '🚲', desc: 'Ecológico e saudável', avgCost: 'R$ 10-30/dia', avgTime: '15-45 min' },
];

export const budgetRanges = [
  { id: 'economico', label: 'Econômico', range: 'R$ 500 - R$ 1.500', min: 500, max: 1500, emoji: '💰', description: 'Hostels, transporte público, comida local' },
  { id: 'moderado', label: 'Moderado', range: 'R$ 1.500 - R$ 3.000', min: 1500, max: 3000, emoji: '💳', description: 'Hotéis 3★, bons restaurantes, passeios' },
  { id: 'confortavel', label: 'Confortável', range: 'R$ 3.000 - R$ 6.000', min: 3000, max: 6000, emoji: '✨', description: 'Hotéis 4★, experiências premium' },
  { id: 'premium', label: 'Premium', range: 'R$ 6.000 - R$ 10.000', min: 6000, max: 10000, emoji: '👑', description: 'Hotéis 5★, passeios exclusivos, conforto total' },
  { id: 'luxo', label: 'Luxo', range: 'R$ 10.000+', min: 10000, max: 50000, emoji: '💎', description: 'Sem limites, experiências únicas' },
];

export const categoryLabels: Record<string, string> = {
  turismo: '📍 Turismo',
  praia: '🏖️ Praia',
  trilha: '🥾 Trilha',
  entretenimento: '🎯 Entretenimento',
  cultura: '🎨 Cultura',
  natureza: '🌿 Natureza',
};

import type { TouristSpot, AccommodationDetail, RestaurantDetail, StateData } from '@/types/travel';

export const brazilianStates: StateData[] = [
  { id: 'AC', name: 'Acre', region: 'Norte', demand: 'low', demandLabel: 'Baixa procura', description: 'Floresta amazônica e ecoturismo.', imageEmoji: '🌿' },
  { id: 'AL', name: 'Alagoas', region: 'Nordeste', demand: 'moderate', demandLabel: 'Moderada', description: 'Praias de águas cristalinas e piscinas naturais.', imageEmoji: '🏖️' },
  { id: 'AP', name: 'Amapá', region: 'Norte', demand: 'low', demandLabel: 'Baixa procura', description: 'Fortaleza de Macapá e biodiversidade.', imageEmoji: '🏰' },
  { id: 'AM', name: 'Amazonas', region: 'Norte', demand: 'moderate', demandLabel: 'Moderada', description: 'Encontro das Águas e floresta amazônica.', imageEmoji: '🌳' },
  { id: 'BA', name: 'Bahia', region: 'Nordeste', demand: 'high', demandLabel: 'Alta procura', description: 'Praias paradisíacas e cultura afro-brasileira.', imageEmoji: '🥁' },
  { id: 'CE', name: 'Ceará', region: 'Nordeste', demand: 'high', demandLabel: 'Alta procura', description: 'Jericoacoara, Beach Park e falésias.', imageEmoji: '🏜️' },
  { id: 'DF', name: 'Distrito Federal', region: 'Centro-Oeste', demand: 'moderate', demandLabel: 'Moderada', description: 'Arquitetura de Niemeyer e política.', imageEmoji: '🏛️' },
  { id: 'ES', name: 'Espírito Santo', region: 'Sudeste', demand: 'low', demandLabel: 'Baixa procura', description: 'Praias, montanhas e Convento da Penha.', imageEmoji: '⛪' },
  { id: 'GO', name: 'Goiás', region: 'Centro-Oeste', demand: 'low', demandLabel: 'Baixa procura', description: 'Chapada dos Veadeiros e Pirenópolis.', imageEmoji: '🌄' },
  { id: 'MA', name: 'Maranhão', region: 'Nordeste', demand: 'high', demandLabel: 'Alta procura', description: 'Lençóis Maranhenses e São Luís histórica.', imageEmoji: '🏝️' },
  { id: 'MT', name: 'Mato Grosso', region: 'Centro-Oeste', demand: 'low', demandLabel: 'Baixa procura', description: 'Pantanal e Chapada dos Guimarães.', imageEmoji: '🐊' },
  { id: 'MS', name: 'Mato Grosso do Sul', region: 'Centro-Oeste', demand: 'moderate', demandLabel: 'Moderada', description: 'Bonito e flutuação em rios cristalinos.', imageEmoji: '🐟' },
  { id: 'MG', name: 'Minas Gerais', region: 'Sudeste', demand: 'high', demandLabel: 'Alta procura', description: 'Cidades históricas, queijos e cachoeiras.', imageEmoji: '⛰️' },
  { id: 'PA', name: 'Pará', region: 'Norte', demand: 'moderate', demandLabel: 'Moderada', description: 'Belém, Alter do Chão e cultura ribeirinha.', imageEmoji: '🍲' },
  { id: 'PB', name: 'Paraíba', region: 'Nordeste', demand: 'low', demandLabel: 'Baixa procura', description: 'João Pessoa, ponto mais oriental das Américas.', imageEmoji: '🌅' },
  { id: 'PR', name: 'Paraná', region: 'Sul', demand: 'high', demandLabel: 'Alta procura', description: 'Cataratas do Iguaçu e Curitiba inovadora.', imageEmoji: '💧' },
  { id: 'PE', name: 'Pernambuco', region: 'Nordeste', demand: 'high', demandLabel: 'Alta procura', description: 'Fernando de Noronha e Recife Antigo.', imageEmoji: '🐢' },
  { id: 'PI', name: 'Piauí', region: 'Nordeste', demand: 'low', demandLabel: 'Baixa procura', description: 'Serra da Capivara e Delta do Parnaíba.', imageEmoji: '🦕' },
  { id: 'RJ', name: 'Rio de Janeiro', region: 'Sudeste', demand: 'high', demandLabel: 'Alta procura', description: 'Cristo Redentor, praias e samba.', imageEmoji: '🏖️' },
  { id: 'RN', name: 'Rio Grande do Norte', region: 'Nordeste', demand: 'moderate', demandLabel: 'Moderada', description: 'Dunas de Genipabu e Pipa.', imageEmoji: '🐬' },
  { id: 'RS', name: 'Rio Grande do Sul', region: 'Sul', demand: 'moderate', demandLabel: 'Moderada', description: 'Serra Gaúcha, vinícolas e Gramado.', imageEmoji: '🍷' },
  { id: 'RO', name: 'Rondônia', region: 'Norte', demand: 'low', demandLabel: 'Baixa procura', description: 'Ecoturismo e Rio Madeira.', imageEmoji: '🛶' },
  { id: 'RR', name: 'Roraima', region: 'Norte', demand: 'low', demandLabel: 'Baixa procura', description: 'Monte Roraima e cultura indígena.', imageEmoji: '🏔️' },
  { id: 'SC', name: 'Santa Catarina', region: 'Sul', demand: 'high', demandLabel: 'Alta procura', description: 'Floripa, Balneário Camboriú e praias.', imageEmoji: '🎡' },
  { id: 'SP', name: 'São Paulo', region: 'Sudeste', demand: 'high', demandLabel: 'Alta procura', description: 'Gastronomia, arte, museus e vida noturna.', imageEmoji: '🏙️' },
  { id: 'SE', name: 'Sergipe', region: 'Nordeste', demand: 'low', demandLabel: 'Baixa procura', description: 'Cânion de Xingó e praias desertas.', imageEmoji: '🏜️' },
  { id: 'TO', name: 'Tocantins', region: 'Norte', demand: 'low', demandLabel: 'Baixa procura', description: 'Jalapão e dunas douradas.', imageEmoji: '🏕️' },
];

export const touristSpotsByState: Record<string, TouristSpot[]> = {
  RJ: [
    { id: 'cristo', name: 'Cristo Redentor', description: 'Uma das 7 Maravilhas do Mundo Moderno no Corcovado.', peakMonths: [6, 7, 8, 12], rating: 4.8, lat: -22.9519, lng: -43.2105, imageEmoji: '⛪', avgCostPerPerson: 80, imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400' },
    { id: 'pao-acucar', name: 'Pão de Açúcar', description: 'Bondinho com vista panorâmica da Baía de Guanabara.', peakMonths: [5, 6, 7, 8], rating: 4.7, lat: -22.9492, lng: -43.1545, imageEmoji: '🏔️', avgCostPerPerson: 120, imageUrl: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=400' },
    { id: 'copacabana', name: 'Praia de Copacabana', description: 'A praia mais famosa do mundo com calçadão icônico.', peakMonths: [12, 1, 2, 3], rating: 4.5, lat: -22.9711, lng: -43.1823, imageEmoji: '🏖️', avgCostPerPerson: 0, imageUrl: 'https://images.unsplash.com/photo-1560457099-64cb8e6e7fce?w=400' },
    { id: 'lapa', name: 'Arcos da Lapa', description: 'Vida noturna, samba e cultura boêmia.', peakMonths: [2, 3, 6, 7], rating: 4.3, lat: -22.9133, lng: -43.1799, imageEmoji: '🎵', avgCostPerPerson: 50, imageUrl: 'https://images.unsplash.com/photo-1554168848-228452c09d60?w=400' },
    { id: 'tijuca', name: 'Floresta da Tijuca', description: 'Maior floresta urbana do mundo com trilhas e cachoeiras.', peakMonths: [4, 5, 6, 7, 8, 9], rating: 4.6, lat: -22.9535, lng: -43.2823, imageEmoji: '🌿', avgCostPerPerson: 0 },
    { id: 'maracana', name: 'Estádio Maracanã', description: 'Templo do futebol mundial com tours guiados.', peakMonths: [3, 4, 5, 6, 7, 8, 9, 10, 11], rating: 4.5, lat: -22.9121, lng: -43.2302, imageEmoji: '⚽', avgCostPerPerson: 65 },
  ],
  BA: [
    { id: 'pelourinho', name: 'Pelourinho', description: 'Centro histórico com arquitetura colonial colorida.', peakMonths: [2, 6, 7, 12], rating: 4.6, lat: -12.9714, lng: -38.5124, imageEmoji: '🏛️', avgCostPerPerson: 0, imageUrl: 'https://images.unsplash.com/photo-1551410224-699683e15636?w=400' },
    { id: 'praia-forte', name: 'Praia do Forte', description: 'Vila com projeto Tamar e piscinas naturais.', peakMonths: [12, 1, 2, 7], rating: 4.5, lat: -12.5730, lng: -38.0003, imageEmoji: '🐢', avgCostPerPerson: 30 },
    { id: 'chapada', name: 'Chapada Diamantina', description: 'Trilhas, cachoeiras e grutas deslumbrantes.', peakMonths: [5, 6, 7, 8, 9], rating: 4.9, lat: -12.4253, lng: -41.3610, imageEmoji: '🌄', avgCostPerPerson: 150, imageUrl: 'https://images.unsplash.com/photo-1622561865782-2a04f1523471?w=400' },
    { id: 'morro-sp', name: 'Morro de São Paulo', description: 'Ilha sem carros com praias paradisíacas.', peakMonths: [12, 1, 2, 3, 7], rating: 4.7, lat: -13.3811, lng: -38.9111, imageEmoji: '🏝️', avgCostPerPerson: 50 },
    { id: 'itacare', name: 'Itacaré', description: 'Surf, trilhas e praias selvagens no sul da Bahia.', peakMonths: [12, 1, 2, 3], rating: 4.6, lat: -14.2787, lng: -38.9967, imageEmoji: '🏄', avgCostPerPerson: 40 },
  ],
  CE: [
    { id: 'jeri', name: 'Jericoacoara', description: 'Dunas, lagoas e pôr do sol na Duna do Pôr do Sol.', peakMonths: [7, 8, 9, 10, 11], rating: 4.9, lat: -2.7963, lng: -40.5114, imageEmoji: '🏜️', avgCostPerPerson: 100, imageUrl: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?w=400' },
    { id: 'canoa', name: 'Canoa Quebrada', description: 'Falésias coloridas e vida noturna na Broadway.', peakMonths: [8, 9, 10, 11], rating: 4.4, lat: -4.4298, lng: -37.4741, imageEmoji: '🌅', avgCostPerPerson: 30 },
    { id: 'beach-park', name: 'Beach Park', description: 'Maior parque aquático da América Latina.', peakMonths: [1, 7, 12], rating: 4.6, lat: -3.8411, lng: -38.4085, imageEmoji: '🎢', avgCostPerPerson: 280 },
    { id: 'cumbuco', name: 'Cumbuco', description: 'Capital do kitesurf no Brasil.', peakMonths: [8, 9, 10, 11], rating: 4.5, lat: -3.6267, lng: -38.7333, imageEmoji: '🪁', avgCostPerPerson: 60 },
  ],
  SC: [
    { id: 'floripa', name: 'Florianópolis', description: 'Ilha da Magia com 42 praias incríveis.', peakMonths: [12, 1, 2, 3], rating: 4.7, lat: -27.5954, lng: -48.5480, imageEmoji: '🏝️', avgCostPerPerson: 0, imageUrl: 'https://images.unsplash.com/photo-1590845947376-2638caa89309?w=400' },
    { id: 'bc', name: 'Balneário Camboriú', description: 'Roda gigante, teleférico e vida noturna.', peakMonths: [12, 1, 2], rating: 4.5, lat: -26.9906, lng: -48.6348, imageEmoji: '🎡', avgCostPerPerson: 80 },
    { id: 'blumenau', name: 'Blumenau', description: 'Arquitetura alemã e Oktoberfest.', peakMonths: [10], rating: 4.3, lat: -26.9194, lng: -49.0661, imageEmoji: '🍺', avgCostPerPerson: 50 },
    { id: 'bombinhas', name: 'Bombinhas', description: 'Mergulho e praias de águas transparentes.', peakMonths: [12, 1, 2, 3], rating: 4.6, lat: -27.1378, lng: -48.5147, imageEmoji: '🤿', avgCostPerPerson: 40 },
  ],
  SP: [
    { id: 'paulista', name: 'Avenida Paulista', description: 'Coração cultural e financeiro de São Paulo.', peakMonths: [3, 4, 5, 6, 7, 8, 9, 10], rating: 4.5, lat: -23.5613, lng: -46.6560, imageEmoji: '🏙️', avgCostPerPerson: 0, imageUrl: 'https://images.unsplash.com/photo-1543059080-0dff1b5e58d8?w=400' },
    { id: 'ibirapuera', name: 'Parque Ibirapuera', description: 'Maior parque urbano da cidade.', peakMonths: [4, 5, 6, 7, 8, 9], rating: 4.7, lat: -23.5874, lng: -46.6576, imageEmoji: '🌳', avgCostPerPerson: 0 },
    { id: 'pinacoteca', name: 'Pinacoteca do Estado', description: 'Museu de arte mais antigo de São Paulo.', peakMonths: [3, 4, 5, 6, 7, 8, 9, 10, 11], rating: 4.7, lat: -23.5344, lng: -46.6336, imageEmoji: '🎨', avgCostPerPerson: 30 },
    { id: 'mercadao', name: 'Mercado Municipal', description: 'Mortadela, pastéis e frutas exóticas.', peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], rating: 4.5, lat: -23.5418, lng: -46.6298, imageEmoji: '🥐', avgCostPerPerson: 60 },
  ],
  MG: [
    { id: 'ouro-preto', name: 'Ouro Preto', description: 'Cidade barroca patrimônio da UNESCO.', peakMonths: [4, 5, 6, 7, 8], rating: 4.8, lat: -20.3856, lng: -43.5036, imageEmoji: '⛪', avgCostPerPerson: 50, imageUrl: 'https://images.unsplash.com/photo-1600107363560-a2400a3e03f9?w=400' },
    { id: 'inhotim', name: 'Inhotim', description: 'Maior museu a céu aberto da América Latina.', peakMonths: [3, 4, 5, 6, 7, 8, 9, 10], rating: 4.9, lat: -20.1261, lng: -44.2289, imageEmoji: '🎨', avgCostPerPerson: 50 },
    { id: 'capitolio', name: 'Capitólio', description: 'Cânions de Furnas e águas esmeraldas.', peakMonths: [5, 6, 7, 8, 9], rating: 4.7, lat: -20.6149, lng: -46.0503, imageEmoji: '🏞️', avgCostPerPerson: 120 },
    { id: 'tiradentes', name: 'Tiradentes', description: 'Cidade histórica com gastronomia e artesanato.', peakMonths: [4, 5, 6, 7, 8], rating: 4.6, lat: -21.1131, lng: -44.1750, imageEmoji: '🏘️', avgCostPerPerson: 0 },
    { id: 'serra-cipo', name: 'Serra do Cipó', description: 'Cachoeiras, trilhas e natureza exuberante.', peakMonths: [4, 5, 6, 7, 8, 9], rating: 4.7, lat: -19.3500, lng: -43.6167, imageEmoji: '🌊', avgCostPerPerson: 30 },
  ],
  PR: [
    { id: 'iguacu', name: 'Cataratas do Iguaçu', description: 'Uma das 7 Maravilhas Naturais do Mundo.', peakMonths: [3, 4, 8, 9, 10, 11], rating: 4.9, lat: -25.6953, lng: -54.4367, imageEmoji: '💧', avgCostPerPerson: 80, imageUrl: 'https://images.unsplash.com/photo-1586244439413-bc2288941dda?w=400' },
    { id: 'curitiba-jardim', name: 'Jardim Botânico de Curitiba', description: 'Estufa de ferro e vidro em estilo art nouveau.', peakMonths: [3, 4, 5, 9, 10, 11], rating: 4.7, lat: -25.4428, lng: -49.2395, imageEmoji: '🌺', avgCostPerPerson: 0 },
    { id: 'ilha-mel', name: 'Ilha do Mel', description: 'Paraíso ecológico sem carros no litoral.', peakMonths: [12, 1, 2, 3], rating: 4.6, lat: -25.5487, lng: -48.3207, imageEmoji: '🏝️', avgCostPerPerson: 20 },
  ],
  PE: [
    { id: 'noronha', name: 'Fernando de Noronha', description: 'Arquipélago com as praias mais bonitas do Brasil.', peakMonths: [8, 9, 10, 11, 12], rating: 4.9, lat: -3.8547, lng: -32.4247, imageEmoji: '🐢', avgCostPerPerson: 200, imageUrl: 'https://images.unsplash.com/photo-1580060195710-6ea6d306aa36?w=400' },
    { id: 'recife-antigo', name: 'Recife Antigo', description: 'Centro histórico com Marco Zero e museus.', peakMonths: [2, 6, 7, 12], rating: 4.4, lat: -8.0631, lng: -34.8711, imageEmoji: '🏛️', avgCostPerPerson: 0 },
    { id: 'porto-galinhas', name: 'Porto de Galinhas', description: 'Piscinas naturais e jangadas.', peakMonths: [10, 11, 12, 1, 2], rating: 4.7, lat: -8.5028, lng: -35.0056, imageEmoji: '🏖️', avgCostPerPerson: 40 },
    { id: 'olinda', name: 'Olinda', description: 'Ladeiras históricas e o melhor carnaval de rua.', peakMonths: [2, 3, 6, 7], rating: 4.5, lat: -8.0089, lng: -34.8553, imageEmoji: '🎭', avgCostPerPerson: 0 },
  ],
  RS: [
    { id: 'gramado', name: 'Gramado', description: 'Cidade europeia no Brasil com chocolate e fondue.', peakMonths: [6, 7, 8, 12], rating: 4.7, lat: -29.3749, lng: -50.8769, imageEmoji: '🍫', avgCostPerPerson: 80, imageUrl: 'https://images.unsplash.com/photo-1626267728913-c8ab03120f18?w=400' },
    { id: 'canela', name: 'Canela', description: 'Cascata do Caracol e parques temáticos.', peakMonths: [6, 7, 8], rating: 4.5, lat: -29.3656, lng: -50.8128, imageEmoji: '🌲', avgCostPerPerson: 50 },
    { id: 'bento', name: 'Bento Gonçalves', description: 'Capital da uva e do vinho com Vale dos Vinhedos.', peakMonths: [2, 3, 6, 7], rating: 4.6, lat: -29.1699, lng: -51.5184, imageEmoji: '🍷', avgCostPerPerson: 100 },
    { id: 'aparados', name: 'Aparados da Serra', description: 'Cânion Itaimbezinho e trilhas espetaculares.', peakMonths: [4, 5, 6, 7, 8, 9, 10], rating: 4.8, lat: -29.1747, lng: -50.0842, imageEmoji: '🏞️', avgCostPerPerson: 40 },
  ],
  MA: [
    { id: 'lencois', name: 'Lençóis Maranhenses', description: 'Dunas e lagoas cristalinas únicas no mundo.', peakMonths: [6, 7, 8, 9], rating: 4.9, lat: -2.4833, lng: -43.1167, imageEmoji: '🏝️', avgCostPerPerson: 150, imageUrl: 'https://images.unsplash.com/photo-1601379329542-31c59347e2b8?w=400' },
    { id: 'sao-luis', name: 'São Luís Centro Histórico', description: 'Azulejos portugueses e reggae maranhense.', peakMonths: [6, 7, 8, 9, 10], rating: 4.5, lat: -2.5297, lng: -44.2825, imageEmoji: '🎶', avgCostPerPerson: 0 },
  ],
  AL: [
    { id: 'maragogi', name: 'Maragogi', description: 'Caribe brasileiro com galés e piscinas naturais.', peakMonths: [10, 11, 12, 1, 2, 3], rating: 4.7, lat: -9.0122, lng: -35.2226, imageEmoji: '🐠', avgCostPerPerson: 80 },
    { id: 'sao-miguel', name: 'São Miguel dos Milagres', description: 'Praias desertas e coqueirais.', peakMonths: [10, 11, 12, 1, 2], rating: 4.8, lat: -9.2656, lng: -35.3778, imageEmoji: '🌴', avgCostPerPerson: 50 },
  ],
  AM: [
    { id: 'encontro-aguas', name: 'Encontro das Águas', description: 'Rio Negro e Solimões se encontram sem se misturar.', peakMonths: [6, 7, 8, 9, 10], rating: 4.8, lat: -3.1300, lng: -59.8867, imageEmoji: '🌊', avgCostPerPerson: 120 },
    { id: 'teatro-amazonas', name: 'Teatro Amazonas', description: 'Ópera no coração da floresta amazônica.', peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], rating: 4.7, lat: -3.1302, lng: -60.0233, imageEmoji: '🎭', avgCostPerPerson: 20 },
  ],
  MS: [
    { id: 'bonito', name: 'Bonito', description: 'Flutuação em rios cristalinos e grutas.', peakMonths: [12, 1, 2, 3, 4], rating: 4.9, lat: -21.1267, lng: -56.4847, imageEmoji: '🐟', avgCostPerPerson: 200, imageUrl: 'https://images.unsplash.com/photo-1583225173760-4cf14f4dbb2d?w=400' },
    { id: 'pantanal-ms', name: 'Pantanal Sul', description: 'Safári fotográfico e vida selvagem.', peakMonths: [7, 8, 9, 10], rating: 4.8, lat: -19.5820, lng: -57.0003, imageEmoji: '🐊', avgCostPerPerson: 300 },
  ],
  GO: [
    { id: 'chapada-veadeiros', name: 'Chapada dos Veadeiros', description: 'Cachoeiras, cristais e trilhas no cerrado.', peakMonths: [5, 6, 7, 8], rating: 4.8, lat: -14.1000, lng: -47.6000, imageEmoji: '🌄', avgCostPerPerson: 60 },
    { id: 'pirenopolis', name: 'Pirenópolis', description: 'Cidade histórica com cachoeiras e gastronomia.', peakMonths: [5, 6, 7, 8], rating: 4.5, lat: -15.8508, lng: -49.0000, imageEmoji: '🏘️', avgCostPerPerson: 30 },
  ],
  RN: [
    { id: 'pipa', name: 'Praia da Pipa', description: 'Falésias, golfinhos e Baía dos Golfinhos.', peakMonths: [9, 10, 11, 12, 1], rating: 4.7, lat: -6.2286, lng: -35.0444, imageEmoji: '🐬', avgCostPerPerson: 30 },
    { id: 'genipabu', name: 'Dunas de Genipabu', description: 'Passeio de buggy e dromedário.', peakMonths: [9, 10, 11, 12], rating: 4.5, lat: -5.6844, lng: -35.2247, imageEmoji: '🐪', avgCostPerPerson: 100 },
  ],
  PA: [
    { id: 'alter-chao', name: 'Alter do Chão', description: 'Caribe amazônico com praias de rio.', peakMonths: [8, 9, 10, 11], rating: 4.7, lat: -2.5014, lng: -54.9528, imageEmoji: '🏖️', avgCostPerPerson: 40 },
    { id: 'belem-centro', name: 'Ver-o-Peso', description: 'Maior feira ao ar livre da América Latina.', peakMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], rating: 4.5, lat: -1.4536, lng: -48.5025, imageEmoji: '🍲', avgCostPerPerson: 0 },
  ],
  TO: [
    { id: 'jalapao', name: 'Jalapão', description: 'Fervedouros, dunas douradas e cachoeiras.', peakMonths: [5, 6, 7, 8, 9], rating: 4.8, lat: -10.5667, lng: -46.9833, imageEmoji: '🏕️', avgCostPerPerson: 250 },
  ],
  DF: [
    { id: 'congresso', name: 'Congresso Nacional', description: 'Obra-prima de Niemeyer com visita guiada.', peakMonths: [3, 4, 5, 6, 7, 8, 9, 10], rating: 4.5, lat: -15.7997, lng: -47.8644, imageEmoji: '🏛️', avgCostPerPerson: 0 },
    { id: 'ponte-jk', name: 'Ponte JK', description: 'Arquitetura icônica sobre o Lago Paranoá.', peakMonths: [3, 4, 5, 6, 7, 8, 9, 10], rating: 4.4, lat: -15.8256, lng: -47.8306, imageEmoji: '🌉', avgCostPerPerson: 0 },
  ],
  PB: [
    { id: 'jp-ponta-seixas', name: 'Ponta do Seixas', description: 'Ponto mais oriental das Américas.', peakMonths: [10, 11, 12, 1, 2], rating: 4.3, lat: -7.1486, lng: -34.7950, imageEmoji: '🌅', avgCostPerPerson: 0 },
  ],
  MT: [
    { id: 'chapada-guimaraes', name: 'Chapada dos Guimarães', description: 'Paredões de arenito e cachoeiras.', peakMonths: [5, 6, 7, 8], rating: 4.6, lat: -15.4600, lng: -55.7500, imageEmoji: '🏜️', avgCostPerPerson: 40 },
  ],
  SE: [
    { id: 'xingo', name: 'Cânion de Xingó', description: 'Cânion esculpido pelo Rio São Francisco.', peakMonths: [9, 10, 11, 12, 1], rating: 4.7, lat: -9.6167, lng: -37.8000, imageEmoji: '🏞️', avgCostPerPerson: 100 },
  ],
  PI: [
    { id: 'serra-capivara', name: 'Serra da Capivara', description: 'Pinturas rupestres de 25.000 anos.', peakMonths: [5, 6, 7, 8], rating: 4.6, lat: -8.8333, lng: -42.5500, imageEmoji: '🦕', avgCostPerPerson: 60 },
    { id: 'delta-parnaiba', name: 'Delta do Parnaíba', description: 'Único delta em mar aberto das Américas.', peakMonths: [7, 8, 9, 10], rating: 4.7, lat: -2.9000, lng: -41.7667, imageEmoji: '🦜', avgCostPerPerson: 120 },
  ],
  ES: [
    { id: 'guarapari', name: 'Guarapari', description: 'Praias de areias monazíticas.', peakMonths: [12, 1, 2, 3], rating: 4.3, lat: -20.6614, lng: -40.4961, imageEmoji: '🏖️', avgCostPerPerson: 0 },
    { id: 'convento-penha', name: 'Convento da Penha', description: 'Santuário no topo de rochedo com vista para o mar.', peakMonths: [4, 5, 6, 7, 8], rating: 4.6, lat: -20.3281, lng: -40.2878, imageEmoji: '⛪', avgCostPerPerson: 0 },
  ],
  RO: [
    { id: 'rio-madeira', name: 'Rio Madeira', description: 'Passeios de barco e pesca esportiva.', peakMonths: [6, 7, 8, 9], rating: 4.2, lat: -8.7619, lng: -63.9039, imageEmoji: '🛶', avgCostPerPerson: 80 },
  ],
  RR: [
    { id: 'monte-roraima', name: 'Monte Roraima', description: 'Tepui lendário na tríplice fronteira.', peakMonths: [10, 11, 12, 1, 2], rating: 4.9, lat: 5.1433, lng: -60.7625, imageEmoji: '🏔️', avgCostPerPerson: 500 },
  ],
  AC: [
    { id: 'serra-divisor', name: 'Parque Serra do Divisor', description: 'Biodiversidade e fronteira com o Peru.', peakMonths: [5, 6, 7, 8], rating: 4.4, lat: -7.4500, lng: -73.6667, imageEmoji: '🌿', avgCostPerPerson: 200 },
  ],
  AP: [
    { id: 'fortaleza-macapa', name: 'Fortaleza de São José', description: 'Construção colonial portuguesa.', peakMonths: [7, 8, 9, 10], rating: 4.2, lat: 0.0333, lng: -51.0500, imageEmoji: '🏰', avgCostPerPerson: 10 },
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
    { id: 'aram-yami', name: 'Aram Yami Hotel', address: 'R. Conselheiro Pedro Luís, 1 - Rio Vermelho', rating: 4.5, pricePerNight: 450, safetyScore: 4.0, distanceToSpots: 2.0, lat: -13.0098, lng: -38.4825, type: 'Hotel Boutique' },
  ],
  CE: [
    { id: 'vila-kalango', name: 'Vila Kalango', address: 'R. do Forró, S/N - Jericoacoara', rating: 4.8, pricePerNight: 650, safetyScore: 4.5, distanceToSpots: 0.5, lat: -2.7950, lng: -40.5100, type: 'Pousada' },
    { id: 'ibis-fortaleza', name: 'Ibis Fortaleza Praia de Iracema', address: 'Av. Almirante Barroso, 650', rating: 3.8, pricePerNight: 200, safetyScore: 3.5, distanceToSpots: 3.0, lat: -3.7227, lng: -38.5200, type: 'Hotel 3★' },
  ],
  SC: [
    { id: 'majestic-floripa', name: 'Majestic Palace Hotel', address: 'Av. Beira Mar Norte, 2746 - Florianópolis', rating: 4.6, pricePerNight: 550, safetyScore: 4.5, distanceToSpots: 2.0, lat: -27.5850, lng: -48.5550, type: 'Hotel 4★' },
    { id: 'hostel-floripa', name: 'Backpackers Floripa', address: 'R. Duarte Schutel, 129 - Centro', rating: 4.2, pricePerNight: 80, safetyScore: 3.8, distanceToSpots: 1.5, lat: -27.5950, lng: -48.5500, type: 'Hostel' },
  ],
  SP: [
    { id: 'fasano-sp', name: 'Hotel Fasano São Paulo', address: 'R. Vittorio Fasano, 88 - Jardins', rating: 4.9, pricePerNight: 1500, safetyScore: 5.0, distanceToSpots: 0.8, lat: -23.5630, lng: -46.6680, type: 'Hotel 5★' },
    { id: 'ibis-paulista', name: 'Ibis Budget Paulista', address: 'R. da Consolação, 2303', rating: 3.7, pricePerNight: 180, safetyScore: 3.5, distanceToSpots: 0.5, lat: -23.5580, lng: -46.6620, type: 'Hotel 2★' },
  ],
  MG: [
    { id: 'solar-rosario', name: 'Hotel Solar do Rosário', address: 'R. Getúlio Vargas, 270 - Ouro Preto', rating: 4.7, pricePerNight: 450, safetyScore: 4.5, distanceToSpots: 0.3, lat: -20.3860, lng: -43.5040, type: 'Hotel Histórico' },
    { id: 'pousada-ouro', name: 'Pousada do Mondego', address: 'Largo de Coimbra, 38 - Ouro Preto', rating: 4.4, pricePerNight: 250, safetyScore: 4.2, distanceToSpots: 0.2, lat: -20.3850, lng: -43.5030, type: 'Pousada' },
  ],
  PR: [
    { id: 'belmond-iguacu', name: 'Belmond Hotel das Cataratas', address: 'BR-469, Km 32 - Foz do Iguaçu', rating: 4.9, pricePerNight: 1800, safetyScore: 5.0, distanceToSpots: 0.1, lat: -25.6960, lng: -54.4370, type: 'Resort 5★' },
    { id: 'ibis-foz', name: 'Ibis Foz do Iguaçu', address: 'R. Marechal Deodoro, 1531', rating: 3.8, pricePerNight: 200, safetyScore: 4.0, distanceToSpots: 15.0, lat: -25.5420, lng: -54.5880, type: 'Hotel 3★' },
  ],
  PE: [
    { id: 'pousada-maravilha', name: 'Pousada Maravilha', address: 'BR-363 - Fernando de Noronha', rating: 4.9, pricePerNight: 2500, safetyScore: 5.0, distanceToSpots: 0.5, lat: -3.8550, lng: -32.4250, type: 'Pousada Luxo' },
    { id: 'ibis-recife', name: 'Ibis Recife Boa Viagem', address: 'R. Félix de Brito e Melo, 382', rating: 3.9, pricePerNight: 220, safetyScore: 3.5, distanceToSpots: 5.0, lat: -8.1100, lng: -34.8960, type: 'Hotel 3★' },
  ],
  RS: [
    { id: 'casa-colina', name: 'Hotel Casa da Montanha', address: 'Av. Borges de Medeiros, 3166 - Gramado', rating: 4.7, pricePerNight: 600, safetyScore: 5.0, distanceToSpots: 0.5, lat: -29.3750, lng: -50.8770, type: 'Hotel 4★' },
    { id: 'pousada-gramado', name: 'Pousada Encantos da Terra', address: 'R. Garibaldi, 525 - Gramado', rating: 4.3, pricePerNight: 250, safetyScore: 4.5, distanceToSpots: 1.0, lat: -29.3760, lng: -50.8780, type: 'Pousada' },
  ],
  MA: [
    { id: 'pousada-lencois', name: 'Porto Preguiças Resort', address: 'Av. Beira Rio - Barreirinhas', rating: 4.5, pricePerNight: 400, safetyScore: 4.0, distanceToSpots: 3.0, lat: -2.7560, lng: -42.8270, type: 'Resort' },
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
  SP: [
    { id: 'a-casa-do-porco', name: 'A Casa do Porco', cuisine: 'Brasileira', rating: 4.9, priceRange: '$$$$', address: 'R. Araújo, 124 - República', lat: -23.5420, lng: -46.6450 },
    { id: 'maní', name: 'Maní', cuisine: 'Contemporânea', rating: 4.8, priceRange: '$$$$', address: 'R. Joaquim Antunes, 210 - Jardins', lat: -23.5670, lng: -46.6730 },
    { id: 'padaria-benjamin', name: 'Padaria Benjamin Abrahão', cuisine: 'Café & Padaria', rating: 4.5, priceRange: '$', address: 'R. Benjamin Constant, 1002', lat: -23.5400, lng: -46.6350 },
  ],
  CE: [
    { id: 'coco-bambu', name: 'Coco Bambu Fortaleza', cuisine: 'Frutos do Mar', rating: 4.6, priceRange: '$$$', address: 'R. Canuto de Aguiar, 1317', lat: -3.7350, lng: -38.5050 },
  ],
  MG: [
    { id: 'xapuri', name: 'Xapuri', cuisine: 'Mineira', rating: 4.7, priceRange: '$$', address: 'R. Mandacaru, 260 - Pampulha, BH', lat: -19.8530, lng: -43.9730 },
    { id: 'tragaluz', name: 'Tragaluz', cuisine: 'Contemporânea', rating: 4.6, priceRange: '$$$', address: 'R. Tomé de Souza, 1121 - BH', lat: -19.9350, lng: -43.9430 },
  ],
  SC: [
    { id: 'ostradamus', name: 'Ostradamus', cuisine: 'Frutos do Mar', rating: 4.6, priceRange: '$$$', address: 'Rod. Baldicero Filomeno, 7640 - Ribeirão da Ilha', lat: -27.7080, lng: -48.5650 },
  ],
  PR: [
    { id: 'madalosso', name: 'Madalosso', cuisine: 'Italiana', rating: 4.4, priceRange: '$$', address: 'Av. Manoel Ribas, 5875 - Santa Felicidade, Curitiba', lat: -25.3940, lng: -49.3220 },
  ],
  RS: [
    { id: 'bela-vista-gramado', name: 'Belle du Valais', cuisine: 'Fondue', rating: 4.7, priceRange: '$$$', address: 'Av. das Hortênsias, 1432 - Gramado', lat: -29.3760, lng: -50.8730 },
  ],
  PE: [
    { id: 'leite', name: 'Restaurante Leite', cuisine: 'Francesa/Brasileira', rating: 4.6, priceRange: '$$$$', address: 'Praça Joaquim Nabuco, 147 - Recife', lat: -8.0610, lng: -34.8730 },
  ],
  MA: [
    { id: 'cabana-sol', name: 'Cabana do Sol', cuisine: 'Maranhense', rating: 4.4, priceRange: '$$', address: 'Av. Litorânea - São Luís', lat: -2.4940, lng: -44.2650 },
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

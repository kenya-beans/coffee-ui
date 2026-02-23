export interface CoffeeProduct {
  id: string;
  name: string;
  region: string;
  elevation: string;
  process: string;
  roastLevel: 'Light' | 'Medium' | 'Dark';
  notes: string[];
  price: number;
  image: string;
  description: string;
  stock: number;
}

export const KENYAN_COFFEES: CoffeeProduct[] = [
  {
    id: 'nyeri-sl28',
    name: 'Nyeri Hill Estate SL28',
    region: 'Nyeri County',
    elevation: '1,800m',
    process: 'Washed',
    roastLevel: 'Light',
    notes: ['Blackcurrant', 'Hibiscus', 'Lime'],
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1677443144837-e80ccaa9555f',
    description: 'A classic Nyeri profile with intense acidity and deep berry sweetness. SL28 variety is known for its distinct blackcurrant profile.',
    stock: 45
  },
  {
    id: 'kirinyaga-pb',
    name: 'Kirinyaga Peaberry Special',
    region: 'Kirinyaga',
    elevation: '1,750m',
    process: 'Washed',
    roastLevel: 'Medium',
    notes: ['Grapefruit', 'Tomato Leaf', 'Maple'],
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1770081485131-d978211245aa',
    description: 'Peaberry beans are small, round beans formed when only one seed develops in the coffee cherry. They concentrate the flavor for a punchy experience.',
    stock: 22
  },
  {
    id: 'kiambu-sl34',
    name: 'Kiambu Plateau SL34',
    region: 'Kiambu',
    elevation: '1,900m',
    process: 'Natural',
    roastLevel: 'Medium',
    notes: ['Mango', 'Dark Chocolate', 'Molasses'],
    price: 26.00,
    image: 'https://images.unsplash.com/photo-1620472434832-b3ea9294e669',
    description: 'A rare naturally processed Kenyan coffee. This process emphasizes the fruit notes, giving it a heavy body and tropical sweetness.',
    stock: 15
  },
  {
    id: 'embu-k7',
    name: 'Embu Gakuyuni K7',
    region: 'Embu',
    elevation: '1,650m',
    process: 'Honey',
    roastLevel: 'Light',
    notes: ['Caramel', 'Orange', 'Floral'],
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1633627354173-1a26871e3204',
    description: 'The K7 variety is resistant to coffee leaf rust and produces a clean, floral cup with moderate acidity.',
    stock: 60
  }
];

export interface Order {
  id: string;
  customer: string;
  items: { productId: string; quantity: number }[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
}

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-7721',
    customer: 'Alice Johnson',
    items: [{ productId: 'nyeri-sl28', quantity: 2 }],
    total: 48.00,
    status: 'Shipped',
    date: '2026-02-18'
  },
  {
    id: 'ORD-8910',
    customer: 'Bob Smith',
    items: [{ productId: 'kiambu-sl34', quantity: 1 }],
    total: 26.00,
    status: 'Pending',
    date: '2026-02-19'
  }
];

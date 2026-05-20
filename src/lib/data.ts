export interface Mango {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  color: string;
  accent: string;
}

export const MANGOES: Mango[] = [
  {
    id: "alphonso",
    name: "Alphonso",
    price: 12.00,
    unit: "Dozen",
    description: "Rich, creamy, and tender saffron-colored flesh with an intense aroma. Sourced directly from Ratnagiri.",
    color: "bg-neo-yellow",
    accent: "bg-neo-orange"
  },
  {
    id: "ataulfo",
    name: "Ataulfo",
    price: 4.50,
    unit: "lb",
    description: "Sweet and spicy with a velvety, fiber-less texture and a vibrant yellow hue. Perfect for smooth purees.",
    color: "bg-neo-orange",
    accent: "bg-neo-yellow"
  },
  {
    id: "haden",
    name: "Haden",
    price: 3.75,
    unit: "lb",
    description: "A bold, sweet-tart classic with a rich crimson and green skin. Firm, juicy flesh ideal for slicing.",
    color: "bg-neo-teal",
    accent: "bg-neo-pink"
  },
  {
    id: "kesar",
    name: "Kesar",
    price: 15.00,
    unit: "Dozen",
    description: "Known as the 'Queen of Mangoes', with a distinct aroma and extremely sweet taste. Saffron-colored flesh.",
    color: "bg-neo-pink",
    accent: "bg-neo-purple"
  },
  {
    id: "kent",
    name: "Kent",
    price: 3.25,
    unit: "lb",
    description: "Large, oval-shaped with dark green skin and deep red blush. Sweet, juicy, and very little fiber.",
    color: "bg-neo-purple",
    accent: "bg-neo-teal"
  }
];

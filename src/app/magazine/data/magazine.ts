export interface Magazine {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  cover: string;
  description: string;
  pages: string[];
}

export const magazine: Magazine = {
  id: "latest",

  title: "തട്ടുംദളം",

  subtitle: "ഡിജിറ്റൽ മാഗസിൻ",

  price: 49,

  cover: "/images/magazine/cover.jpg",

  description:
    "വാർത്തകളും വിശേഷങ്ങളും അഭിമുഖങ്ങളും അറിവുകളും ഒരുമിക്കുന്ന ഒരു പുതിയ ഡിജിറ്റൽ വായനാനുഭവം.",

  pages: [
    "/magazine/cover.jpeg",
    "/magazine/pages/01.jpeg",
    "/magazine/pages/02.jpeg",
    "/magazine/pages/03.jpeg",
    
  ],
};
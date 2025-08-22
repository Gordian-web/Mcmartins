import React, { useState, useEffect } from 'react';
import { useCart } from '../cart/cartcontext'; // Make sure this path is correct
import shop from '../assets/shopping-basket (1).png';


// imported images shirts
import shoe from "../assets/color.jpg"
import nike from "../assets/sexy.jpg"
import nikee from "../assets/nice.jpg"
import sharp from "../assets/sharp.jpg"
import shirt from "../assets/shirt.jpg"
import golden from "../assets/golden.jpg"
import gold from "../assets/gold.jpg"
import gipty from "../assets/gipty.jpg"
import gbw from "../assets/gbw.jpg"
import relog from "../assets/relog.png.jpg"
import black from "../assets/black.jpg"
import men from "../assets/men.jpg"
import bangle from "../assets/bangle.jpg"
import soft from "../assets/soft.jpg"
import smooth from "../assets/smooth.jpg"
import cover from "../assets/cover.jpg"
import sweet from "../assets/sweet.jpg"
import nik from "../assets/thirdnike.png.jpg"
import nif from "../assets/secondnike.png.jpg"
import green from "../assets/green.jpg"
import yelloww from "../assets/yelloww.jpg"
import pink from "../assets/pink.jpg"
import bw from "../assets/bw.jpg"
import blue from "../assets/blue.jpg"
import red from "../assets/red.jpg"
import screen from "../assets/screen.jpg"
import rolex from "../assets/rolex.jpg"
import lv from "../assets/lv.jpg"
import tj from "../assets/tj.png"
import loui from "../assets/loui.jpg"
import brown from "../assets/brown.png"
import fourthnike from "../assets/fourthnike.png.jpg"
import coded from "../assets/coded.jpg"
import whitej from "../assets/timber.jpg"
import hublot from "../assets/hublot.jpg"
import bluelv from "../assets/bluelv.jpg"
import blacklv from "../assets/blacklv.jpg"
import ashlv from "../assets/ashlv.jpg"
import colorednik from "../assets/colorednik.png"
import blueoff from "../assets/blueoff.jpg"
import yellowoff from "../assets/yellowoff.jpg"
import whiteoff from "../assets/whiteoff.jpg"
import blackiee from "../assets/blackiee.jpg"
import dior from "../assets/dior.jpg"
import takeoff from "../assets/takeoff.jpg"
import bluelvv from "../assets/bluelvv.jpg"
import solid from "../assets/solid.jpg"
import rolexx from "../assets/rolexx.jpg"
import redoff from "../assets/redoff.jpg"
import rednike from "../assets/rednike.jpg"
import jnike from "../assets/nike.png"
import reddr from "../assets/redr.jpg"
import yellowdr from "../assets/yellowdr.jpg"
import balanciaga from "../assets/balanciaga.png"
import baca from "../assets/baca.png"
import jeans from "../assets/jeans.png"
import hoddy from "../assets/hoddie.png"
import hoodiee from "../assets/hoddiee.png"
import wrist from "../assets/watch.png"


// imported images shoes 
// Example product data
const products = [
  {
    id: 1,
    name: "Botanica white Bloom",
    price: "40.99",
    description: "A crisp white shirt detailed with bold,nature-inspired botanical prints.",
    image: shoe,
  },
  {
    id: 2,
    name: "midnight petal flow",
    price: "35.99",
    description: "A bold, expressive piece that adds effortless depth to any look-perfect for nights out or standout streetwear moments.",
    image: nike,
  },
  {
    id: 3,
    name: "spellbound patch",
    price: "30.99",
    description: "A fearless piece for those who dress to stand out and stir curiosity.",
    image: nikee,
  },
  {
    id: 4,
    name: "Ink Bloom aura",
    price: "30.99",
    description: "Artistic, fearless, and fluid-it's made for those who wear statements, not just clothes.",
    image: sharp,
  },
  {
    id: 5,
    name: "Concrete Bloom Tee",
    price: "45.99",
    description: "Featuring a washed grey base with subtle flower prints a sketch-style detailing.",
    image: shirt,
  },
  {
    id: 6,
    name: "Black petal flow",
    price: "49.99",
    description: "Bold ,edgy, and mystical - it fuses bandana prints, wizard motifs, and contrasting tones.",
    image: golden,
  },
  {
    id: 7,
    name: "Gold Black Bacilica",
    price: "59.99",
    description: "Elevate your look with the Gold Black Bacilica.",
    image: gold,
  },
  {
    id: 8,
    name: " white Bloom shirt",
    price: "39.99",
    description: "A crisp white shirt detailed with bold,nature-inspired botanical prints.",
    image: gipty,
  },
  {
    id: 9,
    name: "white Bloom aura",
    price: "75.99",
    description: "elevate your look with this stylish,detailed with bold,nature-inspired bloom aura.",
    image: gbw,
  },
  {
    id: 10,
    name: "Decasa Blackstrick loafers",
    price: "105.99",
    description: "it features a rugged sole,sleek marble-effect upper and bold stitched flap branding built for bold steps and street-luxe energy.",
    image: relog,
  },
  {
    id: 11,
    name: "classy Nike Blackstrick",
    price: "75.99",
    description: "these kicks are perfect for elavating both casual and formal looks with timeless elegance.",
    image: black,
  },
  {
    id: 12,
    name: "Luxe loafers",
    price: "150.99",
    description: "Featuring smooth leather, a sleek silhouette, and subtle stitching details,these loafers are perfect for elavating both casual and formal looks with timeless elegance.",
    image: men,
  },
  {
    id: 13,
    name: "Prada stormMesh",
    price: "150.99",
    description: "Elevate your looks with this Prada stormMesh classy shoe.",
    image: bangle,
  },
  {
    id: 14,
    name: "Phantom crest",
    price: "98.99",
    description: "Elevate your look with this phantom crest with stricking accents and sculped sole",
    image: soft,
  },
  {
    id: 15,
    name: "Balanciaga stormMesh 540",
    price: "130.99",
    description: "Engineered for bold movements,it combines layered mesh textures with stricking electric black accents and sculped sole.",
    image: smooth,
  },
  {
    id: 16,
    name: "Urban Edge",
    price: "100.99",
    description: "Urban Edge captures the spirit of street culture with it's gritty,high-contrast design, perfect for making a powerful first impression.",
    image: cover,
  },
  {
    id: 17,
    name: "Classic Brogue",
    price: "99.99",
    description: "proffesional quality classic Brouge for casual wears.",
    image: sweet,
  },
  {
    id: 18,
    name: "Nike fury",
    price: "75.99",
    description: "Elevate your looks today with this high contrast nike fury.",
    image: yelloww,
  },
  {
    id: 19,
    name: "Air jordans fury",
    price: "100.99",
    description: "it's a must have for hoops lovers and sneakerheads alike.",
    image: green,
  },
  {
    id: 20,
    name: "Nike sp",
    price: "79.99",
    description: "Quality Nike sp kicks for your classy drips.",
    image: nif,
  },
  {
    id: 21,
    name: "Air Jordan Blaze Fury",
    price: "75.99",
    description: "The Air jordan Blaze Fury fuses bold red, black, and white iconic jordan design and premium cushioning.",
    image: jnike,
  },
  {
    id: 21,
    name: "Louis Vuitton Velocity LX",
    price: "130.99",
    description: "Featuring a sleek low-cut profile,monogrammed mesh panels, and a sculpted sole unit,the sneaker delivers comfort,class, and bold LV energy in every step.",
    image: bluelvv,
  },
  {
    id: 21,
    name: "Nike Blaze Redstrike",
    price: "59.99",
    description: "Engineered for speed and style, it's the perfect shoe to ignite your performance on and off the court.",
    image: rednike,
  },
  {
    id: 21,
    name: "off-white Aero Glide",
    price: "150.99",
    description: "The Aero Glide combines off-white's signature industrial aesthetic with aerodynamic design.",
    image: takeoff,
  },
  {
    id: 21,
    name: "off-white Glide",
    price: "100.99",
    description: "it's a perfect fusion of street edge and modern performance.",
    image: redoff,
  },
  {
    id: 21,
    name: "Classic Glide",
    price: "250.99",
    description: "elevate your look today with this cklassic Glide",
    image: solid,
  },
  {
    id: 21,
    name: "Dior Atlas boots",
    price: "79.99",
    description: "Elevate your looks with this classy Dior Atlas boots today.",
    image: dior,
  },
  {
    id: 21,
    name: "Nike cortez",
    price: "50.99",
    description: "Engineered for speed and style, it's the perfect shoe to ignite your performance on and off the court.",
    image: whiteoff,
  },
  {
    id: 21,
    name: "oxford classic Brogue",
    price: "250.99",
    description: "A featuring elegant perforated detailing,a sleek silhouette, and polished leather finish.",
    image: blackiee,
  },
  {
    id: 21,
    name: "off-white low-top Arrow",
    price: "120.99",
    description: "Elevate your look today with this classy off-white shoe.",
    image: yellowoff,
  },
  {
    id: 21,
    name: "off-white out of office",
    price: "105.99",
    description: "Professional quality off-white kicks just for you.",
    image: blueoff,
  },
  {
    id: 21,
    name: "Air max 97/90/270",
    price: "99.99",
    description: "Professional quality Air max kicks.",
    image: colorednik,
  },
  {
    id: 21,
    name: "LV Archlight",
    price: "75.99",
    description: "Archlight gives you the best kind of combinations you need.",
    image: bluelv,
  },
  {
    id: 21,
    name: "Lv skate sneaker",
    price: "65.99",
    description: "Elevate  your looks with this skate sneaker today",
    image: ashlv,
  },
  {
    id: 21,
    name: "luxembourg sneaker",
    price: "89.99",
    description: " Quality lv kicks for styling.",
    image: blacklv,
  },
  {
    id: 21,
    name: "spash concrete Bloom",
    price: "78.99",
    description: "Professional quality shirt for styling amd casuals too.",
    image: sharp,
  },
  {
    id: 21,
    name: "Rolex Datejust ",
    price: "109.99",
    description: "The rolex Datejust epitomizes classic luxery with iconic fluted bezel,sleek silver dail, and timeless stainless steel bracelet.",
    image: hublot,
  },
  {
    id: 21,
    name: "Timberland blue ridge",
    price: "250.99",
    description: "The Blue Ridge boot7 combines rugged durability with a cool blue leather finish, crafted to tackle any terrain with style",
    image: whitej,
  },
  {
    id: 21,
    name: "Black Glide",
    price: "99.99",
    description: "Professional quality Glide for your styling and could be used casually.",
    image: coded,
  },
  {
    id: 21,
    name: "Black Air cortex",
    price: "75.99",
    description: "Professional quality Black air cortex to elevate your looks.",
    image: fourthnike,
  },
  {
    id: 21,
    name: " lvBlazer",
    price: "57.99",
    description: "the lv blazzer is indeed a luxery kind of shoe for styling. ",
    image: loui,
  },
  {
    id: 21,
    name: "Air force 1",
    price: "68.99",
    description: "elevate your look today with this amazing Air force kicks.",
    image: brown,
  },
  {
    id: 21,
    name: "lv runner tactics",
    price: "109.99",
    description: "Elevate your looks today with this runner tactics,it could be used both proffesionally and casually.",
    image: lv,
  },
  {
    id: 21,
    name: "Rolex oyster perpetual",
    price: "200.99",
    description: "Elevate your looks today with this rolex oyster watch,it is an epitome of luxery.",
    image: rolex,
  },
  {
    id: 21,
    name: "Concord Air jordans",
    price: "109.99",
    description: "patent leather shine,icy sole-formal and fly in one silhouette.",
    image: tj,
  },
  {
    id: 21,
    name: "Air white cement",
    price: "110.99",
    description: "Elephant prints clean white leather, and 1988 heritage vibes.",
    image: screen,
  },
  {
    id: 21,
    name: "Air zoom freak",
    price: "79.99",
    description: "Quality zoom kicks that could be used to elevate your looks.",
    image: bw,
  },
  {
    id: 21,
    name: "Nike dunk low",
    price: "86.99",
    description: "known for its mesh panels and visible Air sole,a bold and iconic favorite.",
    image: blue,
  },
  {
    id: 21,
    name: "Nike Blazzer Mid '77",
    price: "99.99",
    description: "Vintage basketball vibe with suede accents and retro swoosh.",
    image: pink,
  },
  {
    id: 21,
    name: "Nike zoomX Vaporfly Next%",
    price: "69.99",
    description: "Built for speed - elite runner's choice with lightweight, responsive foam.",
    image: red,
  },
  {
    id: 21,
    name: "sinclair Milled Nappa",
    price: "170.99",
    description: "Zipper-front boots with double height and hardcore attitude.",
    image: yellowdr,
  },
  {
    id: 21,
    name: "jordan platform boots",
    price: "150.99",
    description: "chunky platform sole,same rugged DNA - bold amd fearless fit.",
    image: reddr,
  },
  {
    id: 21,
    name: "Rolex submarrine date",
    price: "200.99",
    description: "Diver's favourite.Rotating bezel,waterproof to 300m pure luxery utility.",
    image: rolexx,
  },
  {
    id: 21,
    name: "Nike Air Max 97",
    price: "75.99",
    description: "Wave-like upper and visible Air unit - inspired by japanese bullet trains.",
    image: nik,
  },
  {
    id: 21,
    name: "Smooth leather boots",
    price: "200.99",
    description: "Elastic-slides slip on with a sleek shape all attitude,no laces.",
    image: baca,
  },
  {
    id: 21,
    name: "chelsea boots",
    price: "150.99",
    description: "The original 8-eye spot - durable leather,yellow stitching,air-cushioned sole.",
    image: balanciaga,
  },
  {
    id: 21,
    name: "Rolex sky-dweller",
    price: "120.99",
    description: "Dual time zones and annual calender - made for global movers.",
    image: wrist,
  },
  {
    id: 21,
    name: "Black Ripped skinny",
    price: "89.99",
    description: "stretchy, tight fit with knee rips - a street staple.",
    image: jeans,
  },
  {
    id: 21,
    name: "Noir essentials",
    price: "70.99",
    description: "minimalist design,oversized fit -a closet must have.",
    image: hoddy,
  },
  {
    id: 21,
    name: "core fade-Hoddie",
    price: "75.99",
    description: "jet black with washed texture,made for lowkey layering and street appeal.",
    image: hoodiee,
  },
];

export default function Gallery() {
  const [showGallery, setShowGallery] = useState(false);
  const { addToCart } = useCart();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setTimeout(() => setShowGallery(true), 100);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`Added ${product.name} to cart!`);
    setTimeout(() => setNotification(), 3000); // Clear notification after 3 seconds
  };

  return (
    <div className={`p-8 transition-transform duration-1000 ease-out bg-gray-50 ${showGallery ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
      {notification && (
        <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded shadow-lg">
          {notification}
        </div>
      )}
      {/* Gallery Header */}
      <h2 className="text-2xl font-bold text-center md:mt-30 mt-30 mb-3">
        Welcome to our gallery
      </h2>
      <p className='text-center mb-5 text-1xl font-semibold'> Mcm fashion House offers Visuals that tell our fashion story.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg p-4 bg-white flex flex-col items-center transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-gray-300 cursor-pointer"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={`Product ${product.name}`}
                className="w-full h-85 object-top object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-100 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">
              </div>
            )}
            <div className="w-full text-center">
              <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="font-semibold text-lg text-blue-600">${product.price}</div>

              <button
                onClick={() => handleAddToCart(product)}
                className="bg-black text-white flex items-center justify-center gap-2 mt-4 hover:bg-gray-800 px-4 py-2 rounded-lg w-full transition-colors duration-200"
              >
                Add to cart <img src={shop} alt="" className='invert h-4 w-4' />
              </button>
            </div>
          </div>

        ))}
      </div>
      <div className='text-center mt-20 font-bold text-gray-500 '>
        <p>You cannot find exactly what you want,contact us directly listing what so ever you need.we'll reach out to you within 24 hrs.
        <br />  Thank you.
        </p>
        <div className='mt-10'>
          <a href="/contact"
            className='bg-black text-white py-3 px-5 rounded-full '
          >

            contact us

          </a>
        </div>
      </div>
    </div>

  );
}
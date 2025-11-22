// "use client";

import MainComponent from "@/components/mainComponent/MainComponent";

// import Cart from "@/components/carts/Cart";

// import GreateCom from "@/components/greateCom/GreateCom";
// import { useEffect, useRef, useState } from "react";

// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-cards";

// // import required modules
// import { EffectCards } from "swiper/modules";

// export default function Home() {
//   const [active, setActive] = useState("Donuts");
//   const [item, setItem] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState([]);

//   const sectionRefs = useRef({});

//   const colors = [
//     "bg-red-200",
//     "bg-green-200",
//     "bg-blue-200",
//     "bg-yellow-200",
//     "bg-purple-200",
//   ];

//   const hrefs = [
//     { name: "Donuts", href: "Donuts" },
//     { name: "Bite Box", href: "BiteBox" },
//     { name: "Coffee & Warm Drinks", href: "Coffee" },
//     { name: "Tea & Herbal", href: "Tea" },
//     { name: "Refreshers", href: "Refreshers" },
//     { name: "Cold Drinks & Shakes", href: "Cold" },
//     { name: "Gift Box", href: "Gift" },
//     { name: "Donutoo Sandwich", href: "Sandwich" },
//   ];

//   // Fetch داده‌ها و نظرات
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productsRes, commentsRes] = await Promise.all([
//           fetch("/api"),
//           fetch("/api/admin/comment"),
//         ]);

//         const productsData = await productsRes.json();
//         const commentsData = await commentsRes.json();

//         setItem(productsData.products);
//         setComments(commentsData.comments); // <<< اینجا تغییر دادیم
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, []);

//   // IntersectionObserver برای منو
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const sectionId = entry.target.id;
//             const found = hrefs.find((i) => i.href === sectionId);
//             if (found) setActive(found.name);
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     hrefs.forEach((item) => {
//       const section = sectionRefs.current[item.href];
//       if (section) observer.observe(section);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const searchHandler = (e) => {
//     const value = e.target.value;
//     setSearch(value);

//     if (value.trim() === "") {
//       setFilter([]); // اگر تکست خالی شد → سرچ را خالی کن
//     } else {
//       const results = item.filter(
//         (i) =>
//           i.name.toLowerCase().includes(value.toLowerCase()) ||
//           i.category.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilter(results);
//     }
//   };

//   return (
//     <div className="bg-gray-100">
//       {/* شعبه و جستجو */}

//       <div className="w-full m-auto mt-16 bg-white">
//         <div className="text-center">
//           <p className="text-gray-400 animate-pulse">شعبه : دوناتو آ اس پ</p>
//           <h1 className="mt-5">سفارش می‌پذیریم</h1>
//           <input
//             className="mt-5 mb-3 border text-xs border-gray-400  placeholder-gray-400 rounded-4xl h-[60px] md:w-[700px] pr-3"
//             type="text"
//             placeholder="جستجوی محصولات ..."
//             onChange={searchHandler}
//             value={search}
//           />
//         </div>
//       </div>

//       {/* منو */}

//       {/* عناوین */}
//       <div className="sticky top-0 z-50 mt-3 w-full bg-neutral-100">
//         <div className="bg-neutral-100 text-xs text-gray-600 border-b border-b-gray-200 md:flex items-center justify-center gap-10 hidden md:w-full h-[100px] m-auto cursor-pointer sticky top-0 z-50">
//           {hrefs.map((item) => (
//             <a
//               key={item.name}
//               href={`#${item.href}`}
//               onClick={() => setActive(item.name)}
//               className={`pb-[3px] transition-all duration-200 ${
//                 active === item.name
//                   ? "border-b-[3px] border-b-gray-800 text-gray-900"
//                   : "border-b-[3px] border-transparent hover:border-b-gray-300"
//               }`}
//             >
//               {item.name}
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* هر عنوان  */}

//       {filter.length > 0 ? (
//         <div className="md:max-w-47/50 m-auto md:mt-10">
//           <div className="flex flex-wrap md:mt-3 md:gap-5 items-center justify-center">
//             {filter.map((i) => (
//               <div key={i._id} className="md:mb-10">
//                 <Cart {...i} />
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <>
//           {hrefs.map((h) => (
//             <div className="" key={h.href}>
//               {/* عنوان دسته */}
//               <h1
//                 id={h.href}
//                 ref={(el) => (sectionRefs.current[h.href] = el)}
//                 className="md:font-bold text-lg md:text-xl p-3 md:p-10"
//               >
//                 {h.href}
//               </h1>

//               {/* آیتم‌های مربوط به اون دسته */}
//               <div className="md:max-w-47/50 m-auto mt-10">
//                 <div className="flex flex-wrap mt-3 gap-5 items-center justify-center">
//                   {item
//                     .filter((i) => i.category === h.href)
//                     .map((i) => (
//                       <div
//                         key={i._id}
//                         id={i._id}
//                         ref={(el) => (sectionRefs.current[i._id] = el)}
//                         className="mb-10"
//                       >
//                         <Cart {...i} />
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </>
//       )}

//       <div>
//         <h1 className="text-center mb-3 font-bold">نظرات را ورق بزنید</h1>
//         <Swiper
//           effect={"cards"}
//           grabCursor={true}
//           modules={[EffectCards]}
//           className="md:w-60 md:h-80"
//         >
//           {comments.map((com, index) => (
//             <SwiperSlide
//               key={com._id}
//               className={`flex items-center justify-center rounded-2xl text-xl font-bold text-gray-500 ${
//                 colors[index % colors.length] // چرخه رنگ‌ها
//               }`}
//             >
//               <div>
//                 <p className="p-3 text-sm text-gray-800">{com.name}</p>
//                 <p className="text-sm p-3 font-light text-gray-700">
//                   {com.comment}
//                 </p>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       <GreateCom />
//     </div>
//   );
// }



export default function Page() {

  return (
    <>
      <MainComponent />
    </>
  );
}

// // https://donutto.cafe/branches/d-asp/s

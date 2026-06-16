export const STORE_DATA = {
  products: [
    {
      id: "prod-1",
      name: "APEX WHEY PROTEIN ISO-GOLD",
      brand: "Apex Labs",
      category: "Proteínas",
      price: 4500,
      originalPrice: 5900,
      discount: 24,
      rating: 4.9,
      ratingCount: 142,
      image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop"
      ],
      stock: 12,
      maxStock: 50,
      tag: "Más vendido",
      description: "Nuestra proteína aislada de suero de leche (Whey Isolate) es la fórmula más pura del mercado. Con cero azúcar, baja en carbohidratos y cargada con 27g de proteína de absorción ultra rápida por servicio. Ideal para la construcción y reparación de masa muscular magra.",
      benefits: [
        "27g de Aislado de Proteína de Suero por servicio.",
        "6.2g de BCAAs naturales para la recuperación muscular.",
        "Cero azúcares añadidos y libre de gluten.",
        "Fácil digestión y disolución instantánea."
      ],
      ingredients: [
        "Aislado de Proteína de Suero de Leche Microfiltrado de Flujo Cruzado",
        "L-Glutamina",
        "Sabores naturales y artificiales",
        "Lecitina de Girasol",
        "Sucralosa"
      ],
      usage: "Mezclar 1 scoop con 8-10 oz de agua fría o leche descremada después de entrenar o entre comidas principales.",
      nutritionTable: {
        "Calorías": "120 kcal",
        "Proteína": "27 g",
        "Grasa Total": "0.5 g",
        "Carbohidratos": "1 g",
        "Azúcares": "0 g",
        "Sodio": "50 mg",
        "BCAAs": "6.2 g"
      },
      faqs: [
        {
          question: "¿Cuándo es mejor tomarla?",
          answer: "El momento óptimo es inmediatamente después de tu entrenamiento para iniciar la síntesis de proteínas y la recuperación muscular."
        },
        {
          question: "¿Es apto para intolerantes a la lactosa?",
          answer: "Al ser un aislado microfiltrado, el contenido de lactosa es prácticamente nulo (menos de 0.5g), por lo que la mayoría de personas con intolerancia leve a moderada la toleran perfectamente."
        }
      ],
      reviews: [
        {
          name: "Carlos Mendoza",
          rating: 5,
          comment: "La mejor disolución que he probado. El sabor a chocolate belga es increíble y no se siente pesado en la digestión.",
          date: "Hace 2 días",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
        },
        {
          name: "Laura Gómez",
          rating: 5,
          comment: "He visto una mejora notable en la definición muscular. 100% recomendada.",
          date: "Hace 1 semana",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "prod-2",
      name: "APEX CREATINE MONOHYDRATE 100% PURE",
      brand: "Apex Labs",
      category: "Creatinas",
      price: 2200,
      originalPrice: 2900,
      discount: 24,
      rating: 4.9,
      ratingCount: 310,
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=600&auto=format&fit=crop"
      ],
      stock: 8,
      maxStock: 40,
      tag: "Recomendado",
      description: "Creatina monohidratada micronizada de grado farmacéutico. Aumenta la fuerza, potencia muscular y acelera la recuperación de alta intensidad. Sin saborizantes, ideal para mezclar con tu batido o bebida favorita.",
      benefits: [
        "5g de Creatina Monohidratada 100% pura por dosis.",
        "Micronizado de máxima absorción y solubilidad.",
        "Aumento comprobado en fuerza y volumen muscular.",
        "Mejora la recuperación entre series de alta intensidad."
      ],
      ingredients: [
        "Creatina Monohidratada Micronizada Pura (100%)"
      ],
      usage: "Tomar 1 scoop (5g) diariamente mezclado con 8 oz de agua o jugo. Se puede consumir antes o después del entrenamiento.",
      nutritionTable: {
        "Creatina Monohidratada": "5000 mg",
        "Calorías": "0 kcal",
        "Carbohidratos": "0 g",
        "Grasas": "0 g",
        "Sodio": "0 mg"
      },
      faqs: [
        {
          question: "¿Requiere fase de carga?",
          answer: "No es estrictamente necesaria. Tomar 5g diarios de manera consistente satura las reservas musculares en unas 3-4 semanas con los mismos resultados y menos molestias gástricas."
        },
        {
          question: "¿Debo tomarla los días que no entreno?",
          answer: "Sí, la creatina funciona por acumulación. Debe tomarse todos los días, idealmente a la misma hora, para mantener saturadas las reservas celulares."
        }
      ],
      reviews: [
        {
          name: "Daniel Ortiz",
          rating: 5,
          comment: "Excelente calidad, se disuelve súper rápido comparado con otras marcas arenosas.",
          date: "Hace 5 días",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "prod-3",
      name: "APEX IGNITE PRE-WORKOUT V2",
      brand: "Apex Labs",
      category: "Pre-entrenos",
      price: 2800,
      originalPrice: 3500,
      discount: 20,
      rating: 4.8,
      ratingCount: 95,
      image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop"
      ],
      stock: 4,
      maxStock: 25,
      tag: "Oferta",
      description: "Pre-entrenamiento de alta intensidad formulado con ingredientes clave científicamente respaldados para proporcionar un bombeo muscular extremo, energía explosiva y un enfoque mental implacable.",
      benefits: [
        "6g de L-Citrulina Malato para bombeos vasculares masivos.",
        "3.2g de Beta-Alanina para retrasar la fatiga muscular.",
        "300mg de Cafeína Anhidra para energía explosiva prolongada.",
        "Enfoque mental láser mediante L-Tirosina."
      ],
      ingredients: [
        "L-Citrulina Malato",
        "Beta-Alanina",
        "Cafeína Anhidra",
        "L-Tirosina",
        "Extracto de Pimienta Negra (BioPerine)",
        "Ácido Cítrico",
        "Sucralosa"
      ],
      usage: "Mezclar 1 scoop con 8-10 oz de agua fría y consumir 20-30 minutos antes del entrenamiento. Comenzar con 1/2 scoop para evaluar tolerancia.",
      nutritionTable: {
        "Calorías": "5 kcal",
        "L-Citrulina Malato": "6000 mg",
        "Beta-Alanina": "3200 mg",
        "Cafeína Anhidra": "300 mg",
        "L-Tirosina": "500 mg",
        "Sodio": "95 mg"
      },
      faqs: [
        {
          question: "¿Por qué siento hormigueo en la piel?",
          answer: "Se debe a la Beta-Alanina. Es una sensación normal e inofensiva llamada parestesia y desaparece después de unos minutos de entrenamiento."
        }
      ],
      reviews: [
        {
          name: "Marcos Ruiz",
          rating: 5,
          comment: "Energía brutal y unos bombeos de otro planeta. El sabor a Blue Raspberry está buenísimo.",
          date: "Hace 3 días",
          avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=100&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "prod-4",
      name: "SHRED-MAX EXTREME THERMOGENIC",
      brand: "Apex Labs",
      category: "Quemadores de grasa",
      price: 2500,
      originalPrice: 3200,
      discount: 22,
      rating: 4.7,
      ratingCount: 88,
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop"
      ],
      stock: 15,
      maxStock: 30,
      tag: "Nuevo",
      description: "Quemador de grasa termogénico ultra concentrado. Incrementa el gasto calórico basal, acelera el metabolismo lipídico y ayuda a controlar el apetito para que logres tu definición ideal más rápido.",
      benefits: [
        "Acelera la oxidación de grasas como fuente de energía.",
        "Potente control del apetito y antojos.",
        "Incrementa los niveles de energía y la sudoración.",
        "Efecto diurético suave para eliminar retención de líquidos."
      ],
      ingredients: [
        "L-Carnitina Tartrato",
        "Extracto de Té Verde",
        "Cafeína Anhidra",
        "Cetonas de Frambuesa",
        "Extracto de Cayena",
        "Picolinato de Cromo"
      ],
      usage: "Tomar 1 cápsula por la mañana con abundante agua. Una vez evaluada la tolerancia, tomar una segunda cápsula 6 horas después.",
      nutritionTable: {
        "L-Carnitina Tartrato": "500 mg",
        "Extracto de Té Verde": "300 mg",
        "Cafeína": "200 mg",
        "Extracto de Pimienta Cayena": "50 mg",
        "Cromo": "100 mcg"
      },
      faqs: [
        {
          question: "¿Puedo tomarlo antes de dormir?",
          answer: "No es recomendable debido a su alto contenido de estimulantes. Debe consumirse al menos 6 horas antes de acostarse para evitar el insomnio."
        }
      ],
      reviews: [
        {
          name: "Sofía Medina",
          rating: 4,
          comment: "Mucha energía y sudoración durante el cardio. He bajado 3kg en 3 semanas combinándolo con mi dieta.",
          date: "Hace 4 días",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "prod-5",
      name: "APEX MULTI-VIT ACTIVE MEN & WOMEN",
      brand: "Apex Labs",
      category: "Vitaminas",
      price: 1500,
      originalPrice: 2000,
      discount: 25,
      rating: 4.8,
      ratingCount: 115,
      image: "https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?q=80&w=600&auto=format&fit=crop"
      ],
      stock: 22,
      maxStock: 50,
      tag: "Recomendado",
      description: "Complejo multivitamínico de alta potencia diseñado específicamente para atletas y personas con alto desgaste físico. Cubre el 100% de las necesidades diarias de micronutrientes para mantener el sistema inmune fuerte.",
      benefits: [
        "Más de 25 vitaminas y minerales esenciales.",
        "Complejo B completo para la optimización de la energía celular.",
        "Enriquecido con antioxidantes y extractos vegetales.",
        "Soporte inmunitario y salud articular reforzados."
      ],
      ingredients: [
        "Vitamina A, C, D3, E, K2",
        "Vitaminas del Complejo B (B1, B2, B3, B5, B6, B12)",
        "Zinc, Magnesio, Hierro, Selenio",
        "Extracto de Semilla de Uva"
      ],
      usage: "Tomar 2 tabletas diarias con la comida principal del día (almuerzo o desayuno).",
      nutritionTable: {
        "Vitamina C": "250 mg",
        "Vitamina D3": "1000 UI",
        "Vitamina B12": "100 mcg",
        "Zinc": "15 mg",
        "Magnesio": "100 mg",
        "Calcio": "150 mg"
      },
      faqs: [
        {
          question: "¿Puedo tomarlo con el estómago vacío?",
          answer: "Es mejor consumirlo con alimentos grasos (como el desayuno) para mejorar la absorción de las vitaminas liposolubles (A, D, E, K)."
        }
      ],
      reviews: [
        {
          name: "Alejandro Castro",
          rating: 5,
          comment: "Me siento con mucha más vitalidad por las mañanas y he dejado de sentirme fatigado a mitad de jornada.",
          date: "Hace 10 días",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "prod-6",
      name: "APEX MASS GAINER HYPERBULK",
      brand: "Apex Labs",
      category: "Ganadores de peso",
      price: 3900,
      originalPrice: 4900,
      discount: 20,
      rating: 4.6,
      ratingCount: 74,
      image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=600&auto=format&fit=crop"
      ],
      stock: 6,
      maxStock: 20,
      tag: "Más vendido",
      description: "Ganador de masa muscular extremo con más de 1200 calorías y 50g de proteína por servicio. Diseñado para personas con metabolismos ultra rápidos (hardgainers) que buscan aumentar volumen corporal.",
      benefits: [
        "1250 calorías de alta calidad por servicio.",
        "50g de mezcla de proteínas de absorción secuencial.",
        "250g de carbohidratos complejos de avena y maltodextrina.",
        "Potenciado con 3g de monohidrato de creatina."
      ],
      ingredients: [
        "Matriz de Carbohidratos Complejos (Avena Molida, Maltodextrina)",
        "Mezcla de Proteínas (Concentrado de Suero, Caseína Micelar, Albúmina de Huevo)",
        "Creatina Monohidratada",
        "Cocoa en polvo",
        "Enzimas Digestivas"
      ],
      usage: "Mezclar 2 scoops colmados en 16-20 oz de agua fría o leche entera. Tomar preferiblemente post-entrenamiento o dividido en dos tomas al día.",
      nutritionTable: {
        "Calorías": "1250 kcal",
        "Proteína": "50 g",
        "Carbohidratos": "252 g",
        "Grasa": "4.5 g",
        "Azúcar": "18 g",
        "Sodio": "410 mg"
      },
      faqs: [
        {
          question: "¿Causa pesadez estomacal?",
          answer: "Tiene enzimas digestivas agregadas para mejorar la absorción, sin embargo, se recomienda a principiantes comenzar con la mitad de la dosis para acostumbrar al sistema digestivo."
        }
      ],
      reviews: [
        {
          name: "Roberto Peralta",
          rating: 5,
          comment: "He subido 4 kg en un mes combinándolo con rutinas pesadas de gimnasio. Excelente producto si te cuesta comer.",
          date: "Hace 12 días",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "prod-7",
      name: "APEX BCAA + EAA RECOVERY MATRIX",
      brand: "Apex Labs",
      category: "Aminoácidos",
      price: 2100,
      originalPrice: 2800,
      discount: 25,
      rating: 4.8,
      ratingCount: 65,
      image: "https://images.unsplash.com/photo-1527634311077-9943f7df34e1?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1527634311077-9943f7df34e1?q=80&w=600&auto=format&fit=crop"
      ],
      stock: 19,
      maxStock: 40,
      tag: "Oferta",
      description: "Matriz completa de aminoácidos esenciales (EAAs) y ramificados (BCAAs) en proporción 2:1:1. Diseñado para optimizar la síntesis de proteínas intra-entrenamiento, mejorar la hidratación y combatir el catabolismo.",
      benefits: [
        "8g de EAAs totales y 5g de BCAAs por servicio.",
        "Complejo de electrolitos para rehidratación celular activa.",
        "Previene el catabolismo muscular durante ayunos o entrenamientos pesados.",
        "Sin colorantes artificiales y delicioso sabor a frutas."
      ],
      ingredients: [
        "L-Leucina",
        "L-Isoleucina",
        "L-Valina",
        "L-Lisina",
        "L-Treonina",
        "Cloruro de Sodio",
        "Cloruro de Potasio",
        "Agua de Coco en Polvo"
      ],
      usage: "Tomar 1 scoop disuelto en 12-16 oz de agua fría durante tu entrenamiento físico.",
      nutritionTable: {
        "BCAAs (2:1:1)": "5000 mg",
        "EAAs Totales": "8000 mg",
        "Sodio": "120 mg",
        "Potasio": "80 mg",
        "Agua de Coco": "500 mg"
      },
      faqs: [
        {
          question: "¿Puedo usarlo como bebida hidratante?",
          answer: "Sí, es excelente para tomar durante el día o en actividades deportivas al aire libre gracias a su matriz de electrolitos de coco."
        }
      ],
      reviews: [
        {
          name: "Daniela Santos",
          rating: 5,
          comment: "Me ayuda muchísimo a no terminar agotada mis entrenamientos intensos de Crossfit.",
          date: "Hace 1 semana",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "prod-8",
      name: "APEX HYDROLYZED COLLAGEN + BIOTIN",
      brand: "Apex Labs",
      category: "Colágeno",
      price: 1900,
      originalPrice: 2500,
      discount: 24,
      rating: 4.9,
      ratingCount: 104,
      image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600&auto=format&fit=crop"
      ],
      stock: 14,
      maxStock: 35,
      tag: "Recomendado",
      description: "Colágeno hidrolizado de tipo I y III de alta absorción, potenciado con biotina, ácido hialurónico y vitamina C. Diseñado para regenerar articulaciones, cartílagos, fortalecer el cabello y rejuvenecer la piel.",
      benefits: [
        "10g de péptidos de colágeno bovino hidrolizado por dosis.",
        "Potenciado con 10,000 mcg de Biotina de máxima concentración.",
        "Con ácido hialurónico para hidratación cutánea óptima.",
        "Vitamina C incluida para estimular la producción de colágeno natural."
      ],
      ingredients: [
        "Colágeno Hidrolizado Bovino Tipo I y III",
        "Ácido Hialurónico",
        "Biotina (Vitamina B7)",
        "Ácido Ascórbico (Vitamina C)",
        "Sabor natural a fresas"
      ],
      usage: "Disolver 1 scoop (12g) en agua, jugo o té caliente todas las mañanas, preferiblemente en ayunas.",
      nutritionTable: {
        "Colágeno Hidrolizado": "10000 mg",
        "Biotina": "10000 mcg",
        "Ácido Hialurónico": "80 mg",
        "Vitamina C": "90 mg",
        "Calorías": "40 kcal",
        "Proteína": "9 g"
      },
      faqs: [
        {
          question: "¿En cuánto tiempo veo resultados?",
          answer: "Los beneficios en la piel y uñas suelen notarse en 4 semanas; el fortalecimiento capilar y alivio articular se perciben comúnmente a partir de la semana 8-12 de uso diario continuo."
        }
      ],
      reviews: [
        {
          name: "María Vargas",
          rating: 5,
          comment: "Mis rodillas ya no crujen al hacer sentadillas y mi cabello ha crecido super brillante. Me encanta.",
          date: "Hace 6 días",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "prod-9",
      name: "APEX MONSTER ENERGY FOCUS DRINK (6-PACK)",
      brand: "Apex Labs",
      category: "Energizantes",
      price: 1200,
      originalPrice: 1600,
      discount: 25,
      rating: 4.7,
      ratingCount: 52,
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop"
      ],
      stock: 10,
      maxStock: 30,
      tag: "Nuevo",
      description: "Pack de 6 bebidas energéticas listas para tomar. Cero calorías, cero azúcar, cargadas de nootrópicos, taurina y cafeína natural de extracto de café verde para darte energía limpia sin el choque tradicional.",
      benefits: [
        "Bebida lista para consumir fría.",
        "Cero azúcares añadidos y libre de colorantes artificiales.",
        "Con L-Teanina para una concentración libre de temblores.",
        "Complejo de Vitamina B completo para energía celular sostenida."
      ],
      ingredients: [
        "Agua Carbonatada",
        "Cafeína Natural de Granos de Café Verde",
        "L-Teanina",
        "Taurina",
        "Sucralosa",
        "Extracto de Ginseng Panax"
      ],
      usage: "Consumir una lata fría de 12 oz 15 minutos antes de entrenar, estudiar o trabajar intensamente.",
      nutritionTable: {
        "Calorías": "0 kcal",
        "Cafeína Natural": "160 mg",
        "L-Teanina": "100 mg",
        "Taurina": "1000 mg",
        "Vitamina B6": "2 mg",
        "Vitamina B12": "6 mcg"
      },
      faqs: [
        {
          question: "¿Causa taquicardia?",
          answer: "Contiene L-Teanina, un aminoácido que regula el efecto estimulante de la cafeína proporcionando energía limpia y enfoque calmado, minimizando el nerviosismo."
        }
      ],
      reviews: [
        {
          name: "Jesús Cabrera",
          rating: 5,
          comment: "Energía inmediata sin bajón. Ideal para mis entrenamientos nocturnos después de la oficina.",
          date: "Hace 12 días",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
        }
      ]
    },
    {
      id: "prod-10",
      name: "APEX ANABOLIC BEAST STACK",
      brand: "Apex Labs",
      category: "Combos",
      price: 8500,
      originalPrice: 12300,
      discount: 30,
      rating: 5.0,
      ratingCount: 156,
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=600&auto=format&fit=crop"
      ],
      stock: 5,
      maxStock: 15,
      tag: "Más vendido",
      description: "El combo de hipertrofia definitivo. Incluye: 1 APEX Whey Protein Iso-Gold (2 lbs) + 1 APEX Creatine Monohydrate Pure (300g) + 1 APEX Ignite Pre-workout V2. Todo lo necesario para llevar tus entrenamientos y ganancia de masa al límite absoluto.",
      benefits: [
        "Ahorro de un 30% comparado a compras individuales.",
        "Sinergia perfecta: Energía (Pre-workout) + Potencia (Creatina) + Construcción (Proteína).",
        "Resultados visibles en fuerza e hipertrofia acelerados.",
        "Asesoramiento digital de dosificación en la guía digital incluida gratis."
      ],
      ingredients: [
        "Ver ingredientes específicos de cada producto incluido (Proteína Iso-Gold, Creatina Pure, Pre-workout V2)."
      ],
      usage: "Creatina: 5g diarios; Pre-workout: 1 scoop 25 min antes de entrenar; Proteína: 1 scoop después de entrenar.",
      nutritionTable: {
        "Componentes": "Proteína Aislada + Creatina Micronizada + Pre-entreno Energizante",
        "Guía Incluida": "Digital PDF (Código QR en la caja)"
      },
      faqs: [
        {
          question: "¿Puedo elegir los sabores?",
          answer: "Sí, al confirmar tu pedido por WhatsApp, nuestro asesor te dará las opciones disponibles de sabores para tu Proteína y Pre-entrenamiento."
        }
      ],
      reviews: [
        {
          name: "Esteban Rivas",
          rating: 5,
          comment: "Excelente combo. Te ahorras una buena cantidad y los resultados en volumen muscular son extraordinarios.",
          date: "Hace 1 día",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
        }
      ]
    }
  ],
  testimonials: [
    {
      name: "Manuel Rodríguez",
      age: 26,
      achievement: "Aumento de 8kg de masa muscular",
      comment: "Llevo 6 meses usando la proteína Iso-Gold junto con la creatina de APEX. Los resultados hablan por sí solos. Mi fuerza aumentó un 40% y mi recuperación física es increíble.",
      beforeImg: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=300&auto=format&fit=crop",
      afterImg: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=300&auto=format&fit=crop",
      stars: 5
    },
    {
      name: "Valeria Espinal",
      age: 31,
      achievement: "Definición y pérdida de 12 lbs de grasa",
      comment: "El quemador Shred-Max combinado con la proteína me ayudó a moldear mi figura en tiempo récord para mi competencia. La energía limpia que me dio sin temblores fue la clave.",
      beforeImg: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=300&auto=format&fit=crop",
      afterImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
      stars: 5
    }
  ],
  blog: [
    {
      id: "post-1",
      title: "Guía Definitiva de Creatina: Cuándo y cómo tomarla para el éxito",
      category: "Suplementación",
      readTime: "5 min de lectura",
      date: "Junio 14, 2026",
      shortDescription: "La creatina es el suplemento más estudiado del mundo. Descubre los mitos, realidades y la mejor dosis para potenciar tu fuerza de manera científica.",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
      content: "La creatina monohidratada sigue siendo el rey de la suplementación deportiva por una razón simple: funciona. Al incrementar los niveles de fosfocreatina en las células musculares, permite una resíntesis ultra rápida de ATP (la moneda energética celular). Esto se traduce en la capacidad de realizar esa repetición extra crucial que estimula la hipertrofia. En esta guía te explicamos por qué no necesitas fase de carga, cómo combinarla con carbohidratos para potenciar su transporte, y el por qué debes consumirla de manera diaria y constante los 365 días del año para maximizar tus ganancias físicas."
    },
    {
      id: "post-2",
      title: "Nutrición Peri-Entrenamiento: Optimiza tus comidas pre y post-ejercicio",
      category: "Nutrición",
      readTime: "8 min de lectura",
      date: "Junio 10, 2026",
      shortDescription: "Lo que comes antes, durante y después de tu entrenamiento determina directamente tu ritmo de recuperación muscular y tus niveles de rendimiento.",
      image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop",
      content: "La ventana anabólica no es un mito absoluto, pero ha sido muy exagerada. Sin embargo, la comida peri-entrenamiento sigue siendo vital. Consumir proteínas de rápida asimilación (como Whey Isolate) combinada con carbohidratos simples en los 45 minutos posteriores a levantar pesas estimula la síntesis proteica muscular al máximo y recarga los depósitos de glucógeno vacíos. De igual manera, un pre-entrenamiento adecuado rico en L-Citrulina y cafeína mejorará tu flujo sanguíneo (bombeo vascular) y la concentración mental, permitiendo entrenar con mayor volumen y sobrecarga progresiva."
    },
    {
      id: "post-3",
      title: "Errores Comunes al Intentar Ganar Masa Muscular Magra",
      category: "Ganancia muscular",
      readTime: "6 min de lectura",
      date: "Junio 08, 2026",
      shortDescription: "¿Entrenas duro pero no ves crecimiento? Evita estos fallos comunes en tu dieta, descanso y suplementación deportiva.",
      image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=600&auto=format&fit=crop",
      content: "Ganar masa muscular requiere un excedente calórico controlado (un superávit). Muchos atletas creen que comen suficiente, pero su gasto metabólico es mayor. Otro error grave es la falta de consistencia en el consumo diario de proteínas (mínimo 1.6g a 2.2g por kilogramo de peso corporal). Asimismo, descuidar la sobrecarga progresiva en los entrenamientos o no dormir de 7 a 8 horas (que es cuando ocurre la verdadera síntesis proteica muscular y liberación de hormona del crecimiento) saboteará cualquier esfuerzo en el gimnasio por más suplementos que consumas. Aprende a estructurar tu plan."
    }
  ]
};

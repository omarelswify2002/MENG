export const FILTER_CATEGORIES = {
    category: {
        title: "CATEGORIES",
        options: [
            { value: "Medical", label: "Medical" },
            { value: "Geometric", label: "Geometric" }
        ]
    },
    typecategory: {
        title: "TYPE",
        options: [
            { value: "Clothes", label: "Clothes" },
            { value: "Tools", label: "Tools" }
        ],
        subFilters: {
            Clothes: {
                Medical: [
                    { value: "White coat", label: "White coat" },
                    { value: "Scrubs", label: "Scrubs" },
                    { value: "Medical shoes", label: "Medical shoes" },
                    { value: "Masks and gloves", label: "Masks and gloves" },
                    { value: "Cap", label: "Cap" }
                ],
                Geometric: [
                    { value: "Overalls", label: "Overalls" },
                    { value: "Helmet", label: "Helmet" },
                    { value: "Glasses", label: "Glasses" },
                    { value: "Jackets", label: "Jackets" },
                    { value: "Pants", label: "Pants" },
                    { value: "Safety shoes", label: "Safety shoes" },
                    { value: "Gloves", label: "Gloves" }
                ]
            },
            Tools: {
                Medical: [
                    { value: "Metal and digital", label: "Metal and digital" },
                    { value: "Plastic and glass", label: "Plastic and glass" },
                    { value: "Sharp", label: "Sharp" },
                    { value: "Not sharp", label: "Not sharp" }
                ],
                Geometric: [
                    { value: "Office supplies", label: "Office supplies" },
                    { value: "Practical supplies", label: "Practical supplies" },
                    { value: "Technical supplies", label: "Technical supplies" }
                ]
            }
        }
    },
    subcategory1: {
        title: "SUBCATEGORY 1",
        options: []
    },
    subcategory2: {
        title: "SUBCATEGORY 2",
        options: []
    }
};

export const SUBFILTERS_LEVEL2 = {
    // Medical Clothes
    "White coat": [
        { value: "Short Lab Coat", label: "Short Lab Coat" },
        { value: "Long Lab Coat", label: "Long Lab Coat" },
        { value: "Surgical Gown", label: "Surgical Gown" },
        { value: "Short sleeve coat", label: "Short sleeve coat" }
    ],
    
    "Scrubs": [
        { value: "Classic Scrubs", label: "Classic Scrubs" },
        { value: "Surgical Scrubs", label: "Surgical Scrubs" },
        { value: "Long Sleeve Scrubs", label: "Long Sleeve Scrubs" },
        { value: "Fluid Resistant Scrubs", label: "Fluid Resistant Scrubs" },
        { value: "Nursing Scrubs", label: "Nursing Scrubs" }
    ],
    
    "Medical shoes": [
        { value: "Closed Toe Medical Shoes", label: "Closed Toe Medical Shoes" },
        { value: "Comfort Clogs", label: "Comfort Clogs" },
        { value: "Slip Resistant Shoes", label: "Slip Resistant Shoes" },
        { value: "Surgical Shoes", label: "Surgical Shoes" }
    ],
    
    "Masks and gloves": [
        { value: "Surgical Mask", label: "Surgical Mask" },
        { value: "N95 Mask", label: "N95 Mask" },
        { value: "KN95 Mask", label: "KN95 Mask" },
        { value: "Cloth Mask", label: "Cloth Mask" },
        { value: "Transparent Mask", label: "Transparent Mask" },
        { value: "Latex Gloves", label: "Latex Gloves" },
        { value: "Nitrile Gloves", label: "Nitrile Gloves" },
        { value: "Non-Sterile Gloves", label: "Non-Sterile Gloves" },
        { value: "Sterile Gloves", label: "Sterile Gloves" }
    ],
    
    "Cap": [
        { value: "Bouffant Cap", label: "Bouffant Cap" },
        { value: "Surgical Cap", label: "Surgical Cap" },
        { value: "Tie-Back Cap", label: "Tie-Back Cap" },
        { value: "Reusable Cloth Cap", label: "Reusable Cloth Cap" },
        { value: "Non-Slip Cap", label: "Non-Slip Cap" },
        { value: "Elastic Band Cap", label: "Elastic Band Cap" },
        { value: "Anti-Static Cap", label: "Anti-Static Cap" },
        { value: "Full Coverage Cap", label: "Full Coverage Cap" }
    ],

    // Medical Tools
    "Metal and digital": [
        { value: "Reflex hammer", label: "Reflex hammer" },
        { value: "Tuning fork", label: "Tuning fork" },
        { value: "Stethoscope", label: "Stethoscope" },
        { value: "Sphygmomanometer", label: "Sphygmomanometer" },
        { value: "Blood pressure monitors", label: "Blood pressure monitors" },
        { value: "Diabetic monitors", label: "Diabetic monitors" },
        { value: "Oximeter", label: "Oximeter" },
        { value: "Stroke probe", label: "Stroke probe" },
        { value: "Periodontal probe", label: "Periodontal probe" },
        { value: "Mouth mirror", label: "Mouth mirror" },
        { value: "Tweezer", label: "Tweezer" },
        { value: "Mercurial thermometer", label: "Mercurial thermometer" },
        { value: "Digital thermometer", label: "Digital thermometer" }
    ],
    
    "Plastic and glass": [
        { value: "Flask", label: "Flask" },
        { value: "Measure tube", label: "Measure tube" },
        { value: "Holder", label: "Holder" },
        { value: "Dropper", label: "Dropper" },
        { value: "Burette", label: "Burette" },
        { value: "Pipette", label: "Pipette" },
        { value: "Test tube rack", label: "Test tube rack" },
        { value: "Tape measures", label: "Tape measures" },
        { value: "Morter", label: "Morter" },
        { value: "Goniometer", label: "Goniometer" },
        { value: "Beaker", label: "Beaker" },
        { value: "Petri dish", label: "Petri dish" },
        { value: "Automatic pipette", label: "Automatic pipette" },
    ],
    
    "Sharp": [
        { value: "Scissors", label: "Scissors" },
        { value: "Bone cutters", label: "Bone cutters" },
        { value: "Scalpels", label: "Scalpels" },
        { value: "Surgical staples", label: "Surgical staples" },
        { value: "Dermic needles", label: "Dermic needles" },
        { value: "Surgical blades", label: "Surgical blades" },
        { value: "Cranial drills", label: "Cranial drills" },
        { value: "Mammotome", label: "Mammotome" },
        { value: "Syringes", label: "Syringes" },
        { value: "Osteotomes", label: "Osteotomes" },
        { value: "Dental scaler", label: "Dental scaler" },
        { value: "Dental Turbines", label: "Dental Turbines" },
        { value: "Dental chisel", label: "Dental chisel" },
    ],
    
    "Not sharp": [
        { value: "Amalgamator", label: "Amalgamator" },
        { value: "Sterilizer", label: "Sterilizer" },
        { value: "Light cure device", label: "Light cure device" },
        { value: "Saliva ejector", label: "Saliva ejector" },
        { value: "Amalgam", label: "Amalgam" },
        { value: "Artery forceps", label: "Artery forceps" },
        { value: "Surgical suture", label: "Surgical suture" },
        { value: "Blades handle", label: "Blades handle" },
        { value: "Orthodentic plier", label: "Orthodentic plier" },
        { value: "Bracket tweerzers", label: "Bracket tweerzers" },
        { value: "Scalpel handle", label: "Scalpel handle" },
        { value: "Cupping", label: "Cupping" },
        { value: "Massage gun", label: "Massage gun" },
    ],

    // Geometric Clothes
    "Overalls": [
        { value: "General safety overalls", label: "General safety overalls" },
        { value: "Fire resistant overalls", label: "Fire resistant overalls" },
        { value: "Anti-static overalls", label: "Anti-static overalls" },
        { value: "Chemical resistant overalls", label: "Chemical resistant overalls" },
        { value: "Water and dust resistant overalls", label: "Water and dust resistant overalls" },
        { value: "Cooling overall", label: "Cooling overall" }
    ],
    
    "Helmet": [
        { value: "Standard Safety Helmet", label: "Standard Safety Helmet" },
        { value: "Electrical Safety Helmet", label: "Electrical Safety Helmet" },
        { value: "Heat-Resistant Helmet", label: "Heat-Resistant Helmet" },
        { value: "Helmet with Face Shield", label: "Helmet with Face Shield" },
        { value: "Helmet with Neck Protection", label: "Helmet with Neck Protection" },
        { value: "Ventilated Helmet", label: "Ventilated Helmet" },
        { value: "Helmet with Ear Protection", label: "Helmet with Ear Protection" },
        { value: "Multi-Impact Helmet", label: "Multi-Impact Helmet" }
    ],
    
    "Glasses": [
        { value: "Standard Safety Glasses", label: "Standard Safety Glasses" },
        { value: "Chemical Splash Goggles", label: "Chemical Splash Goggles" },
        { value: "UV Protection Safety Glasses", label: "UV Protection Safety Glasses" },
        { value: "Dust Protection Goggles", label: "Dust Protection Goggles" },
        { value: "Welding Goggles", label: "Welding Goggles" },
        { value: "Electrical Insulated Goggles", label: "Electrical Insulated Goggles" },
        { value: "Reflective Safety Glasses", label: "Reflective Safety Glasses" },
        { value: "High Impact Safety Goggles", label: "High Impact Safety Goggles" }
    ],
    
    "Jackets": [
        { value: "High-Visibility Safety Vest", label: "High-Visibility Safety Vest" },
        { value: "Flame-Resistant Jacket", label: "Flame-Resistant Jacket" },
        { value: "Anti-Static Jacket", label: "Anti-Static Jacket" },
        { value: "Chemical-Resistant Jacket", label: "Chemical-Resistant Jacket" },
        { value: "Heavy-Duty Work Jacket", label: "Heavy-Duty Work Jacket" },
        { value: "Waterproof Jacket", label: "Waterproof Jacket" },
        { value: "Insulated Cold-Weather Jacket", label: "Insulated Cold-Weather Jacket" },
        { value: "Neck and Shoulder Protection Jacket", label: "Neck and Shoulder Protection Jacket" }
    ],
    
    "Pants": [
        { value: "Standard Safety Pants", label: "Standard Safety Pants" },
        { value: "Flame-Resistant Pants", label: "Flame-Resistant Pants" },
        { value: "Anti-Static Pants", label: "Anti-Static Pants" },
        { value: "Chemical-Resistant Pants", label: "Chemical-Resistant Pants" },
        { value: "Waterproof Pants", label: "Waterproof Pants" },
        { value: "High-Visibility Pants", label: "High-Visibility Pants" },
        { value: "Insulated Cold-Weather Pants", label: "Insulated Cold-Weather Pants" },
        { value: "Knee-Pad Pants", label: "Knee-Pad Pants" }
    ],
    
    "Safety shoes": [
        { value: "Steel-Toe Safety Shoes", label: "Steel-Toe Safety Shoes" },
        { value: "Slip-Resistant Safety Shoes", label: "Slip-Resistant Safety Shoes" },
        { value: "Waterproof Safety Boots", label: "Waterproof Safety Boots" },
        { value: "Heat-Resistant Safety Shoes", label: "Heat-Resistant Safety Shoes" },
        { value: "Chemical-Resistant Safety Boots", label: "Chemical-Resistant Safety Boots" },
        { value: "High-Top Safety Boots", label: "High-Top Safety Boots" },
        { value: "Insulated Cold-Weather Safety Boots", label: "Insulated Cold-Weather Safety Boots" },
        { value: "Electrical Hazard (EH) Safety Shoes", label: "Electrical Hazard (EH) Safety Shoes" }
    ],
    
    "Gloves": [
        { value: "General Work Gloves", label: "General Work Gloves" },
        { value: "Cut-Resistant Gloves", label: "Cut-Resistant Gloves" },
        { value: "Heat-Resistant Gloves", label: "Heat-Resistant Gloves" },
        { value: "Chemical-Resistant Gloves", label: "Chemical-Resistant Gloves" },
        { value: "Electrical-Insulating Gloves", label: "Electrical-Insulating Gloves" },
        { value: "Grip-Enhanced Gloves", label: "Grip-Enhanced Gloves" },
        { value: "Cold-Resistant Gloves", label: "Cold-Resistant Gloves" }
    ],

    // Geometric Tools
    "Office supplies": [
        { value: "Engineering notebooks", label: "Engineering notebooks" },
        { value: "Drawing paper", label: "Drawing paper" },
        { value: "Engineering drawing pens", label: "Engineering drawing pens" },
        { value: "Engineering ink pens", label: "Engineering ink pens" },
        { value: "Paper bags and document folders", label: "Paper bags and document folders" }
    ],
    
    "Practical supplies": [
        { value: "Measuring tape", label: "Measuring tape" },
        { value: "Micrometer and calibre", label: "Micrometer and calibre" },
        { value: "Rulers", label: "Rulers" },
        { value: "Engineering circles", label: "Engineering circles" },
        { value: "Hammers and keys", label: "Hammers and keys" },
        { value: "Scissors and cutting tools", label: "Scissors and cutting tools" },
        { value: "Hand drills", label: "Hand drills" }
    ],
    
    "Technical supplies": [
        { value: "Surveying laser devices", label: "Surveying laser devices" },
        { value: "Soldering iron", label: "Soldering iron" },
        { value: "Multimeter device", label: "Multimeter device" },
        { value: "Oscilloscope", label: "Oscilloscope" },
        { value: "Signal generators", label: "Signal generators" },
        { value: "Electric drilling rigs", label: "Electric drilling rigs" }
    ]
};
import logo2 from './logo 2.png'
import wallet from './wallet.png'
import geometric_glass from './graduation project/Geometric_tools/glasses.jpg'
import geometric_helmet from './graduation project/Geometric_tools/helmets.jpg'
import geometric_vests from './graduation project/Geometric_tools/vests.jpg'
import geometric_helmet_vest from './graduation project/Geometric_tools/helmet_&_vest.jpg'
import Medical_gloves from './graduation project/Medical_tools/gloves.avif'
import Medical_latex_gloves from './graduation project/Medical_tools/latex_gloves.jpg'
import Medical_mask_kn_95 from './graduation project/Medical_tools/mask_kn_95.webp'
import Medical_Surgical_gown from './graduation project/Medical_tools/Surgical_gown.jpg'
import Medical_stethoscope_1 from './graduation project/Medical_tools/سماعة_1.jpg'
import Medical_stethoscope_2 from './graduation project/Medical_tools/سماعه_2.jpg'
import Medical_surgical_shoe from './graduation project/Medical_tools/surgical_shoe.jpg'
import Geometric_tools_anti_static_jacket from './graduation project/Geometric_tools/anti_static_jacket.webp'
import Geometric_tools_Cut_Resistant_Gloves from './graduation project/Geometric_tools/Cut_Resistant_Gloves.webp'
import Geometric_tools_Helmet_with_Face_Shield from './graduation project/Geometric_tools/Helmet_with_Face_Shield.webp'
import Geometric_tools_safety_glass4 from './graduation project/Geometric_tools/safety_glass4.webp'
import Geometric_tools_safety_overalls from './graduation project/Geometric_tools/safety_overalls.jpg'
import middleGray_page from '../graduation_project/middleGray_page.png'
import middle_page1 from '../graduation_project/middle_page1.png'
import middle_page2 from '../graduation_project/middle_page2.png'

export const graduations = {
    logo2,
    wallet,
    middle_page1,
    middle_page2,
    middleGray_page
}

export const products = [
    {
        _id: "aaaaa",
        name: "glass",
        description: "Geometric_&_Medical.",
        price: 100,
        image: [geometric_glass],
        category: "Geometric",
        subCategory: "Upper",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true
    },
    {
        _id: "aaaab",
        name: "helmet",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [geometric_helmet],
        category: "Geometric",
        subCategory: "Upper",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "aaaac",
        name: "Vest",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [geometric_vests],
        category: "Geometric",
        subCategory: "Middle",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "aaaad",
        name: "helmet & vest",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [geometric_helmet_vest],
        category: "Geometric",
        subCategory: "Middle",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "aaaae",
        name: "gloves",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [Medical_gloves],
        category: "Medical",
        subCategory: "Middle",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: true
    },
    {
        _id: "aaaaf",
        name: "latex gloves",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [Medical_latex_gloves],
        category: "Medical",
        subCategory: "Middle",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "aaaag",
        name: "Mask_Kn_95",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [Medical_mask_kn_95],
        category: "Medical",
        subCategory: "Upper",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "aaaah",
        name: "Surgical gown",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [Medical_Surgical_gown],
        category: "Medical",
        subCategory: "Middle",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "aaaai",
        name: "stethoscope1",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [Medical_stethoscope_1],
        category: "Medical",
        subCategory: "Upper",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "aaaaj",
        name: "stethoscope2",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [Medical_stethoscope_2],
        category: "Medical",
        subCategory: "Upper",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "aaaak",
        name: "surgical_shoe",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [Medical_surgical_shoe],
        category: "Medical",
        subCategory: "Lower",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "aaaal",
        name: "anti_static_jacket",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [Geometric_tools_anti_static_jacket],
        category: "Medical",
        subCategory: "Middle",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "aaaam",
        name: "Cut_Resistant_Gloves",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [Geometric_tools_Cut_Resistant_Gloves],
        category: "Medical",
        subCategory: "Middle",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "aaaan",
        name: "Helmet_with_Face_Shield",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [Geometric_tools_Helmet_with_Face_Shield],
        category: "Geometric",
        subCategory: "Upper",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "aaaao",
        name: "safety_glass4",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [Geometric_tools_safety_glass4],
        category: "Geometric",
        subCategory: "Upper",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "aaaap",
        name: "safety_overalls",
        description: "Geometric_&_Medical.",
        price: 200,
        image: [Geometric_tools_safety_overalls],
        category: "Geometric",
        subCategory: "Middle",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: false
    },
]
/**
 * VOLTIX — EV Cars Seed Script
 * Run: node seed.js  (from /backend directory)
 * All image URLs use reliable public CDNs: c.ndtvimg.com, ev-database.org, acko-cms.ackoassets.com
 */
require("dotenv").config();
const mongoose = require("mongoose");
const EvCar = require("./Models/index");

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DB_URI;

const cars = [
    // ─── MAHINDRA ──────────────────────────────────────────────────────
    {
        name: "Mahindra BE6", brand: "Mahindra",
        range: 682, acceleration: 6.7, topSpeed: 201,
        battery: "79 kWh", efficiency: 161, weight: 1900,
        fastCharger: true, towing: 0,
        motor: "Single Rear Motor (228 PS)", price: 1890000,
        images: [
            "https://www.mahindraelectricsuv.com/on/demandware.static/-/Library-Sites-eSUVSharedLibrary/default/dw9b3c3b01/be6/BE6-Crimson-Red.png",
            "https://c.ndtvimg.com/2024-11/be6-prime-ext_625x300_10_November_24.jpg"
        ]
    },
    {
        name: "Mahindra XEV 9e", brand: "Mahindra",
        range: 656, acceleration: 6.8, topSpeed: 200,
        battery: "79 kWh", efficiency: 165, weight: 2045,
        fastCharger: true, towing: 0,
        motor: "Single Rear Motor (228 PS)", price: 2190000,
        images: [
            "https://www.mahindraelectricsuv.com/on/demandware.static/-/Library-Sites-eSUVSharedLibrary/default/dw085129e7/Xev-9e/9e-banner12.png",
            "https://c.ndtvimg.com/2024-11/9e-kv_625x300_10_November_24.jpg"
        ]
    },

    // ─── TATA ──────────────────────────────────────────────────────────
    {
        name: "Tata Nexon EV", brand: "Tata",
        range: 465, acceleration: 8.9, topSpeed: 150,
        battery: "40.5 kWh", efficiency: 187, weight: 1590,
        fastCharger: true, towing: 0,
        motor: "Permanent Magnet Synchronous (131 PS)", price: 1449000,
        images: [
            "https://c.ndtvimg.com/2023-09/rko2g2rk_nexon-ev_625x300_14_September_23.jpg",
            "https://c.ndtvimg.com/2024-06/5secmnl8_tata-sierra-ev-concept_625x300_14_June_24.jpg"
        ]
    },
    {
        name: "Tata Punch EV", brand: "Tata",
        range: 421, acceleration: 9.5, topSpeed: 140,
        battery: "35 kWh", efficiency: 190, weight: 1474,
        fastCharger: true, towing: 0,
        motor: "Permanent Magnet Synchronous (122 PS)", price: 1099000,
        images: [
            "https://c.ndtvimg.com/2024-01/1c5t4v6g_tata-punch-ev_625x300_17_January_24.jpg",
            "https://c.ndtvimg.com/2024-01/fh3biqvs_punch-ev_625x300_15_January_24.jpg"
        ]
    },
    {
        name: "Tata Curvv EV", brand: "Tata",
        range: 502, acceleration: 8.6, topSpeed: 160,
        battery: "55 kWh", efficiency: 178, weight: 1725,
        fastCharger: true, towing: 0,
        motor: "Permanent Magnet Synchronous (167 PS)", price: 1749000,
        images: [
            "https://c.ndtvimg.com/2024-08/gla3djng_tata-curvv-ev_625x300_22_August_24.jpg",
            "https://c.ndtvimg.com/2024-08/bbgr5d38_tata-curvv-ev-dark-edition_625x300_21_August_24.jpg"
        ]
    },

    // ─── MG ────────────────────────────────────────────────────────────
    {
        name: "MG ZS EV", brand: "MG",
        range: 461, acceleration: 8.5, topSpeed: 175,
        battery: "50.3 kWh", efficiency: 195, weight: 1620,
        fastCharger: true, towing: 0,
        motor: "Permanent Magnet Synchronous (176 PS)", price: 1898000,
        images: [
            "https://c.ndtvimg.com/2024-12/gn5gag4o_mg-cyberster_625x300_10_December_24.jpg",
            "https://c.ndtvimg.com/2023-10/m0o2a71c_mg-zs-ev-facelift_625x300_26_October_23.jpg"
        ]
    },
    {
        name: "MG Windsor EV", brand: "MG",
        range: 331, acceleration: 9.0, topSpeed: 160,
        battery: "38 kWh", efficiency: 200, weight: 1580,
        fastCharger: true, towing: 0,
        motor: "Permanent Magnet Synchronous (136 PS)", price: 1350000,
        images: [
            "https://c.ndtvimg.com/2024-09/j3t9r8tg_mg-windsor-ev_625x300_11_September_24.jpg",
            "https://c.ndtvimg.com/2024-09/o3lm2mro_mg-windsor-ev-interior_625x300_11_September_24.jpg"
        ]
    },

    // ─── BYD ───────────────────────────────────────────────────────────
    {
        name: "BYD Sealion 7", brand: "BYD",
        range: 567, acceleration: 4.5, topSpeed: 215,
        battery: "82.56 kWh", efficiency: 163, weight: 2185,
        fastCharger: true, towing: 750,
        motor: "Dual Motor AWD (523 PS)", price: 2999000,
        images: [
            "https://msl.lucidcdn.com/assets/1/new-vehicles/byd-auto/sealion-7/09sealion-7_lhd_kv_city_static_dual-car_download_expansion_jpg-5000px.jpg/renditions/ratio/original/width/1920/height/1598/09sealion-7_lhd_kv_city_static_dual-car_download_expansion_jpg-5000px.webp?4166",
            "https://cdn.motor1.com/images/mgl/KbbMV/s3/byd-sealion-7.jpg"
        ]
    },
    {
        name: "BYD Atto 3", brand: "BYD",
        range: 521, acceleration: 7.3, topSpeed: 160,
        battery: "60.48 kWh", efficiency: 175, weight: 1750,
        fastCharger: true, towing: 0,
        motor: "Single Front Motor (204 PS)", price: 2499000,
        images: [
            "https://cdn.evindia.online/uploads/news/40358b84b8fde9edbf9d849bf0eb3c7e",
            "https://c.ndtvimg.com/2023-01/2l8mkq08_byd-atto-3_625x300_20_January_23.jpg"
        ]
    },

    // ─── TESLA ─────────────────────────────────────────────────────────
    {
        name: "Tesla Model Y", brand: "Tesla",
        range: 533, acceleration: 5.0, topSpeed: 217,
        battery: "75 kWh", efficiency: 162, weight: 1979,
        fastCharger: true, towing: 1600,
        motor: "Dual Motor AWD (384 PS)", price: 5989000,
        images: [
            "https://car-bon.com.au/wp-content/uploads/2023/08/ModelY_79-scaled.jpg",
            "https://img-cdn.evfy.in/Tesla%20Model%20Y-1.webp"
        ]
    },

    // ─── HYUNDAI ───────────────────────────────────────────────────────
    {
        name: "Hyundai Creta EV", brand: "Hyundai",
        range: 473, acceleration: 7.9, topSpeed: 155,
        battery: "51.4 kWh", efficiency: 185, weight: 1675,
        fastCharger: true, towing: 0,
        motor: "Permanent Magnet Synchronous (171 PS)", price: 1799000,
        images: [
            "https://acko-cms.ackoassets.com/Hyundai_Ioniq_5_N_89971e34ba.jpg",
            "https://c.ndtvimg.com/2024-01/5hpqplt8_hyundai-creta-ev_625x300_17_January_24.jpg"
        ]
    },
    {
        name: "Hyundai Ioniq 6", brand: "Hyundai",
        range: 614, acceleration: 5.1, topSpeed: 185,
        battery: "77.4 kWh", efficiency: 154, weight: 1950,
        fastCharger: true, towing: 1500,
        motor: "Dual Motor AWD (325 PS)", price: 4495000,
        images: [
            "https://acko-cms.ackoassets.com/Hyundai_Ioniq_5_N_89971e34ba.jpg",
            "https://c.ndtvimg.com/2023-01/ioniq6-press_625x300_10_January_23.jpg"
        ]
    },

    // ─── KIA ───────────────────────────────────────────────────────────
    {
        name: "Kia EV6 GT", brand: "Kia",
        range: 424, acceleration: 3.4, topSpeed: 260,
        battery: "77.4 kWh", efficiency: 197, weight: 2105,
        fastCharger: true, towing: 1600,
        motor: "Dual Motor AWD (585 PS)", price: 6097000,
        images: [
            "https://downtown-mag.com/wp-content/uploads/sites/7/2022/11/KIA-EV6-GT-Line-Test-DT-004-WEB-7043.jpg",
            "https://c.ndtvimg.com/2022-12/0ro52r5k_kia-ev6-gt_625x300_28_December_22.jpg"
        ]
    },

    // ─── BMW ───────────────────────────────────────────────────────────
    {
        name: "BMW i4 eDrive40", brand: "BMW",
        range: 590, acceleration: 5.7, topSpeed: 190,
        battery: "83.9 kWh", efficiency: 169, weight: 2050,
        fastCharger: true, towing: 1600,
        motor: "Single Rear Motor (340 PS)", price: 7250000,
        images: [
            "https://ev-database.org/img/auto/BMW_i4_eDrive40_2022/BMW_i4_eDrive40_2022-01.jpg",
            "https://c.ndtvimg.com/2022-04/3i2rp6ts_bmw-i4_625x300_12_April_22.jpg"
        ]
    },
    {
        name: "BMW iX xDrive50", brand: "BMW",
        range: 630, acceleration: 4.6, topSpeed: 200,
        battery: "111.5 kWh", efficiency: 205, weight: 2585,
        fastCharger: true, towing: 2500,
        motor: "Dual Motor AWD (523 PS)", price: 11100000,
        images: [
            "https://ev-database.org/img/auto/BMW_iX3_2026/BMW_iX3_2026-01.jpg",
            "https://c.ndtvimg.com/2022-09/l84fmp0k_bmw-ix_625x300_01_September_22.jpg"
        ]
    },

    // ─── MERCEDES ──────────────────────────────────────────────────────
    {
        name: "Mercedes EQS 580", brand: "Mercedes",
        range: 857, acceleration: 4.3, topSpeed: 210,
        battery: "107.8 kWh", efficiency: 153, weight: 2585,
        fastCharger: true, towing: 0,
        motor: "Dual Motor AWD (523 PS)", price: 16300000,
        images: [
            "https://acko-cms.ackoassets.com/Mercedes_Benz_EQS_SUV_9ebed8c15f.jpg",
            "https://images.autox.com/uploads/2023/10/Mercedes-Benz-EQE.jpg"
        ]
    },

    // ─── AUDI ──────────────────────────────────────────────────────────
    {
        name: "Audi e-tron GT", brand: "Audi",
        range: 501, acceleration: 3.3, topSpeed: 245,
        battery: "93.4 kWh", efficiency: 218, weight: 2347,
        fastCharger: true, towing: 0,
        motor: "Dual Motor AWD (530 PS)", price: 17900000,
        images: [
            "https://ev-database.org/img/auto/Audi_e-tron_GT/Audi_e-tron_GT-01.jpg",
            "https://c.ndtvimg.com/2023-05/h2c3r8go_audi-e-tron-gt_625x300_23_May_23.jpg"
        ]
    },

    // ─── PORSCHE ───────────────────────────────────────────────────────
    {
        name: "Porsche Taycan Turbo S", brand: "Porsche",
        range: 484, acceleration: 2.8, topSpeed: 260,
        battery: "93.4 kWh", efficiency: 243, weight: 2370,
        fastCharger: true, towing: 0,
        motor: "Dual Motor AWD (761 PS)", price: 19000000,
        images: [
            "https://porschepictures.flowcenter.de/pmdb/thumbnail.cgi?id=327501&w=1935&h=1089&crop=1&public=1&cs=a35177fcafc6ebf9",
            "https://ev-database.org/img/auto/Porsche_Taycan_Turbo_S/Porsche_Taycan_Turbo_S-01.jpg"
        ]
    },

    // ─── VOLVO ─────────────────────────────────────────────────────────
    {
        name: "Volvo EX30", brand: "Volvo",
        range: 480, acceleration: 3.6, topSpeed: 180,
        battery: "69 kWh", efficiency: 167, weight: 1800,
        fastCharger: true, towing: 0,
        motor: "Dual Motor AWD (428 PS)", price: 3450000,
        images: [
            "https://www.team-bhp.com/sites/default/files/styles/check_extra_large_for_review/public/2025VolvoEX30EV12048x1365.jpg",
            "https://ev-database.org/img/auto/Volvo_EX30_Twin_Motor/Volvo_EX30_Twin_Motor-01.jpg"
        ]
    },
    {
        name: "Volvo EX90", brand: "Volvo",
        range: 580, acceleration: 5.9, topSpeed: 180,
        battery: "111 kWh", efficiency: 212, weight: 2736,
        fastCharger: true, towing: 2100,
        motor: "Dual Motor AWD (510 PS)", price: 8990000,
        images: [
            "https://ev-database.org/img/auto/Volvo_EX90/Volvo_EX90-01.jpg",
            "https://c.ndtvimg.com/2024-02/volvo-ex90_625x300_01_February_24.jpg"
        ]
    }
];

async function seed() {
    try {
        if (!MONGO_URI) {
            console.error("❌ No MONGO_URI found in .env");
            process.exit(1);
        }
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        const deleted = await EvCar.deleteMany({});
        console.log(`🗑  Cleared ${deleted.deletedCount} existing car(s)`);

        const inserted = await EvCar.insertMany(cars);
        console.log(`🚗 Seeded ${inserted.length} real EV cars!\n`);
        inserted.forEach(c =>
            console.log(`  ✔ ${c.brand} ${c.name} — ${c.range}km | ${c.acceleration}s | ₹${(c.price / 100000).toFixed(2)}L`)
        );

        await mongoose.disconnect();
        console.log("\n✅ Done.");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed failed:", err.message);
        process.exit(1);
    }
}

seed();
